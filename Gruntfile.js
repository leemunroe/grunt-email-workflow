module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // secrets.json is ignored in git because it contains sensitive data
        // See the README for configuration settings
        secrets: grunt.file.readJSON('secrets.json'),





        // Takes your scss files and compiles them to css
        sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
              'src/css/main.css': 'src/css/scss/main.scss'
            }
          },
          // This task complies sass for the browser-baed preview UI.
          // You should not need to edit it.
          preview: {
            options: {
              style: 'compressed'
            },
            files: {
              'preview/css/preview.css': 'preview/scss/preview.scss'
            }
          }
        },





        // Assembles your email content with html layout
        assemble: {
          options: {
            layoutdir: 'src/layouts',
            partials: ['src/partials/**/*.hbs'],
            data: ['src/data/*.{json,yml}'],
            flatten: true
          },
          pages: {
            src: ['src/emails/*.hbs'],
            dest: 'dist/'
          }
        },





        // Inlines your css
        premailer: {
          html: {
            options: {
              removeComments: true
            },
            files: [{
                expand: true,
                src: ['dist/*.html'],
                dest: ''
            }]
          },
          txt: {
            options: {
              mode: 'txt'
            },
            files: [{
                expand: true,
                src: ['dist/*.html'],
                dest: '',
                ext: '.txt'
            }]
          }
        },





        // Watches for changes to css or email templates then runs grunt tasks
        watch: {
          emails: {
            files: ['src/css/scss/*','src/emails/*','src/layouts/*','src/partials/*','src/data/*'],
            tasks: ['default']
          },
          preview_dist: {
            files: ['./dist/*'],
            tasks: [],
            options: {
              livereload: true
            }
          },
          preview: {
            files: ['./preview/scss/*'],
            tasks: ['sass:preview','autoprefixer:preview'],
            options: {
              livereload: true
            }
          }
        },





        // Use Mailgun option if you want to email the design to your inbox or to something like Litmus
        // grunt send --template=transaction.html
        mailgun: {
          mailer: {
            options: {
              key: '<%= secrets.mailgun.api_key %>', // See README for secrets.json or replace this with your own key
              sender: '<%= secrets.mailgun.sender %>', // See README for secrets.json or replace this with your preferred sender
              recipient: '<%= secrets.mailgun.recipient %>', // See README for secrets.json or replace this with your preferred recipient
              subject: 'This is a test email'
            },
            src: ['dist/'+grunt.option('template')]
          }
        },





        // Use Rackspace Cloud Files if you're using images in your email
        cloudfiles: {
          prod: {
            'user': '<%= secrets.cloudfiles.user %>', // See README for secrets.json or replace this with your user
            'key': '<%= secrets.cloudfiles.key %>', // See README for secrets.json or replace this with your own key
            'region': '<%= secrets.cloudfiles.region %>', // See README for secrets.json or replace this with your region
            'upload': [{
              'container': '<%= secrets.cloudfiles.container %>', // See README for secrets.json or replace this with your container name
              'src': 'src/img/*',
              'dest': '/',
              'stripcomponents': 0
            }]
          }
        },

        // CDN will replace local paths with your Cloud CDN path
        cdn: {
          options: {
            cdn: '<%= secrets.cloudfiles.uri %>', // See README for secrets.json or replace this with your cdn uri
            flatten: true,
            supportedTypes: 'html'
          },
          dist: {
            cwd: './dist/',
            dest: './dist/',
            src: ['*.html']
          }
        },





        // Send your email template to Litmus for testing
        // grunt litmus --template=transaction.html
        litmus: {
          test: {
            src: ['dist/'+grunt.option('template')],
            options: {
              username: '<%= secrets.litmus.username %>', // See README for secrets.json or replace this with your username
              password: '<%= secrets.litmus.password %>', // See README for secrets.json or replace this with your password
              url: 'https://<%= secrets.litmus.company %>.litmus.com', // See README for secrets.json or replace this with your company url
              clients: ['android4', 'aolonline', 'androidgmailapp', 'aolonline', 'ffaolonline',
              'chromeaolonline', 'appmail6', 'iphone6', 'ipadmini', 'ipad', 'chromegmailnew',
              'iphone6plus', 'notes85', 'ol2002', 'ol2003', 'ol2007', 'ol2010', 'ol2011',
              'ol2013', 'outlookcom', 'chromeoutlookcom', 'chromeyahoo', 'windowsphone8'] // https://#{company}.litmus.com/emails/clients.xml
            }
          }
        },

        /**************************************************************************************************************
          START: Brower-based preview tasks.
          You should not need to edit anything between this and the end block.
        ***************************************************************************************************************/

        // Autoprefixer for css
        autoprefixer: {
          preview: {
            options: {
              browsers: ['last 6 versions', 'ie 9']
            },
            src: 'preview/css/preview.css'
          }
        },

        // Express server for browser previews
        express: {
          server: {
            options: {
              port: 4000,
              hostname: '127.0.0.1',
              bases: ['./dist', './preview', './src'],
              server: './server.js',
              livereload: true
            }
          }
        },

        // Open browser preview
        open: {
          preview: {
            path: 'http://localhost:4000'
          }
        }

        /**************************************************************************************************************
          END: Brower-based preview tasks.
          You should not need to edit anything between this and the start block.
        ***************************************************************************************************************/

    });

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-mailgun');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cloudfiles');
    grunt.loadNpmTasks('grunt-cdn');
    grunt.loadNpmTasks('grunt-litmus');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-open');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass','autoprefixer:preview','assemble','premailer']);

    // Use grunt send if you want to actually send the email to your inbox
    grunt.registerTask('send', ['mailgun']);

    // Upload images to our CDN on Rackspace Cloud Files
    grunt.registerTask('cdnify', ['default','cloudfiles','cdn']);

    // Launch the express server and start watching
    // NOTE: The server will not stay running if the grunt watch task is not active
    grunt.registerTask('serve', ['default', 'express', 'open', 'watch']);


};
