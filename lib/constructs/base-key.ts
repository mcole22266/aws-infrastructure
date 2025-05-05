import { RemovalPolicy } from 'aws-cdk-lib';
import { User } from 'aws-cdk-lib/aws-iam';
import { Key, KeyProps } from 'aws-cdk-lib/aws-kms';
import { IamUser } from '../constants';
import { Construct } from 'constructs';
import { Config } from '../config';

export interface BaseKeyProps extends KeyProps {
    /**
     * The alias of the key. This will be prefixed with the APP_PREFIX
     */
    alias: string;
    /**
     * The description of the key
     */
    description: string;
}

/**
 * BaseKey is a wrapper around the Key construct that is used to create
 * keys with common properties and defaults.
 */
export class BaseKey extends Key {
    constructor(scope: Construct, id: string, props: BaseKeyProps) {
        super(scope, id, {
            ...props,
            // Enforce an Alias and a Description
            alias: `${Config.APP_PREFIX}/${props.alias}`, // Add Prefix
            description: props.description,
            // Ensure Key Security
            enableKeyRotation: props.enableKeyRotation ?? true,
            enabled: props.enabled ?? true,
            // Always ensure Michael User is able to access the Key
            admins: [User.fromUserName(scope, 'MichaelUser', IamUser.MICHAEL)],
            // Manage Key Retention
            removalPolicy: props.removalPolicy ?? RemovalPolicy.RETAIN,
        });
    }
}
