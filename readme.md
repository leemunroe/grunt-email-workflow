# Grunt Email Design Workflow

Designing and testing emails is a pain in the ass. This grunt task helps simplify things at the design stage.

In short it will:

1. Compile your SCSS to CSS

2. Build your email templates

3. Inline your CSS

4. Send you a test email to your inbox

## Requirements

* Node.js - [Install Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
* Grunt-cli and Grunt (`npm install grunt-cli -g`)
* Ruby - Use [Install ruby with RVM](https://rvm.io/rvm/install)
* Premailer (`gem install premailer`)
* [Mailgun](http://www.mailgun.com) - Needed if you plan to send the email to yourself (Mailgun is free for 10,000 emails/mth)

## Getting started

If you haven't used [Grunt](http://gruntjs.com/) before check out Chris Coyier's post on [getting started with Grunt](http://24ways.org/2013/grunt-is-not-weird-and-hard/).

Fork or clone this project.

Run `npm install` to install the necessary packages.

## Project structure

+-- dist // Where the compiled emails are output
+-- src
|   +-- css
|   |   +-- scss // Edit all CSS styles here
|   +-- emails // Email content
|   +-- layouts // Email HTML layout

## How it works

### CSS

This project uses [SCSS](http://sass-lang.com/). You don't need to touch the .css files, these are compiled automatically. 

For changes to CSS, only touch the .scss files.

### Email templates and content

Handlebars is the templating solution used here.

`/layouts` contains the standard head/foot HTML markup. You most likely will only need one layout template, but you can have as many as you like.

`/emails` is where your email content will go. To start you off there is a simple transactional email here.

### Sending email to yourself

* Sign up for a [Mailgun](http://www.mailgun.com) account (it's free)
* Open up `Gruntfile.js`
* Replace 'MAILGUN_KEY' with your actual Mailgun API key
* Edit the sender and recipient to your own email address (or whoever you want to send it to)

## Grunt commands

Open up your terminal, cd to this project's directory and run `grunt`. This will:

* Compile your SCSS to CSS
* Compile your email layout and content
* Inline your CSS

You can see the output in the `dist` folder. Open it and preview it the browser.

Alternatively run `grunt watch`. This will check for any changes you make to your .scss and .hbs templates, then automatically re-compile everything.

If you want to send the email, run `grunt send`. This will compile everything as above, but also email out each of the emails.

## How to test with Litmus

If you have a [Litmus](http://www.litmus.com) account and want to test the email in multiple clients/devices, create a new test in Litmus, copy the email address they tell you to send the email to, open up `Gruntfile.js` and paste it where the recipient goes. Then run `grunt send` to send the emails to Litmus.


