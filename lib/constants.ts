/**
 * IAM Users in the Account
 */
export enum IamUser {
    /**
     * Created manually within the AWS Console. User for Michael
     */
    MICHAEL = 'michael',
}

/**
 * IAM Groups in the Account
 */
export enum IamGroup {
    /**
     * Created manually within the AWS Console. Group for full access to
     * the account
     */
    ADMINISTRATORS = 'Administrators',
    /**
     * Created manually within the AWS Console. Group for read-only access
     * to the account
     */
    READONLY = 'Read-Only',
}
