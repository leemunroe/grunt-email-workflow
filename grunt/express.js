module.exports = {
  server: {
    options: {
      cmd: process.argv[0],
      background: true,
      delay: 1000,
      output: '.+',
      port: 4000,
      script: './server.js',
      debug: true,
      bases: ['<%= paths.dist %>', '<%= paths.preview %>', '<%= paths.src %>'],
      livereload: true,
      spawn: false,
    }
  }
};