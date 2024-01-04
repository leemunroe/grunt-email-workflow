// Clean your /dist folder
module.exports = {
  clean: ['!<%= paths.dist %>/.gitkeep', '<%= paths.dist %>/**/*']
};
