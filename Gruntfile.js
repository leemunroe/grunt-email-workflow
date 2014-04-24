module.exports = function(grunt) {

    // All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
              '_scss/main.css': '_scss/main.scss'
            }
          }
        },

        assemble: {
          options: {
            layoutdir: '_layouts',
            layout: ['default.hbs'],
            flatten: true
          },
          pages: {
            src: ['_src/*.hbs'],
            dest: 'build/'
          }
        },

        premailer: {
          simple: {
            options: {
              removeComments: true
            },
            files: [{
                expand: true,
                src: ['build/*.html'],
                dest: ''
            }]
          }
        },

        mailgun: {
          mailer: {
            options: {
              key: grunt.option('mailgun-key'), // Pass your Mailgun key with Grunt like so: grunt send --mailgun-key=KEY
              sender: 'lee@mailgun.com',
              recipient: 'lee@mailgun.com',
              subject: 'This is a test email'
            },
            src: ['build/*.html']
          }
        }

    });

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-mailgun');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass','assemble','premailer']);
    grunt.registerTask('send', ['default','mailgun']);

};
