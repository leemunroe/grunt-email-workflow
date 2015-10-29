// Watches for changes to CSS or email templates then runs grunt tasks
module.exports = {
  emails: {
    files: ['<%= paths.src %>/css/scss/*','<%= paths.src %>/emails/*','<%= paths.src %>/layouts/*','<%= paths.src %>/partials/**/*','<%= paths.src %>/data/*'],
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
};
