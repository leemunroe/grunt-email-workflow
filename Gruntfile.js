(function() {
  const path = require('path'),
    folders = {
      app: 'app',
      dist: 'dist',
      tmp: '.tmp'
    };

  module.exports = function(grunt) {
    var path = require('path');

    require('load-grunt-config')(grunt, {
      configPath: [
        path.join(process.cwd(), 'grunt'),
      ],
      init: true,
      data: {
        folders: folders,
        paths: {
          src:        'src',
          src_img:    'src/img',
          dist:       'dist',
          dist_img:   'dist/img',
          preview:    'preview'
        },
      }
    });
  };
})();