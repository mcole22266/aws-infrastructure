import { BaseBucket } from '../constructs/base-bucket';
import { BaseStack, BaseStackProps } from '../constructs/base-stack';
import { Construct } from 'constructs';
import { StorageClass } from 'aws-cdk-lib/aws-s3';
import { Duration } from 'aws-cdk-lib';
import { Config } from '../config';
import { GeneralStack } from './general';

export interface BackupStackProps extends BaseStackProps {
    generalStack: GeneralStack;
}

/**
 * BackupStack is a stack that is used to create Backup Resources for 3-2-1 Backups
 * and other related resources
 */
export class BackupStack extends BaseStack {
    constructor(scope: Construct, id: string, props: BackupStackProps) {
        super(scope, id, props);

        const backupBucket: BaseBucket = new BaseBucket(this, 'BackupBucket', {
            bucketNamePrefix: 'backup-bucket',
            encryptionKey: props.generalStack.projectKey,
            versioned: false, // We explicitly don't want Versions here. This is just a backup
        });

        // Build LifeCycle Rules from the Config to slowly move new data to colder/cheaper storage
        backupBucket.addLifecycleRule({
            transitions: Config.BACKUP_BUCKET_STORAGE_CLASS_SEQUENCE.map(
                (storageClass: StorageClass, index: number) => ({
                    storageClass,
                    // The first transition should be 0 days (immediate). Each iteration should multiply days by the index
                    transitionAfter: Duration.days(Config.BACKUP_BUCKET_STORAGE_CLASS_TRANSITION_DAYS * index),
                })
            ),
        });
    }
}
