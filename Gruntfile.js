module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
              'css/main.css': 'css/main.scss'
            }
          }
        },

        assemble: {
          options: {
            layout: ['_layouts/default.hbs'],
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
            files: {
              'build/transaction.html': ['build/*.html']
            }
          }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-premailer');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass','assemble','premailer']);

};
