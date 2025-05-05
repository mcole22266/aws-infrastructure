import { BackupStack } from './stacks/backup';
import { GeneralStack } from './stacks/general';
import { App } from 'aws-cdk-lib';

/**
 * All Stacks to be deployed within this app
 */
export class Stacks {
    private app: App;

    public generalStack: GeneralStack;
    public backupStack: BackupStack;

    constructor(app: App) {
        this.app = app;

        this.generalStack = new GeneralStack(this.app, 'General', {
            description: 'General Resources for the account',
        });
        this.backupStack = new BackupStack(this.app, 'Backup', {
            description: 'Resources for backups of resources into the account',
        });
    }
}
