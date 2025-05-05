# AWS + Dev Environment Setup for Jon

Hey Jon — welcome! This guide will walk you step-by-step through setting up your AWS environment, securing it, and starting your journey into cloud infrastructure and coding — **for real**. If you need more details as you set this project up, try chatting with ChatGPT, Gemini, or reach out to your brother.

Stick with it — once CDK is in place, this all becomes way easier and more fun.

## 🐧 Optional First Step: Using Ubuntu (Recommended in Some Form)

You're currently on Windows, but since your brother is on Ubuntu — and the AWS CLI/CDK workflow is super smooth on Linux — it’s worth considering how you want to integrate Ubuntu into your setup.

Here are your options, **ranked by practicality**:

### ✅ Option 1: **Use WSL2 (Windows Subsystem for Linux)** — _Recommended_

WSL2 gives you a full Ubuntu terminal running **inside Windows** without dual-booting or wiping anything.

- Easy to set up
- No rebooting needed
- Fast enough for almost anything except 3D graphics

🧰 [Install WSL2 + Ubuntu Guide (Official)](https://learn.microsoft.com/en-us/windows/wsl/install)

### 🟡 Option 2: **Dual Boot Ubuntu + Windows** — _Advanced_

You keep both Windows and Ubuntu, and pick one when your computer turns on.

- Lets you run Ubuntu natively (great for development)
- Requires rebooting to switch OS
- More complex to set up, but doable if you're comfortable

🛠️ [How to Dual Boot Ubuntu and Windows (How-To Geek)](https://www.howtogeek.com/214571/how-to-dual-boot-windows-10-and-linux/)

### 🔴 Option 3: **Replace Windows with Ubuntu** — _Not Recommended_

Only do this if you're 100% sure you'll never want Windows again. You’ll lose access to Windows-only tools and it’s irreversible without reinstalling.

### 🔴 Option 4: **Use Ubuntu in a Virtual Machine (VirtualBox)** — _Not Ideal_

This works, but it's slow, clunky, and unnecessary if you can use WSL2 or dual boot instead.

> 💡 TL;DR: Start with **WSL2**, especially if you’re just exploring. You can always dual boot later using your spare SSD if you want a deeper Ubuntu experience.

## 🗃️ Create an Obsidian Vault

1. [Download Obsidian](https://obsidian.md/)
2. Create a Vault (call it anything you want). You may choose something like `IT Knowledge`. This can be where you store anything related to IT.
3. Inside the Vault, create:
    - A folder: `AWS`
    - A note: `Manually Created Resources.md`

> 📒 This note is **very important**: until you switch to CDK (which automates everything), you'll log all AWS resources here so you don’t lose track.

## 🔐 Set Up a New AWS Account (Recommended)

### Why Start Fresh?

Think of AWS like a Discord server you forgot you owned. You might’ve added some bots, made a few channels, and now you’re not sure what’s still running or what has permissions to what. However, some AWS Resources cost money so better to nuke it all and start fresh.

- Do you know **everything** that’s still active in your old account?
- Is there **anything you truly care about** in there?

If not, treat it like an old cluttered server. **Start fresh**, do it right, and document it this time.

> ✅ Pro tip: Use your same email but add `+aws` to the username part so AWS sees it as a new address (e.g., `jon.doe+aws@gmail.com`)

### Steps

1. Log into your old AWS account
2. Check **Billing → Cost Explorer** to see if anything is costing you money
3. If nothing matters there, delete resources or even the account
4. Create your **new AWS account** using your email + `+aws` syntax
5. In Obsidian, log your **new Account ID** in `Manually Created Resources.md`

## 🔐 Secure the Root User Like It’s Your Discord Server Owner Role

The **Root User** in AWS is like the Discord server owner — it can do anything, override everything, and **should never be used casually**.

If someone hacks your root credentials:

- They can spin up massive EC2 machines
- Rack up **$10,000+ bills**
- And you’ll struggle to ever recover access

This account is **sacred**. Protect it like it holds the keys to your financial life. Check out AWS Subreddit for some horror stories from people who didn't properly secure their account(s).

### Steps

1. Sign in as the **root user**
2. Go to **IAM → Security credentials**
3. Enable **2 MFA devices**:
    - 📱 Your Phone:
        - Android: Aegis Authenticator, Google Authenticator
        - iPhone: Authy
    - 💻 Your Computer:
        - Windows: WinAuth
        - Ubuntu: Authenticator GNOME or `oathtool`

> 📛 Name them clearly:
>
> - `root (phone)`
> - `root (ubuntu)` or `root (windows)`
>
> Rename any existing ones to be prefixed with `(legacy)`. I would wait to remove these in the future

📒 Log these in `Manually Created Resources.md`.

## 🛡️ Set Password Policy

Why? Because even if you never reuse passwords, you still want users in your account (including you) to use strong ones.

1. Go to **IAM → Account settings**
2. Set:
    - Minimum length: 12
    - Require uppercase, lowercase, numbers, symbols

📒 Note this policy in `Manually Created Resources.md`.

## 👥 Create IAM Groups (Think: Discord Roles)

In Discord, you give people **Roles** like Admin or Moderator. In AWS, there are also Roles but you can think of **Groups** in a similar fashion. Instead of managing permissions for each and every user, you manage permissions for Groups and then simply add users to those Groups. This may seem like overkill for a single user but it's good practice and will help you in the long run.

1. Go to **IAM → User Groups**
2. Create:
    - `Administrators` → attach `AdministratorAccess` policy
    - `Read-Only` → attach `ReadOnlyAccess` policy

📒 Log both groups and their permissions in your manual notes.

## 👤 Create a User (`jon`)

This user is like when you invite other users into your personal Discord account. Except you _are_ this User. You’ll use this daily for pretty much everything.

- **Do not use root** for day-to-day work.
- **Never lose these credentials.** Recovery is possible but painful.

### Steps

1. IAM → Users → Add User
2. Name: `jon`
3. Enable:
    - ✅ Console access (you’ll sign into the AWS website)
    - ✅ Programmatic access (used by the AWS CLI, CDK, etc.)
4. Add to the `Administrators` group
5. Set a secure password and store it in a password manager (e.g., Bitwarden)

📒 Log user details in `Manually Created Resources.md`.

> If you'd like, you can also create a ReadOnly User called `michael` and set it up such that he's given a default password and is allowed to set his own upon his first login.

## 🔑 Set Up MFA for the `jon` User

Just like root, you should protect your day-to-day account with MFA.

1. Log in as `jon`
2. IAM → Users → jon → Security credentials
3. Add **2 MFA devices**:
    - `jon (phone)`
    - `jon (ubuntu)` or `jon (windows)`

📒 Log these in your manual notes as well.

> Once you start using CDK, you won’t have to track resources manually anymore — but for now, be disciplined. It’s worth it.

## 🧰 Install AWS CLI & Node.js/NPM

Before you can start writing and deploying AWS infrastructure as code, you need two essential tools installed on your machine:

---

### 🟦 What is the **AWS CLI**?

The **AWS Command Line Interface (CLI)** is a tool that lets you interact with AWS **from your terminal**, rather than clicking through the AWS website.

- You can run commands like `aws s3 ls` to list your buckets
- It’s required for deploying projects with CDK
- It connects to your AWS account using **credentials and profiles**

---

### 🟨 What is **NPM**?

**NPM (Node Package Manager)** comes with Node.js and is used to install libraries and tools — kind of like an app store for developers.

- You'll use it to install the **AWS CDK**
- Also used to install **formatters**, **linters**, and **other tooling**

NPM works with **JavaScript and TypeScript** projects, which is how CDK defines infrastructure.

---

## 🛠 Install on Your System

### On **Ubuntu**:

Open your terminal and run:

```bash
sudo apt update
sudo apt install -y awscli nodejs npm
```

This will install:

- The AWS CLI
- Node.js (JavaScript Runtime)
- NPM (the tool that installs packages like CDK)

### On **Ubuntu**:

1. Install the [AWS CLI for Windows](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html)
2. Install [Node.js + NPM](https://nodejs.org/en/download)
    - Pick the **LTS** Version (long-term support)

Once installed, open PowerShell or your terminal and confirm:

```powershell
aws --version
node --version
npm --version
```

You should see version numbers appear. If not, something went wrong and you'll want to retry or ask your brother for help.

## 🔐 Configure AWS CLI with a Named Profile

To securely interact with your AWS account via the CLI, set up a named profile called jon. This keeps your credentials organized and allows you to manage multiple profiles if needed.

1. Open your terminal or command prompt.
2. Run the following command:
    ```bash
    aws configure --profile jon
    ```
3. When prompted, enter:
    - **AWS Access Key ID**: Your IAM user's access key ID.
    - **AWS Secret Access Key**: Your IAM user's secret access key.
    - **Default region name**: e.g., `us-east-2` (or your preferred region).
    - **Default output format**: You can leave this blank or enter `json`.

> 📁 This creates two files in your home directory:
>
> - `~/.aws/credentials`: Stores your access keys.
> - `~/.aws/config`: Stores your profile configurations.

To use this profile in AWS CLI commands, append --profile jon:

```bash
aws s3 ls --profile jon
```

📒 Add these details to your Manually Created Resources.md in Obsidian for future reference. **But do not store your actual Credentials here**. Instead, just reference that this was created and that you have a credential profile called `jon`

## 💻 Set Up VS Code

1. [Download VS Code](https://code.visualstudio.com/)
2. Install these extensions:

### Recommended Extensions:

| Extension            | Description                                               |
| -------------------- | --------------------------------------------------------- |
| **GitLens**          | Superpowers for Git: blame, history, line diffs           |
| **AWS Toolkit**      | Lets you access AWS resources and CDK from inside VS Code |
| **Amazon Q**         | Your personal cloud AI assistant – built into the IDE     |
| **ESLint**           | Helps you write clean, bug-free code                      |
| **Prettier**         | Auto-formats your code on save                            |
| **NPM Intellisense** | Autocomplete for Node.js packages                         |
| **Vim (optional)**   | For keyboard wizards — modal editing like in terminals    |

## 🤖 Set Up Amazon Q

Amazon Q is like ChatGPT, but built for cloud developers.

- It understands AWS and your code
- Works directly in VS Code
- Can generate code, explain stacks, answer questions about AWS services

> Once you try it, you’ll wonder how you ever managed without it.

## 🐙 Set Up a GitHub Account

1. [Create GitHub account](https://github.com/)
2. Install Git on your system (Ubuntu: `sudo apt install git`)

## 🏗️ Set Up Your First CDK Project

### What is CDK?

> CDK (Cloud Development Kit) is a way to define AWS infrastructure using actual code.

Instead of clicking buttons in the AWS Console:

- You write code
- That code creates AWS resources
- It’s tracked in Git, reusable, and reviewable

**You stop creating things manually — CDK does it for you.**

It’s the **light at the end of the tunnel**. From this point on, **you don’t need to track anything manually anymore**.

### Steps

```bash
mkdir aws-infrastructure
cd aws-infrastructure
cdk init app --language=typescript
```

### Push to GitHub

```bash
git init
git remote add origin git@github.com:your-username/aws-infrastructure.git
git add .
git commit -m "Initial CDK project"
git push -u origin main
```

Once this is done, you’re ready to start coding your cloud.  
Let your brother know — he’ll help with your first stack!
