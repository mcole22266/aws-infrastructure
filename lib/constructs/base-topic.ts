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
     * The encryption key to use for the topic. Require a KMS Key to keep costs low
     * while keeping logs encrypted
     */
    encryptionKey: BaseKey;
}

/**
 * BaseTopic is a wrapper around the {@link Topic} construct that is used to create
 * topics with common properties and defaults.
 */
export class BaseTopic extends Topic {
    constructor(scope: Construct, id: string, props: BaseTopicProps) {
        super(scope, id, {
            ...props,
            // Enforce a Topic Name - prefixing it with the App Prefix
            displayName: `${Config.APP_PREFIX}-${props.topicName}`,
            // Require SSL and Encryption
            enforceSSL: true,
            masterKey: props.encryptionKey,
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
