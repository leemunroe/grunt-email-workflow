module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // secrets.json is ignored in git because it contains sensitive data
    // See the README for configuration settings
    secrets: grunt.file.readJSON('secrets.json'),

    // Re-usable filesystem paths (these shouldn't be modified)
    paths: {
      src:        'src',
      src_img:    'src/img',
      dist:       'dist',
      dist_img:   'dist/img',
      preview:    'preview'
    },





    // Takes your SCSS files and compiles them to CSS
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= paths.src %>/css/main.css': '<%= paths.src %>/css/scss/main.scss'
        }
      },

      // This task compiles Sass for the browser-baed preview UI.
      // You should not need to edit it.
      preview: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= paths.preview %>/css/preview.css': '<%= paths.preview %>/scss/preview.scss'
        }
      }
    },





    // Assembles your email content with HTML layout
    assemble: {
      options: {
        layoutdir: '<%= paths.src %>/layouts',
        partials: ['<%= paths.src %>/partials/**/*.hbs'],
        helpers: ['<%= paths.src %>/helpers/**/*.js'],
        data: ['<%= paths.src %>/data/*.{json,yml}'],
        flatten: true
      },
      pages: {
        src: ['<%= paths.src %>/emails/*.hbs'],
        dest: '<%= paths.dist %>/'
      }
    },





    // Replace compiled template images sources from ../src/html to ../dist/html
    replace: {
      src_images: {
        options: {
          usePrefix: false,
          patterns: [
            {
              match: /(<img[^>]+[\"'])(\.\.\/src\/img\/)/gi,  // Matches <img * src="../src/img or <img * src='../src/img'
              replacement: '$1../<%= paths.dist_img %>/'
            },
            {
              match: /(url\(*[^)])(\.\.\/src\/img\/)/gi,  // Matches url('../src/img') or url(../src/img) and even url("../src/img")
              replacement: '$1../<%= paths.dist_img %>/'
            }
          ]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= paths.dist %>/*.html'],
          dest: '<%= paths.dist %>'
        }]
      }
    },





    // Inlines your CSS
    juice: {
      your_target: {
        options: {
          preserveMediaQueries: true,
          applyAttributesTableElements: true,
          applyWidthAttributes: true,
          preserveImportant: true,
          webResources: {
            images: false
          }
        },
        files: [{
          expand: true,
          src: ['<%= paths.dist %>/*.html'],
          dest: ''
        }]
      }
    },





    // Optimize images
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }]
        },
        files: [{
          expand: true,
          cwd: '<%= paths.src_img %>',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= paths.dist_img %>'
        }]
      }
    },





    // Watches for changes to CSS or email templates then runs grunt tasks
    watch: {
      emails: {
        files: ['<%= paths.src %>/css/scss/*','<%= paths.src %>/emails/*','<%= paths.src %>/layouts/*','<%= paths.src %>/partials/*','<%= paths.src %>/data/*','<%= paths.src %>/helpers/*'],
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
        files: ['<%= paths.preview %>/scss/*'],
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
        src: ['<%= paths.dist %>/'+grunt.option('template')]
      }
    },





    // Use Rackspace Cloud Files if you're using images in your email
    // grunt cdnify
    cloudfiles: {
      prod: {
        'user': '<%= secrets.cloudfiles.user %>', // See README for secrets.json or replace this with your user
        'key': '<%= secrets.cloudfiles.key %>', // See README for secrets.json or replace this with your own key
        'region': '<%= secrets.cloudfiles.region %>', // See README for secrets.json or replace this with your region
        'upload': [{
          'container': '<%= secrets.cloudfiles.container %>', // See README for secrets.json or replace this with your container name
          'src': '<%= paths.dist_img %>/*',
          'dest': '/',
          'stripcomponents': 0
        }]
      }
    },

    // CDN will replace local paths with your CDN path
    cdn: {
      cloudfiles: {
        options: {
          cdn: '<%= secrets.cloudfiles.uri %>', // See README for secrets.json or replace this with your cdn uri
          flatten: true,
          supportedTypes: 'html'
        },
        cwd: './<%= paths.dist %>',
        dest: './<%= paths.dist %>',
        src: ['*.html']
      },
      aws_s3: {
        options: {
          cdn: '<%= secrets.s3.bucketuri %>/<%= secrets.s3.bucketname %>/<%= secrets.s3.bucketdir %>', // See README for secrets.json or replace this with your Amazon S3 bucket uri
          flatten: true,
          supportedTypes: 'html'
        },
        cwd: './<%= paths.dist %>',
        dest: './<%= paths.dist %>',
        src: ['*.html']
      }
    },





    // Use Amazon S3 for images
    // grunt s3upload
    aws_s3: {
      options: {
        accessKeyId: '<%= secrets.s3.key %>', // See README for secrets.json
        secretAccessKey: '<%= secrets.s3.secret %>', // See README for secrets.json
        region: '<%= secrets.s3.region %>', // Enter region or leave blank for US Standard region
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      prod: {
        options: {
          bucket: '<%= secrets.s3.bucketname %>', // Define your S3 bucket name in secrets.json
          differential: true, // Only uploads the files that have changed
          params: {
            CacheControl: '2000'
          }
        },
        files: [
          {expand: true, cwd: '<%= paths.dist_img %>', src: ['**'], dest: '<%= secrets.s3.bucketdir %>/<%= paths.dist_img %>'}
        ]
      }
    },





    // Send your email template to Litmus for testing
    // grunt litmus --template=transaction.html
    litmus: {
      test: {
        src: ['<%= paths.dist %>/'+grunt.option('template')],
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
      START: Browser-based preview tasks.
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
          bases: ['<%= paths.dist %>', '<%= paths.preview %>', '<%= paths.src %>'],
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
      END: Browser-based preview tasks.
      You should not need to edit anything between this and the start block.
    ***************************************************************************************************************/

  });

  // Load assemble
  grunt.loadNpmTasks('assemble');

  // Load all Grunt tasks
  // https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);

  // Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['sass:dist','assemble','juice','imagemin','replace:src_images']);

  // Use grunt send if you want to actually send the email to your inbox
  grunt.registerTask('send', ['mailgun']);

  // Upload images to our CDN on Rackspace Cloud Files
  grunt.registerTask('cdnify', ['default','cloudfiles','cdn:cloudfiles']);

  // Upload image files to Amazon S3
  grunt.registerTask('s3upload', ['aws_s3:prod', 'cdn:aws_s3']);

  // Launch the express server and start watching
  // NOTE: The server will not stay running if the grunt watch task is not active
  grunt.registerTask('serve', ['default', 'sass:preview', 'autoprefixer:preview', 'express', 'open', 'watch']);

};
