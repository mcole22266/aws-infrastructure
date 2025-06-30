import { Duration } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Alarm, ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import { Effect, ManagedPolicy, PolicyDocument, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Config } from '../config';
import { Construct } from 'constructs';
import { BaseLogGroup } from '../constructs/base-log-group';
import { BaseStack, BaseStackProps } from '../constructs/base-stack';
import { BaseTopic } from '../constructs/base-topic';
import { GeneralStack } from './general';

export interface BaseDiscordIntegrationStackProps extends BaseStackProps {
    generalStack: GeneralStack;
}

/**
 * DiscordIntegration is a stack that is used to create Resources for any
 * integrations with Discord such as Trello Webhooks
 */
export class DiscordIntegrationStack extends BaseStack {
    constructor(scope: Construct, id: string, props: BaseDiscordIntegrationStackProps) {
        super(scope, id, props);

        const TRELLO_INTEGRATION_PREFIX = 'Trello-Discord-Webhook';

        props.generalStack.projectKey.addToResourcePolicy(
            new PolicyStatement({
                sid: 'AllowCloudWatchLogs',
                effect: Effect.ALLOW,
                principals: [new ServicePrincipal('logs.amazonaws.com')],
                actions: ['kms:Encrypt*', 'kms:Decrypt*', 'kms:ReEncrypt*', 'kms:GenerateDataKey*', 'kms:Describe*'],
                resources: ['*'],
                conditions: {
                    ArnLike: {
                        'kms:EncryptionContext:aws:logs:arn': `arn:aws:logs:${this.region}:${this.account}:*`,
                    },
                },
            })
        );

        const logGroup = new BaseLogGroup(this, 'DiscordIntegrationLogGroup', {
            logGroupSuffix: `Function/${TRELLO_INTEGRATION_PREFIX}-Function`,
            encryptionKey: props.generalStack.projectKey,
        });

        const trelloWebhookFunctionRole = new Role(this, 'TrelloWebhookFunctionExecRole', {
            roleName: 'Trello-Discord-Webhook-Exec-Role',
            description: 'Role used for executing the Trello Webhook Lambda Function',
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
            inlinePolicies: {
                DiscordIntegrationPermissions: new PolicyDocument({
                    statements: [
                        new PolicyStatement({
                            sid: 'SecretsAccess',
                            effect: Effect.ALLOW,
                            actions: ['secretsmanager:GetSecretValue'],
                            resources: [props.generalStack.discordIntegrationSecret.secretArn],
                        }),
                        new PolicyStatement({
                            sid: 'KMSAccess',
                            effect: Effect.ALLOW,
                            // We're okay with doing anything with any key that trusts us
                            actions: ['kms:*'],
                            resources: ['*'],
                        }),
                    ],
                }),
            },
        });

        const trelloWebhookFunction = new LambdaFunction(this, 'TrelloWebhookFunction', {
            functionName: `${TRELLO_INTEGRATION_PREFIX}-Function`,
            description: 'Lambda Function that handles Trello Webhooks and posts to Discord',
            role: trelloWebhookFunctionRole,
            runtime: Runtime.PYTHON_3_11,
            handler: 'index.lambda_handler',
            code: Code.fromAsset('lib/lambda/trello_webhook'),
            logGroup: logGroup,
            timeout: Duration.seconds(10),
            environment: {
                DISCORD_INTEGRATION_SECRET_ARN: props.generalStack.discordIntegrationSecret.secretArn,
            },
        });

        props.generalStack.projectKey.grantEncryptDecrypt(trelloWebhookFunctionRole);
        logGroup.grantWrite(trelloWebhookFunctionRole);

        const alarmTopic = new BaseTopic(this, 'TrelloWebhookAlarmTopic', {
            topicName: `${TRELLO_INTEGRATION_PREFIX}-Alarm-Topic`,
            encryptionKey: props.generalStack.projectKey,
        });
        alarmTopic.addSubscription(new EmailSubscription(Config.NOTIFICATION_EMAIL));

        const trelloFunctionAlarm = new Alarm(this, 'TrelloWebhookAlarm', {
            alarmName: `${TRELLO_INTEGRATION_PREFIX}-Function-Invocation-Alarm`,
            alarmDescription:
                'Alarm for the Trello Webhook Lambda Function if it is invoked more than 10 times in 5 minutes',
            metric: trelloWebhookFunction.metricInvocations({
                period: Duration.minutes(5),
                statistic: 'Sum',
            }),
            threshold: 10, // 10+ Invocations in 5 minutes creates an alarm
            evaluationPeriods: 1,
            comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            actionsEnabled: true,
        });
        trelloFunctionAlarm.addAlarmAction(new SnsAction(alarmTopic));

        const restApi = new RestApi(this, 'DiscordRestApi', {
            restApiName: 'DiscordIntegration',
            description: 'Rest API used for handling Discord Webhooks',
            deploy: true,
            deployOptions: {
                stageName: 'prod',
                description: 'The Prod/Live stage of the Rest API',
            },
        });

        const trelloWebhook = restApi.root.addResource('trello-webhook');
        trelloWebhook.addMethod('ANY', new LambdaIntegration(trelloWebhookFunction));
    }
}
