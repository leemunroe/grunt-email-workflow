const fs = require('fs')
const path = require('path')
// Inlines your CSS
module.exports = {
  your_target: {
    options: {
      preserveMediaQueries: true,
      applyAttributesTableElements: true,
      applyStyleTags: true,
      removeStyleTags: false,
      applyWidthAttributes: true,
      preserveImportant: true,
      preserveFontFaces: false,

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
