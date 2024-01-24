# Grunt Email Design Workflow
based on [github.com/leemunroe](https://github.com/leemunroe/grunt-email-workflow)

## Changelog 

### v0.2.0 - 24/01/2024

* update packages and dependencies for current node versions: nvm not needed
* remove obsolete tasks and packages

## Purpose

Designing and testing emails is a pain. HTML tables, inline CSS, various devices and clients to test, and varying support for the latest web standards.

This Grunt task helps simplify things.

1. Compiles your SCSS to CSS
2. Builds your HTML email templates
3. Inlines your CSS

## Requirements

You may already have these installed on your system. If not, you'll have to install them.

* Node.js - [Install Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
* Grunt-cli and Grunt (`npm install grunt-cli -g`)

## Getting started

If you haven't used [Grunt](http://gruntjs.com/) before check out Chris Coyier's post on [getting started with Grunt](http://24ways.org/2013/grunt-is-not-weird-and-hard/).

#### 1. Setup

Clone this repo, cd to the directory, run `npm install` to install the necessary packages.

```sh
cd grunt-email-workflow
npm install
```

#### 2. Create secrets.json

Create a `secrets.json` file in your project root as **outlined below under "[Sensitive Information](#sensitive-information)"**.

#### 3. Run Grunt

Run `grunt build` and check out your `/dist` folder to see your compiled and inlined email templates.

Run `grunt serve`, a new live-reload browser tab will open. Happy coding :)

### Sensitive information

We encourage you __not__ to store sensitive data in your git repository. If you must, please look into [git-encrypt](https://github.com/shadowhand/git-encrypt) or some other method of encrypting your configuration secrets.

1. Create a file `secrets.json` in your project root.
2. Paste the following sample code in `secrets.json` and enter the appropriate credentials for the services you want to connect with.

If you don't use or need these services **it's ok to skip this step**.

```json
{
  "mailgun": {
    "api_key": "YOUR MG PRIVATE API KEY",
    "domain": "YOURDOMAIN.COM",
    "sender": "E.G. POSTMASTER@YOURDOMAIN.COM",
    "recipient": "WHO YOU WANT TO SEND THE EMAIL TO"
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

After this you should be good to go. Run `grunt build` and your email templates should appear automagically in a `/dist` folder.

## How it works

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

In terminal, run `grunt build`. This will:

* Compile your SCSS to CSS
* Generate your email layout and content
* Inline your CSS

See the output HTML in the `dist` folder. Open them and preview it the browser.

Alternatively run `grunt serve`. This will check for any changes you make to your .scss and .hbs templates, automatically run the tasks, and serve you a preview in the browser on [http://localhost:4000](http://localhost:4000). Saves you having to run grunt every time you make a change.

### Browser-based previews

In terminal, run `grunt serve`.

* This will run the default tasks `grunt` + the `watch` task will be initiated
* A preview UI will automagically open on [http://localhost:4000](http://localhost:4000) and you can review your templates
* Go about your business editing templates and see your template changes live-reload
* __NOTE:__ The express server stops working when the `watch` task is not running


### Sample email templates

I've added a few templates here to help you get started.

* [Simple transactional email template](http://leemunroe.github.io/grunt-email-workflow/dist/transaction.html)
* [Branded email via CDN](http://leemunroe.github.io/grunt-email-workflow/dist/branded.html)
* [Email with components](http://leemunroe.github.io/grunt-email-workflow/dist/components.html)

### More resources

* For more transactional email templates check out [HTML Email templates](https://htmlemail.io)
* [Things I've learned about sending email](http://www.leemunroe.com/sending-email-designers-developers/)
* [Things I've learned about building email templates](http://www.leemunroe.com/building-html-email/)
* [Things I've learned about responsive email](https://www.leemunroe.com/responsive-email-design/)
* Prefer Gulp? Daryll Doyle has created a [Gulp email creator](https://github.com/darylldoyle/Gulp-Email-Creator)
