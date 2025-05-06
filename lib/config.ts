import { StorageClass } from 'aws-cdk-lib/aws-s3';

export class Config {
    /**
     * The App Prefix which will prefix all Stacks
     */
    public static readonly APP_PREFIX = 'Infra';
    /**
     * The Owner of the Account. Used for Tagging
     */
    public static readonly OWNER = 'Michael';
    /**
     * Email to be used for any notifications
     */
    public static readonly NOTIFICATION_EMAIL = 'mcole042891@gmail.com';

    /**
     * For the Backup Bucket, the Storage Class Sequence to use for Transitioning
     * to more cheaper Storage Classes over time
     */
    public static readonly BACKUP_BUCKET_STORAGE_CLASS_SEQUENCE: StorageClass[] = [
        // Cost Estimate: $3.60/TB - retrieval takes minutes to hours
        StorageClass.GLACIER,
        // Cost Estimate: $0.99/TB - retrieval takes 12+ hours
        StorageClass.DEEP_ARCHIVE,
    ];
    /**
     * The number of days to transition to the next Storage Class in the above sequence
     * 90 is the minimum number of days to transfer from Glacier after Glacier IR
     */
    public static readonly BACKUP_BUCKET_STORAGE_CLASS_TRANSITION_DAYS: number = 90;
}
