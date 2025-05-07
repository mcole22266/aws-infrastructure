# Next Steps for Jon

## Some Little Challenges

Try to do these without depending too much on AI. Or think of what you might do but then use AI to validate your thoughts on what you'll do or to provide clarity.

1. Create a new User, `michael`, and give it Read-Only Permissions
    - This User will _eventually_ probably have more access than the `Read-Only` User Group so add it to a new one - `Collaborators` which, for now, only has the same `ReadOnlyAccess` Policy attached
    - Ensure there is a default password for the user. You can send this to me when it's time to login
    - Ensure the user is required to set their own password on initial sign in
2. Add me to your Trello Board as a Collaborator. I haven't looked at this in a while but you can figure it out. I'd like to be able to add/modify tasks on the board
3. Create a new GitHub Repo for any existing scripts you have _(like your RuneScape stuff)_. You can call it something like `RecreationalScripts`. All GitHub Repositories should have a README so be sure to create one that explains that the Repository is for.
    - This is written in Markdown and GitHub renders it cleanly. Rather than Vim, you're better off learning Markdown (Obsidian is perfect for this because that's all it is)
    - This page _is_ a Markdown File. Click on `Raw` to see what it actually looks like
4. Share your GitHub page with me so I can Star it and follow it. Mine is the one you're in while you read this.

## Next Steps

Do all the other stuff and then start working on Comptia (the last section).

### Your Life Now

Before you do anything else, figure out what your plan is. Are you going to do 9-5 Mon-Fri? Something else? Whatever you do, with the best intention for yourself (keeping in mind your job, exercise, and recreation), come up with a "work" schedule and stick to it. Add it to your Calendar even.

I would recommend getting as close to 9-5 Mon-Fri but your schedule may not be feasible for that and you do have an actual job as well. Try to aim for at least 20 genuine working hours/week. That breaks down to 4 hours of focused work per weekday so imagine 5 hours a day giving you a little wiggle room for distractions. Don't get too focused on this **minimum** though - try to maximize a lifestyle that has you making up for lost time.

I recommend something like:

1. Pick a start time that makes you decide on your own to wake up earlier and start your day before "work". Say, 9 am for example. It would mean you might wake up at 7:30, shit-shower-shave, have breakfast and get started at 9:00
2. Possibly copy college and do a 50-minutes of focused work with your phone on silent followed by a 10-minute break
3. Treat this as more important than recreation. I recommend your day starting with that small time of getting ready and watching YouTube or something while you have breakfast followed by focused work followed by the rest of the day being free. Perhaps this looks like:
    - **7:30 am**: Shit-Shower-Shave + Breakfast while YouTubing
    - **9:00 am**: Start 50 min focus + 10 min break 
    - **12:00 pm**: 1 Hour Lunch break - but also time to just chill out
    - **1:00 pm**: Back to work on the 50/10 min cycle
    - **3:00 pm**: Done! Go play Disc Golf/Workout/Something physical
    - **5:00 pm**: Now you're done for the day and can do whatever you want

**Decide something and write it down.** You're your own boss and this is the schedule you've hired yourself to do. Feel free to change it after some time but the intent is to hold yourself accountable.

### Resume

I'll be bringing this up eventually but for now just put it in your brain that you'll want to start working on this. If you get bored doing stuff you've planned and want a break, this is a good thing to swap to. Add a task for this to your Trello Board - `Make Initial Resume` and then we'll let it sit for some time.

If what you were doing right now was a class, the Resume would be your final Project before school was out. Think of it that way and just be mindful that we'll come back to it.

### Obsidian

Obsidian is really really powerful - as ChatGPT about it. Instead of learning Vim, start here actually. If you can get comfortable with this tool, it'll make life much easier for you in the long run. 

Obsidian uses a markup language called Markdown which is pretty much ubiquitous. In fact, you're reading a Markdown File right now! _(Click Raw at the top to see what it actually looks like). I've shown you this before:

```text
# This is a Header

## This is a Header 2

**This is bold** and _this is italicized_. 

- This
- is
- an 
- unordered
- list

And

1. This
2. is
3. a
4. numbered
5. list

You can [link to stuff like Google](https://google.com) as well. Copy this over into [this markdown preview tool](https://markdownlivepreview.com/) and you can see what this will render as.
```

