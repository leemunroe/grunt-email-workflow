# Grunt Email Design Workflow

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) 

Designing and testing emails is a pain. HTML tables, inline CSS, various devices and clients to test, and varying support for the latest web standards.

This Grunt task helps simplify things.

1. Compiles your SCSS to CSS

2. Builds your HTML email templates

3. Inlines your CSS

4. Compresses and uploads images to a CDN (optional)

5. Sends a test email to your inbox or Litmus (optional)

## Requirements

You may already have these installed on your system. If not, you'll have to install them.

* Node.js - [Install Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
* Grunt-cli and Grunt (`npm install grunt-cli -g`)
* [Mailgun](http://www.mailgun.com) (optional) - Sends the email
* [Litmus](https://litmus.com) (optional) - Tests the email across all clients/browsers/devices
* [Rackspace Cloud](http://www.rackspace.com/cloud/files/) (optional) - Uses Cloud Files as a CDN

## Getting started

If you haven't used [Grunt](http://gruntjs.com/) before check out Chris Coyier's post on [getting started with Grunt](http://24ways.org/2013/grunt-is-not-weird-and-hard/).

#### 1. Setup

Clone this repo, cd to the directory, run `npm install` to install the necessary packages.

```sh
git clone https://github.com/leemunroe/grunt-email-workflow.git
cd grunt-email-workflow
npm install
```

#### 2. Create secrets.json

Create a `secrets.json` file in your project root as **outlined below under "[Sensitive Information](#sensitive-information)"**.

#### 3. Run Grunt

Run `grunt` in command line and check out your `/dist` folder to see your compiled and inlined email templates.

### Sensitive information
We encourage you __not__ to store sensitive data in your git repository. If you must, please look into [git-encrypt](https://github.com/shadowhand/git-encrypt) or some other method of encrypting your configuration secrets.

1. Create a file `secrets.json` in your project root.
2. Paste the following sample code in `secrets.json` and enter the appropriate credentials for the services you want to connect with. 

If you don't use or need these services **it's ok to leave these defaults**, but they should exist for this to work.

```json
{
  "mailgun": {
    "api_key": "YOUR MG PRIVATE API KEY",
    "sender": "E.G. POSTMASTER@YOURDOMAIN.COM",
    "recipient": "WHO YOU WANT TO SEND THE EMAIL TO"
  },
  "litmus": {
    "username": "LITMUS USER NAME",
    "password": "LITMUS PASS",
    "company": "LITMUS COMPANY/API SUBDOMAIN NAME"
  },
  "cloudfiles": {
    "user": "CLOUDFILES USERNAME",
    "key": "CLOUDFILES KEY",
    "region": "CLOUDFILES REGION E.G. ORD",
    "container": "CLOUDFILES CONTAINER NAME",
    "uri": "CLOUDFILES URI"
  },
  "s3": {
    "key": "AMAZON S3 KEY",
    "secret": "AMAZON S3 SECRET",
    "region": "AMAZON S3 REGION",
    "bucketname": "AMAZON S3 BUCKET NAME",
    "bucketdir": "AMAZON S3 BUCKET SUBDIRECTORY (optional)",
    "bucketuri": "AMAZON S3 PATH (ex: https://s3.amazonaws.com/)"
  }
}
```

After this you should be good to go. Run `grunt` and your email templates should appear automagically in a `/dist` folder.

## How it works

<img src="http://i.imgur.com/yrHpTdr.jpg" width="500">

### CSS

This project uses [SCSS](http://sass-lang.com/). You don't need to touch the .css files, these are compiled automatically.

For changes to CSS, modify the `.scss` files.

Media queries and responsive styles are in a separate style sheet so that they don't get inlined. Note that only a few clients support media queries e.g. iOS Mail app.

### Email templates and content

Handlebars and Assemble are used for templating.

`/layouts` contains the standard header/footer HTML wrapper markup. You most likely will only need one layout template, but you can have as many as you like.

`/emails` is where your email content will go. To start you off I've included example transactional emails based on my [simple HTML email template](https://github.com/leemunroe/html-email-template).

`/data` contains _optional_ .yml or .json data files that can be used in your templates. It's a good way to store commonly used strings and variables. See `/data/default.yml` and `/partials/follow_lee.hbs` for an example.

`/partials` contains _optional_ .hbs files that can be thought of like includes. To use a partial, for example `/partials/follow_lee.hbs` you would use the following code in your emails template:

```hbs
{{> follow_lee }}
```

`/partials/components` contains _optional_ .hbs files that can help generate your markup. Each component will typically have a corresponding Sass file in `src/css/sass/<component_name>.scss`. To use a component, for example `/partials/components/button.hbs` you would use the following code in your emails template. _(note: You can use single -or- double quotes for attributes)_

```hbs
{{> button type="primary" align="center" url="LINK GOES HERE" title="ANCHOR TEXT GOES HERE" }}
```

### Generate your email templates

In Terminal/command-line, run `grunt`. This will:

* Compile your SCSS to CSS
* Generate your email layout and content
* Inline your CSS
* Compress your images

See the output HTML in the `dist` folder. Open them and preview it the browser.

<img src="http://i.imgur.com/EnTCqUE.gif" width="500">

Alternatively run `grunt serve`. This will check for any changes you make to your .scss and .hbs templates, automatically run the tasks, and serve you a preview in the browser on http://localhost:4000. Saves you having to run grunt every time you make a change.

### Browser-based previews

In terminal, run `grunt serve`. 

* This will run the default tasks `grunt` + the `watch` task will be initiated
* A preview UI will automagically open on [http://localhost:4000](http://localhost:4000) and you can review your templates
* Go about your business editing templates and see your template changes live-reload
* __NOTE:__ The express server stops working when the `watch` task is not running

<img src="http://i.imgur.com/AGZqbIn.png" width="500">

### Send the email to yourself

* Sign up for a [Mailgun](http://www.mailgun.com) account (it's free)
* Insert your Mailgun API key, either in `Gruntfile.js` or `secrets.json`
* Change the sender and recipient to your own email address (or whoever you want to send it to)

Run `grunt send --template=TEMPLATE_NAME.html`. This will email out the template you specify.

<img src="http://i.imgur.com/6N8VRen.gif" width="500">

Change 'transaction.html' to the name of the email template you want to send.

### How to test with Litmus

If you have a [Litmus](http://www.litmus.com) account and want to test the email in multiple clients/devices:

* Open up `Gruntfile.js` or `secrets.json`
* Replace `username`, `password` and `yourcompany` under the Litmus task with your credentials

Run `grunt litmus --template=TEMPLATE_NAME.html` to send the email to Litmus. This will create a new test using the `<title>` value of your template.

[See the Litmus results](https://litmus.com/pub/eb33459/screenshots) for the simple transactional email template that is included.

<img src="https://s3.amazonaws.com/f.cl.ly/items/1a1H0B1o3v160147100S/Image%202014-12-31%20at%2010.10.01%20AM.png" width=-"500">


### CDN and working with image assets

If your email contains images you'll want to serve them from a CDN. This Gruntfile has support for Rackspace Cloud Files ([pricing](http://www.rackspace.com/cloud/files/pricing/)) and AWS S3.

<img src="http://i.imgur.com/oO5gfkZ.jpg" width="500">

* Sign up for a Rackspace Cloud account (use the [Developer Discount](http://developer.rackspace.com/devtrial/) for $300 credit)
* Create a new Cloud Files container
* Open up `Gruntfile.js` or `secrets.json`
* Change 'cloudfiles' settings to your settings (you can find your Rackspace API key under your account settings)
* Make any other config changes as per [grunt-cloudfiles](https://github.com/rtgibbons/grunt-cloudfiles) instructions

Run `grunt rsupload` to run the default tasks as well as upload any images to your CDN.

Run `grunt rsupload send --template=branded.html` to send the email to yourself with the 'CDNified' images.


### Using Amazon S3 for image assets

Another option for serving images is to use Amazon S3. Basic service is free of charge. For more information on setting up an account, visit [Amazon](http://aws.amazon.com/s3/).

The Gruntfile uses [grunt-aws-s3](https://github.com/MathieuLoutre/grunt-aws-s3).

Once your AWS account is setup, create a Bucket within S3. You will need to ensure your Bucket has a policy setup under Permissions. Below is a very loose sample policy for testing purposes. You should read up on [AWS Identity and Access Management](http://aws.amazon.com/iam/) for more information.

**Sample S3 Bucket Policy**

```json
{
  "Version": "2008-10-17",
  "Id": "Policy123",
  "Statement": [
    {
      "Sid": "Stmt456",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::BUCKETNAME"
    }
  ]
}
```

Run `grunt s3upload` to upload images to your S3 Bucket. This will also run a replace task to change image paths within the destination directory to use the new S3 path.


### Sample email templates

I've added a few templates here to help you get started.

* [Simple transactional email template](http://leemunroe.github.io/grunt-email-workflow/dist/transaction.html)
* [Branded email via CDN](http://leemunroe.github.io/grunt-email-workflow/dist/branded.html)
* [Email with components](http://leemunroe.github.io/grunt-email-workflow/dist/components.html)

### More resources

* For more transactional email templates check out [Mailgun's collection of templates](http://github.com/mailgun/transactional-email-templates)
* [Things I've learned about sending email](http://www.leemunroe.com/sending-email-designers-developers/)
* [Things I've learned about building HTML email templates](http://www.leemunroe.com/building-html-email/)
* Prefer Gulp? Daryll Doyle has created a [Gulp email creator](https://github.com/darylldoyle/Gulp-Email-Creator)
