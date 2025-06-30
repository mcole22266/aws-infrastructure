import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket, BucketEncryption, BucketProps } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { BaseKey } from './base-key';

/**
 * Properties for creating a BaseBucket.
 *
 * BaseBucketProps extends BucketProps but omits certain properties that are
 * enforced by the BaseBucket construct to ensure security best practices.
 *
 * @example
 * ```typescript
 * new BaseBucket(this, 'MyBucket', {
 *   bucketNamePrefix: 'my-data', // e.g. my-data-123456789012-us-east-2
 *   encryptionKey: myKey, // optional
 *   removalPolicy: RemovalPolicy.DESTROY // override default RETAIN
 * });
 * ```
 *
 * @extends Omit<BucketProps, 'bucketName' | 'encryption' | 'bucketKeyEnabled'>
 */
export interface BaseBucketProps extends Omit<BucketProps, 'bucketName' | 'encryption' | 'bucketKeyEnabled'> {
    /**
     * The prefix for the bucket name.
     *
     * This will be automatically appended with the account ID and region to ensure
     * global uniqueness and clear ownership (e.g., "my-bucket-123456789012-us-east-1").
     *
     * Must not contain capital letters as per S3 bucket naming requirements.
     */
    bucketNamePrefix: string;

    /**
     * The KMS key to use for bucket encryption.
     *
     * A key must be provided to keep costs low with a single project-level KMS Key
     *
     * @default A new BaseKey is created with alias `${bucketNamePrefix}-key`
     */
    encryptionKey: BaseKey;
}

/**
 * A secure S3 bucket with best practices enforced.
 *
 * BaseBucket extends the standard CDK Bucket construct but enforces security
 * best practices and naming conventions:
 *
 * - KMS encryption is always enabled
 * - Public access is always blocked
 * - SSL is always enforced
 * - Bucket names follow a consistent pattern with account ID and region
 * - Removal policy defaults to RETAIN to prevent accidental deletion
 *
 * @example
 * ```typescript
 * // Create a bucket with default settings
 * const dataBucket = new BaseBucket(this, 'DataBucket', {
 *   bucketNamePrefix: 'company-data'
 * });
 *
 * // Create a bucket with a custom KMS key
 * const key = new BaseKey(this, 'CustomKey', {
 *   alias: 'custom-encryption-key',
 *   description: 'Custom encryption key for sensitive data'
 * });
 *
 * const secureBucket = new BaseBucket(this, 'SecureBucket', {
 *   bucketNamePrefix: 'sensitive-data',
 *   encryptionKey: key
 * });
 * ```
 *
 * @extends Bucket
 */
export class BaseBucket extends Bucket {
    /**
     * Creates a new BaseBucket with security best practices.
     *
     * @param scope - The construct scope
     * @param id - The construct ID
     * @param props - The bucket properties
     * @throws Error if bucketNamePrefix contains capital letters
     */
    constructor(scope: Construct, id: string, props: BaseBucketProps) {
        const stack: Stack = Stack.of(scope);

        // Fast-Fail if the Bucket Name contains capital letters
        if (props.bucketNamePrefix.match(/[A-Z]/)) {
            throw new Error('Bucket Name must not contain capital letters');
        }

        super(scope, id, {
            ...props,
            // Automatically append Account ID and Region to Bucket Names
            bucketName: `${props.bucketNamePrefix}-${stack.account}-${stack.region}`,
            // Enforce KMS Encryption on Buckets
            encryption: BucketEncryption.KMS,
            encryptionKey: props.encryptionKey,
            bucketKeyEnabled: true,
            // Enforce object retention on deletion
            autoDeleteObjects: props.autoDeleteObjects ?? false,
            removalPolicy: props.removalPolicy ?? RemovalPolicy.RETAIN,
            // Enforce Access Controls
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            enforceSSL: true,
        });
    }
}
