import { BaseStack, BaseStackProps } from '../constructs/base-stack';
import { Construct } from 'constructs';

/**
 * GeneralStack is a stack that is used to create General Resources
 */
export class GeneralStack extends BaseStack {
    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, id, props);
    }
}
