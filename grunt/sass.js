// Takes your SCSS files and compiles them to CSS
const sass = require('node-sass');

module.exports = {
  dist: {
    options: {
      style: 'expanded',
      implementation: sass
    },
    files: [
      {
        expand: true, 
        flatten: true, // do not create subfolders
        cwd: '<%= paths.src %>/css/scss/',
        src: ['*/**/*.scss', '!*/**/_*.scss'],
        dest: '<%= paths.src %>/css/', 
        ext: '.css',
      }
    ]
  },

  // This task compiles Sass for the browser-baed preview UI.
  // You should not need to edit it.
  preview: {
    options: {
      style: 'compressed',
      implementation: sass
    },
    files: {
      '<%= paths.preview %>/css/preview.css': '<%= paths.preview %>/scss/preview.scss'
    }
  }
};
