// Replace compiled template images sources from ../src/html to ../dist/html
module.exports = {
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
        },
        {
          match: /<mgtag>(.*?)<\/mgtag>/gi,  // Matches <mgtag>example</mgtag> and converts it to handlebar's {{example}}
          replacement: '{{$1}}'
        },
      ]
    },

    files: [{
      expand: true,
      flatten: true,
      src: ['<%= paths.dist %>/*.html'],
      dest: '<%= paths.dist %>'
    }]
  }
};
