import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { BaseStack, BaseStackProps } from '../constructs/base-stack';
import { Construct } from 'constructs';
import { SecretValue } from 'aws-cdk-lib';
import { BaseKey } from '../constructs/base-key';
import { AccountRootPrincipal } from 'aws-cdk-lib/aws-iam';

/**
 * GeneralStack is a stack that is used to create General Resources
 */
export class GeneralStack extends BaseStack {
    readonly projectKey: BaseKey;
    readonly discordIntegrationSecret: Secret;

    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, id, props);

        this.projectKey = new BaseKey(this, 'AwsInfrastructure-Key', {
            alias: 'AwsInfrastructure-Key',
            description: 'Key to be used for all Encrypted Items in the Aws Infrastructure project',
        });
        this.projectKey.grantEncryptDecrypt(new AccountRootPrincipal());

        this.discordIntegrationSecret = new Secret(this, 'DiscordIntegrationSecret', {
            secretName: 'DiscordIntegration',
            description: 'Secret for the Discord Integration',
            encryptionKey: this.projectKey,
            secretObjectValue: {
                // Initially blank values so they can be set manually
                'discord-webhook-url': SecretValue.unsafePlainText(''),
                'trello-webhook-secret': SecretValue.unsafePlainText(''),
            },
        });
        this.discordIntegrationSecret.grantRead(new AccountRootPrincipal());
    }
}
