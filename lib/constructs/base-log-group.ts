import { LogGroup, LogGroupProps, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { BaseKey } from './base-key';

export interface BaseLogGroupProps extends Omit<LogGroupProps, 'logGroupName'> {
    logGroupSuffix: string;
    encryptionKey: BaseKey;
}

export class BaseLogGroup extends LogGroup {
    constructor(scope: Construct, id: string, props: BaseLogGroupProps) {
        super(scope, id, {
            ...props,
            logGroupName: `/aws-infrastructure/${props.logGroupSuffix}`,
            retention: props.retention ?? RetentionDays.SIX_MONTHS,
        });
    }
}
