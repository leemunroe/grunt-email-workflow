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
              'src/css/main.css': 'src/css/scss/main.scss'
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


        // Optimize image sizes
        imagemin: {
          png: {
            options: {
              optimizationLevel: 7
            },
            files: [
              {
                expand: true,
                cwd: 'src/img',
                src: ['**/*.png'],
                dest: 'dist/img',
                ext: '.png'
              }
            ]
          },
          jpg: {
            options: {
              progressive: true
            },
            files: [
              {
                expand: true,
                cwd: 'src/img/',
                src: ['**/*.jpg'],
                dest: 'dist/img',
                ext: '.jpg'
              }
            ]
          }
        },


        // Watches for changes to css or email templates then runs grunt tasks
        watch: {
          files: ['src/css/scss/*','src/emails/*','src/layouts/*'],
          tasks: ['default']
        },





        // Use Mailgun option if you want to email the design to your inbox or to something like Litmus
        // grunt send --template=transaction.html
        mailgun: {
          mailer: {
            options: {
              key: 'MAILGUN_KEY', // Enter your Mailgun API key here
              sender: 'me@me.com', // Change this
              recipient: 'you@you.com', // Change this
              subject: 'This is a test email'
            },
            src: ['dist/'+grunt.option('template')]
          }
        },





        // Use Rackspace Cloud Files if you're using images in your email
        cloudfiles: {
          prod: {
            'user': 'Rackspace Cloud Username', // Change this
            'key': 'Rackspace Cloud API Key', // Change this
            'region': 'ORD', // Might need to change this
            'upload': [{
              'container': 'Files Container Name', // Change this
              'src': 'src/img/*',
              'dest': '/',
              'stripcomponents': 0
            }]
          }
        },

        // Use Amazon S3 for images
        s3: {
          options: {
            key: 'KEY', // define this
            secret: 'SECRET', // define this
            access: 'public-read',
            region: 'us-east-1', // feel free to change this
            headers: {
              // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
              "Cache-Control": "max-age=630720000, public",
              "Expires": new Date(Date.now() + 63072000000).toUTCString()
            }
          },
          dev: {
            options: {
              maxOperations: 20,
              bucket: 'BUCKET-NAME' // define this
            },
            upload: [
              {
                src: 'dist/**/*',
                dest: 'public/emails/', // define this
                rel: 'dist', // rel must be set to maintain directory structure of src
                options: { gzip: true }
              }
            ]
          }
        },

        // CDN will replace local paths with your Cloud CDN path
        cdn: {
          options: {
            cdn: 'Rackspace Cloud CDN URI', // Change this
            flatten: true,
            supportedTypes: 'html'
          },
          dist: {
            src: ['./dist/*.html']
          }
        },





        // Send your email template to Litmus for testing
        // grunt litmus --template=transaction.html
        litmus: {
          test: {
            src: ['dist/'+grunt.option('template')],
            options: {
              username: 'username', // Change this
              password: 'password', // Change this
              url: 'https://yourcompany.litmus.com', // Change this
              clients: ['android4', 'aolonline', 'androidgmailapp', 'aolonline', 'ffaolonline',
              'chromeaolonline', 'appmail6', 'iphone6', 'ipadmini', 'ipad', 'chromegmailnew',
              'iphone6plus', 'notes85', 'ol2002', 'ol2003', 'ol2007', 'ol2010', 'ol2011',
              'ol2013', 'outlookcom', 'chromeoutlookcom', 'chromeyahoo', 'windowsphone8'] // https://#{company}.litmus.com/emails/clients.xml
            }
          }
        }

    });

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-mailgun');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cloudfiles');
    grunt.loadNpmTasks('grunt-cdn');
    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-litmus');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass','assemble','premailer','imagemin']);

    // Use grunt send if you want to actually send the email to your inbox
    grunt.registerTask('send', ['mailgun']);

    // Upload images to our CDN on Rackspace Cloud Files
    grunt.registerTask('cdnify', ['default','cloudfiles','cdn']);

    // Separate task to manually upload files to Amazon S3 bucket
    grunt.registerTask('upload', ['s3']);

};
