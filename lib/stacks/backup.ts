import { BaseStack, BaseStackProps } from "../constructs/base-stack";
import { Construct } from "constructs";

/**
 * BackupStack is a stack that is used to create Backup Resources for 3-2-1 Backups
 * and other related resources
 */
export class BackupStack extends BaseStack {
    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, id, props);
    }
}
