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
              removeClasses: true,
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
              key: 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0',
              sender: 'devs@mailgun.net',
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
