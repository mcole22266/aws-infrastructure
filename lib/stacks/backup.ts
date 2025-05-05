import { BaseBucket } from '../constructs/base-bucket';
import { BaseStack, BaseStackProps } from '../constructs/base-stack';
import { Construct } from 'constructs';
import { BaseKey } from '../constructs/base-key';
import { StorageClass } from 'aws-cdk-lib/aws-s3';
import { Duration } from 'aws-cdk-lib';
import { Config } from '../config';

/**
 * BackupStack is a stack that is used to create Backup Resources for 3-2-1 Backups
 * and other related resources
 */
export class BackupStack extends BaseStack {
  constructor(scope: Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);

    const backupBucketKey: BaseKey = new BaseKey(this, 'BackupBucketKey', {
      alias: 'BackupBucketKey',
      description: 'KMS Key used for encrypting the Backup Bucket',
    });

    const backupBucket: BaseBucket = new BaseBucket(this, 'BackupBucket', {
      bucketName: 'backup-bucket',
      encryptionKey: backupBucketKey,
    });

    // Build LifeCycle Rules from the Config to slowly move new data to colder/cheaper storage
    backupBucket.addLifecycleRule({
      transitions: Config.BACKUP_BUCKET_STORAGE_CLASS_SEQUENCE.map((storageClass: StorageClass, index: number) => ({
        storageClass,
        // The first transition should be 0 days (immediate). Each iteration should multiply days by the index
        transitionAfter: Duration.days(Config.BACKUP_BUCKET_STORAGE_CLASS_TRANSITION_DAYS * index),
      })),
    });
  }
}
