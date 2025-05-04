import { Stack } from "aws-cdk-lib";
import { Config } from "../config";
import { Construct } from "constructs";

export interface BaseStackProps {
    /**
     * The Description of the stack
     */
    description: string
    /**
     * Optionally set the Termination Protection for the Stack
     * @default true
     */
    terminationProtection?: boolean;
}

/**
 * BaseStack is a base class for all stacks in the application.
 * 
 * It sets the following defaults:
 * - Sets the Stack Name
 * - Enforces a Description
 * - Enables Termination Protection
 */
export class BaseStack extends Stack {
    constructor(scope: Construct, id: string, props: BaseStackProps) {
        // Append the App Prefix to the Stack Name
        id = `${Config.APP_PREFIX}-${id}`

        super(scope, id, {
            ...props,
            // Set the Stack Name to match the ID with "Stack" appended
            stackName: id + 'Stack',
            // Enforce a Description
            description: props.description,
            // Enable Termination Protection by default
            terminationProtection: props.terminationProtection ?? true,
        });

        // Add Tags
        this.tags.setTag('App', Config.APP_PREFIX);
        this.tags.setTag('Owner', Config.OWNER);

        // Log the Stack Name during construction
        console.log(`Constructing Stack: ${id}`);
    }
}