Obsidian, however, sort of superpowers it in many ways. The entire thing is just a collection of Markdown files but there are tools that sit on top that can really open some doors. **And it supports Vim out of the box!** [Check this out for some specific details](https://help.obsidian.md/syntax) for Obsidian.

> Before you go further, create a note and play around with this. Just sort of get familiar with Markdown

After you play around a bit, I recommend looking into some Plugins that may make your life easier with it. You're gonna discover a ton more plugins as you go along that'll be helpful but it's nice to browse them ahead of time and enable some that are obvious. Think of these like VS Code Extensions. 

[This page seems to go into some recommendations](https://www.dsebastien.net/2022-10-19-the-must-have-obsidian-plugins/). Some that stand out to me:

- Calendar might be nice
- Dataview is super nifty but you may hold off on it. Just know it exists and what it does
- Templater is wonderful. I'd install it and try it out.
- I use Homepage
- Kanban can technically replace Trello for you which is cool. I'd probably not use it though since we can collab on Trello
- Paste Image Renamer - I didn't know this existed so getting this asap
- Various Complements
- Tasks
- Excalidraw is awesome
- I could see using Obsidian Git. I use Obsidian Sync which is paid.
- I use Admonitions a lot
- I though Obsidian already had Syntax Highlighting but maybe not. So I'd get Syntax Highlight

From now on, Obsidian should be your little buddy. Take notes constantly - not necessarily of things you learn like you're in school but stuff like references, maybe some code examples, links to things, etc. Maybe for now you create the following files:

- `resources` - Just store links to things here organized in headers - sort of like a bookmark page. Tutorials that look interesting, important GitHub Repos you find, etc
- `/quick-notes` - Set up a folder and just use it for scratch. This can be a rightful mess!
- `/z_attachments` - look into this if you don't follow but there's a convention where it's suggested you label these sorts of folders prefixed with `z_` so they are way at the bottom. Update your Settings such that any pasted filed automatically get placed in this folder. This will be super useful for organization

Also consider setting up **Daily Notes** and use Templater to create a Template for any note that is added. Maybe everyday you work, you create a Daily Note and then fill in some stuff. It'll be super helpful for getting your head straight before starting and then a way for you to easily reference stuff that you may have forgotten. If you choose to do this:
- Create a folder for Daily Notes
- Set up the Daily Notes in the Config to always create them here
- Create a file that is sort of a Template of a Daily Note and then set it up such that anytime a file is added in this folder its automatically populated with the Template.
  - This may take a _bit_ of digging. Also `/z_templates` is a good folder to have to store these.
  - There's an example of one [here](https://forum.obsidian.md/t/a-template-for-daily-notes/15619) that's for like daily life but you can swap it to be things like:

```text
# {{date}}

## Agenda for the day
- SomeAgenda

## Useful Resources
- SomeResourceLink

## Scratch Area
Use this space for whatever
```

### Git

Next you wanna spend some time learning about Git. There's a super high ceiling here but you should know the basics. Git and GitHub are **not** the same thing in the _exact_ same way that porn and PornHub are not the same thing. I haven't done it yet but [GitHub has an Introductions to GitHub thing](https://github.com/skills/introduction-to-github?tab=readme-ov-file) that I imagine is a great place to start. Obviously it will mostly be about GitHub as opposed to Git but I'd imagine it'll do the trick. 

> There are apparently [lots of interesting-looking courses](https://skills.github.com/) on it that GitHub offers. All seem intended to be short and straight to the point.

However, I'd probably also go straight to the source [and learn Git here](https://git-scm.com/docs/gittutorial). This is totally detached from GitHub. Think of Git as a tool to manage your packages while GitHub is a place to publish/collaborate/etc.

**Before you proceed** stop and do some git stuff that were mentioned above. 

#### This Very GitHub Repository (Light Intro to CDK)

Check out [the Repository you're inside of right now](https://github.com/mcole22266/aws-infrastructure) and peak around. This is my CDK Repository where I am managing my AWS Infrastructure _as code_. When you first land here, you can read the README (which I mostly let Amazon Q fill in for me). Read through that then continue here.

Looking at the files, everything you see outside of the `/lib` folder is basically configuration stuff. Just go straight [inside the `/lib` folder](https://github.com/mcole22266/aws-infrastructure/tree/master/lib) and let this walk you throught the files to demystify it. It'll seem confusing at first but you'll realize how simple it all is ultimately:

- [config.ts](https://github.com/mcole22266/aws-infrastructure/blob/master/lib/config.ts)- this is a configuration file that supplies a bunch of static values I can easily change. For example, if I change my email one day, I don't want to go change that 100 times everywhere it's used in my project. Instead, I can change it in one place and it'll propagate everywhere given they will all reference it. I also heavily comment things here so it is easily manageable by others or by future me who won't remember context.
  - [contants.ts](https://github.com/mcole22266/aws-infrastructure/blob/master/lib/constants.ts) is the exact same thing but... different? I've sort of arbitrarily split these and, as the project goes, they could easily get moved around. What I've chosen to put here are all the things I've manually created within the AWS Account (stuff not managed by this CDK).
- [app.ts](https://github.com/mcole22266/aws-infrastructure/blob/master/lib/app.ts) - this is the entrypoint for the whole thing. Literally just creating a CDK App and then constructing all of the **Stacks**. For the sake of code management those stacks are elsewhere and this file is super lightweight
- [stacks.ts](https://github.com/mcole22266/aws-infrastructure/blob/master/lib/stacks.ts) - this is where all the Stacks get built which ultimately gets passed into `app.ts`. A Stack is basically a collection of these AWS Resources. One I've called `GeneralStack` and one is the `BackupStack`. We'll see more about those later but just know there are basically two collections of _stuff_ in this project.
- [/resources](https://github.com/mcole22266/aws-infrastructure/tree/master/lib/resources) is just a place for me to put stuff that is not the actual CDK but things may be related. 
  - [/docs](https://github.com/mcole22266/aws-infrastructure/tree/master/lib/resources/docs) - this folder just contains stuff I've written. What you're reading right now is here. I'll probably move it to its own dedicated Git Repository.
  - [/scripts](https://github.com/mcole22266/aws-infrastructure/tree/master/lib/resources/scripts) - this is where I'll keep any adhoc scripts.
    - [sync_folders.sh](https://github.com/mcole22266/aws-infrastructure/blob/master/lib/resources/scripts/sync_folders.sh) - this is a Bash Script that I can execute to sync some folders on my computer to an S3 Bucket. This is the whole point of this project - backing up my files to S3. Everything the CDK is doing is just creating the stuff that this can then work with. As a note, Amazon Q wrote this for me and I adjusted a few things here and there. Read through it and see if you can follow - a little cheat sheet:
      - `echo` - this is basically "print". It just adds words to the console while the script is running
      - `mkdir` - you know this
      - `rm` - this removes a file
      - `touch` - this creates a file if it doesn't exist
      - `| tee -a` - the first thing is called a pipe. It takes the output of the previous command so you can do something with it. `tee -a` splits the thing it's given (in this case, the `echo`) and lets the echo happen but also appends (hence the `-a`) to a file you give it.
      - `aws s3 sync...` - this is the AWS CLI (Command Line Interface). Instead of me going into the Account and clicking on stuff, this command goes and does some stuff. This particular one uses the S3 (Simple Storage Solution) CLI to run the "sync" command which will literally sync some source folder to some S3 Destination
- [/constructs](https://github.com/mcole22266/aws-infrastructure/tree/master/lib/constructs) - this is where I'll store all my "Constructs" - custom things used for CDK. In this case, we'll essentially "wrap" existing Constructs to make them do things by default when they're used. This isn't at all required but is super handy. For any of these, I recommend Googling or asking AI to ELI5 what they are (not the Construct itself but the things they are wrapping)
  - [base-bucket.ts](https://github.com/mcole22266/aws-infrastructure/blob/master/lib/constructs/base-bucket.ts) - wraps an S3 Bucket such that it is encrypted by default and secure
  - [base-key.ts](https://github.com/mcole22266/aws-infrastructure/blob/master/lib/constructs/base-key.ts) - wraps a KMS Key such that an Alias and Description are required, the `michael` user always can access the key, and it rotates its encryption automatically
  - [base-stack.ts](https://github.com/mcole22266/aws-infrastructure/blob/master/lib/constructs/base-stack.ts) - wraps CDK Stack such that all Stacks are named similarly, everything inside is Tagged appropriately, and there's a little handy log when the project is built telling me the stack has been built
  - [base-topics.ts](https://github.com/mcole22266/aws-infrastructure/blob/master/lib/constructs/base-topic.ts) - wraps something called an SNS Topic. This project doesn't yet use it but since I already did the work, I kept it. SNS Topics are good to know about. This particular one is encrypted by default and requires HTTPS
- [/stacks](https://github.com/mcole22266/aws-infrastructure/tree/master/lib/stacks) - and finally the guts of this whole thing. These are where all the stacks will live. In this case, there are two stacks:
  - [backup.ts](https://github.com/mcole22266/aws-infrastructure/blob/master/lib/stacks/backup.ts) - this is super simple. It creates a KMS Key and then an S3 Bucket which uses that Key to encrypt everything inside. We then add a LifeCycle Rule such that, all objects in the bucket get moved to colder and colder storage (takes longer to retrieve objects but storage is much cheaper) as time passes. When I deploy this project, these two things literally get created. It's the same as if I went into the account, created a KMS Key, created an S3 Bucket using that KMS Key, then added a LifeCycle Policy. Intead, it's all in code. _That's_ why I think you should learn CDK.
  - [general.ts](https://github.com/mcole22266/aws-infrastructure/blob/master/lib/stacks/general.ts) - I already created this for a Dashboard and Budget Alarm but it turns out you have to do that specific type of alarm manually so this is just an empty ass stack. I'll be "General" stuff in here believe it or not. As an example, I may create a new User, `jon`, and give that User `Collaborator` Permission. I can do all that here.

Hopefully this gives a decent idea of why CDK is dope and demystifies it a bit. We'll be using it for all infrastructure but I figure it's probably also a decent way to learn some programming fundamentals. When we sit down to do our first collaboration, I think we'll start here.

### COMPTIA

With whatever time you have left in the day, get started on Comptia _or_ fiddle around with other stuff that may have interested you. But definitely start this up sooner rather than later! Even if its just figuring out where you stand now or coming up with a project plan.

> If you're my Sim, we're **definitely** gonna sign up for an exam _prior_ to when you'll actually take it to set it in stone! But that's later
