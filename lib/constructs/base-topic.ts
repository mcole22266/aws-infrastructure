import { Topic, TopicProps } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { BaseKey } from './base-key';
import { Config } from '../config';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export interface BaseTopicProps extends TopicProps {
    /**
     * The name of the topic. This will be prefixed with the APP_PREFIX
     * and the environment name
     */
    topicName: string;
    /**
     * The encryption key to use for the topic.
     * If not provided, a new key will be created.
     *
     * @default "A BaseKey will be created"
     */
    encryptionKey?: BaseKey;
}

/**
 * BaseTopic is a wrapper around the {@link Topic} construct that is used to create
 * topics with common properties and defaults.
 */
export class BaseTopic extends Topic {
    constructor(scope: Construct, id: string, props: BaseTopicProps) {
        // Create a Key if one is not provided
        const encryptionKey: BaseKey =
            props.encryptionKey ??
            new BaseKey(scope, `${id}-BaseKey`, {
                alias: `${id}-key`,
                description: `Key automatically created for ${props.topicName}`,
            });

        super(scope, id, {
            ...props,
            // Enforce a Topic Name - prefixing it with the App Prefix
            displayName: `${Config.APP_PREFIX}-${props.topicName}`,
            // Require SSL and Encryption
            enforceSSL: true,
            masterKey: encryptionKey,
        });

        // Ensure Secure Transport is enforced - HTTPS-only connections
        this.addToResourcePolicy(
            new PolicyStatement({
                sid: 'EnforceSecureTransport',
                actions: ['SNS:Publish'],
                effect: Effect.DENY,
                principals: [new AnyPrincipal()],
                resources: [this.topicArn],
                conditions: {
                    Bool: {
                        'aws:SecureTransport': 'false',
                    },
                },
            })
        );
    }
}
