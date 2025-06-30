import { DiscordIntegrationStack } from './stacks/discord_integration';
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
    public discordIntegrationStack: DiscordIntegrationStack;

    constructor(app: App) {
        this.app = app;

        this.generalStack = new GeneralStack(this.app, 'General', {
            description: 'General Resources for the account',
        });
        this.backupStack = new BackupStack(this.app, 'Backup', {
            description: 'Resources for backups of resources into the account',
            generalStack: this.generalStack,
        });
        this.discordIntegrationStack = new DiscordIntegrationStack(this.app, 'DiscordIntegration', {
            description: 'Resources for Discord Integration',
            generalStack: this.generalStack,
        });
    }
}
