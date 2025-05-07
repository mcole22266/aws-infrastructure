# AWS Infrastructure

This repository contains AWS infrastructure as code using AWS CDK. Currently, it focuses on creating the infrastructure needed to backup local PC files to S3 Cold Storage.

## Overview

The project uses AWS CDK to define and deploy infrastructure resources including:

- S3 buckets with appropriate encryption and security settings
- KMS keys for encryption
- Backup infrastructure for 3-2-1 backup strategy

## Commands

- **`npm run build`**: Builds the CDK stacks by:
  1. Cleaning previous build artifacts
  2. Formatting code with Prettier
  3. Compiling TypeScript
  4. Linting with ESLint
  5. Synthesizing CloudFormation templates

- **`npm run deploy`**: Deploys all stacks to your AWS account. This will create or update the resources defined in your CDK stacks.

- **`npm run sync-folders`**: Runs the `sync_folders.sh` script which uses `aws s3 sync` to backup your local folders to the S3 bucket. This is the command you'll run periodically to back up your files.

## Additional Commands

- **`npm run clean`**: Removes build artifacts and generated files
- **`npm run format`**: Formats code using Prettier
- **`npm run lint`**: Checks code quality with ESLint
- **`npm run synth`**: Synthesizes CloudFormation templates without deploying
- **`npm run test`**: Runs Jest tests _(none present yet)_

## Customization

This project is primarily for personal use and not designed as a public package. However, if you choose to use it, you'll need to modify several files:

1. **Update backup script**: Modify [lib/resources/scripts/sync_folders.sh](lib/resources/scripts/sync_folders.sh) to change the local file paths you want to back up.

2. **Update configuration**: Edit [lib/config.ts](lib/config.ts) to update values like `APP_PREFIX` and `OWNER` to match your environment.

3. **Update constants**: Edit [lib/constants.ts](lib/constants.ts) to update references to resources that were manually created in your AWS account.

4. **Modify KMS key admins**: Update [lib/constructs/base-key.ts](lib/constructs/base-key.ts) to remove or change the `admins` list to include your own IAM users.

## Important Note

This project is designed for personal use and may require additional modifications beyond those mentioned above to work in your environment. While the code is relatively simple, it's tailored to specific needs and assumptions.

If you're looking to implement your own backup solution, you might find this repository useful as a reference, but you'll likely need to adapt it significantly to your own requirements and AWS account structure.

## Prerequisites

- Node.js and npm
- AWS CLI configured with appropriate credentials
- AWS CDK installed globally (`npm install -g aws-cdk`)

## Getting Started

1. Clone this repository
2. Run `npm install` to install dependencies
3. Make the necessary customizations mentioned above
4. Run `npm run build` to build the project
5. Run `npm run deploy` to deploy to your AWS account
6. Run `npm run sync-folders` to back up your files

## License

This project is for personal use. Use at your own risk.
