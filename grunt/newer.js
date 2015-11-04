// Runs all the default tasks
module.exports = {
  "sass": {
    files: {
      src: ['<%= paths.src %>/css/main.css'],
      dest: ['<%= paths.src %>/css/scss/main.scss']
    },
    options: { tasks: [ "sass:dist" ] }
  },
  "assemble": {
    src: ['<%= paths.src %>/emails/*.hbs'],
    dest: '<%= paths.dist %>/',
    options: { tasks: [ "assemble" ] }
  },
  "juice": {
    files: [{
      expand: true,
      src: ['<%= paths.dist %>/*.html'],
      dest: ''
    }],
    options: { tasks: [ "juice" ] }
  },
  "imagemin": {
    files: [{
      expand: true,
      cwd: '<%= paths.src_img %>',
      src: ['**/*.{png,jpg,gif}'],
      dest: '<%= paths.dist_img %>'
    }],
    options: { tasks: [ "imagemin" ] }
  }
};
