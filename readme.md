# Grunt Email Design Workflow

Designing and testing emails is a pain in the ass. This grunt task helps simplify things at the design stage.

In short it will:

1. Compile your SCSS to CSS

2. Build your emsil templates

3. Inline your CSS for email client compatibility

4. Send you a test email to your inbox

## Requirements

* Node.js - [Install Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
* Grunt-cli and Grunt (`npm install grunt-cli -g`)
* Ruby - Use [Install ruby with RVM](https://rvm.io/rvm/install)
* Premailer (`gem install premailer`)

## Getting started

If you haven't used [Grunt](http://gruntjs.com/) before check out Chris Coyier's post on [getting started with Grunt](http://24ways.org/2013/grunt-is-not-weird-and-hard/).

Fork or clone this project.

Run `npm install` to install the necessary packages.

## Project structure

+-- dist
+-- src
|   +-- css
|   |   +-- scss
|   +-- emails
|   +-- layouts

