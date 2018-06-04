// Takes your SCSS files and compiles them to CSS
module.exports = {
  dist: {
    options: {
      style: 'expanded'
    },
    files: {
      '<%= paths.src %>/css/unstyled.css': '<%= paths.src %>/css/scss/unstyled.scss',
      '<%= paths.src %>/css/main.css': '<%= paths.src %>/css/scss/main.scss',
      '<%= paths.src %>/css/pdf.css': '<%= paths.src %>/css/scss/pdf.scss'
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
};
