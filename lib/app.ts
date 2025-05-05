import { App } from 'aws-cdk-lib';
import { Stacks } from './stacks';

export const app: App = new App();

// Create the Stacks
new Stacks(app);
