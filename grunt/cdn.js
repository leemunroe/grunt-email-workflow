// CDN will replace local paths with your CDN path
module.exports = {
  cloudfiles: {
    options: {
      cdn: '<%= secrets.cloudfiles.uri %>', // See README for secrets.json or replace this with your cdn uri
      flatten: true,
      supportedTypes: 'html'
    },
    cwd: './<%= paths.dist %>',
    dest: './<%= paths.dist %>',
    src: ['*.html']
  },
  
  aws_s3: {
    options: {
      cdn: '<%= secrets.s3.bucketuri %>/<%= secrets.s3.bucketdir %>', // See README for secrets.json or replace this with your Amazon S3 bucket uri
      flatten: true,
      supportedTypes: 'html'
    },
    cwd: './<%= paths.dist %>',
    dest: './<%= paths.dist %>',
    src: ['*.html']
  }
};
