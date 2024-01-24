// Inlines your CSS
module.exports = {
  dist: {
    options: {
      preserveMediaQueries: true,
      applyAttributesTableElements: true,
      applyWidthAttributes: true,
      preserveImportant: true,
      preserveFontFaces: true,
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
};
