module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Takes your scss files and compiles them to css
        sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
              'src/css/main.css': 'src/css/scss/main.scss',
              'src/css/responsive.css': 'src/css/scss/responsive.scss'
            }
          }
        },
        // Compile less files to css if present
        less: {
          development: {
            options: {
              compress: true,
              yuicompress: true,
              optimization: 2
            },
            files: {
              // target.css file: source.less file
              "src/css/main.css": "src/css/less/main.less",
              'src/css/responsive.css': 'src/css/less/responsive.less'
            }
          }
        },

        // Assembles your email content with html layout
        assemble: {
          options: {
            layoutdir: 'src/layouts',
            flatten: true
          },
          pages: {
            src: ['src/emails/*.hbs'],
            dest: 'dist/'
          }
        },

        // Inlines your css
        premailer: {
          simple: {
            options: {
              removeComments: true
            },
            files: [{
                expand: true,
                src: ['dist/*.html'],
                dest: ''
            }]
          }
        },

        // Watches for changes to css or email templates then runs grunt tasks
        watch: {
          files: ['src/css/scss/*','src/emails/*','src/layouts/*'],
          tasks: ['default']
        },

        // Use Mailgun option if you want to email the design to your inbox or to something like Litmus
        mailgun: {
          mailer: {
            options: {
              key: 'MAILGUN_KEY', // Enter your Mailgun API key here
              sender: 'lee@leemunroe.com',
              recipient: 'lee@leemunroe.com',
              subject: 'This is a test email'
            },
            src: ['dist/'+grunt.option('template')]
          }
        },

    });

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-mailgun');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'assemble','premailer']);

    // Use grunt scss if you only wish to use scss
    grunt.registerTask('scss', ['sass', 'assemble', 'premailer']);

    // Use grunt less if you only wish to use less
    grunt.registerTask('lessCss', ['less', 'assemble', 'premailer']);

    // Use grunt send if you want to actually send the email to your inbox
    grunt.registerTask('send', ['default','mailgun']);

};
