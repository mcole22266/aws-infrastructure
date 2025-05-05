import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { IKey } from 'aws-cdk-lib/aws-kms';
import { BlockPublicAccess, Bucket, BucketEncryption, BucketProps } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { BaseKey } from './base-key';

export interface BaseBucketProps extends BucketProps {
  /**
   * The name of the bucket. This will be appended with the account ID and region
   */
  bucketName: string;
  /**
   * The Encryption Key to encrypt objects in the Bucket. The Key must be a key
   * created using the BaseKey Construct. If one is not provided, one will be
   * created.
   *
   * @default "A BaseKey will be created"
   */
  encryptionKey?: BaseKey;
}

/**
 * BaseBucket is a wrapper around the Bucket construct that is used to create
 * buckets with common properties and defaults.
 */
export class BaseBucket extends Bucket {
  constructor(scope: Construct, id: string, props: BaseBucketProps) {
    const stack: Stack = Stack.of(scope);

    // Fast-Fail if the Bucket Name contains capital letters
    if (props.bucketName.match(/[A-Z]/)) {
      throw new Error('Bucket Name must not contain capital letters');
    }

    // Create a Key if one is not provided
    const encryptionKey: IKey =
      props.encryptionKey ??
      new BaseKey(scope, 'BaseKey', {
        alias: `${props.bucketName}-key`,
        description: `Key automatically created for ${props.bucketName}`,
      });

    super(scope, id, {
      ...props,
      // Automatically append Account ID and Region to Bucket Names
      bucketName: `${props.bucketName}-${stack.account}-${stack.region}`,
      // Enforce KMS Encryption on Buckets
      encryption: BucketEncryption.KMS,
      encryptionKey: encryptionKey,
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
