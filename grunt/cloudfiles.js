// Use Rackspace Cloud Files if you're using images in your email
// grunt cdnify
module.exports = {
  prod: {
    'user': '<%= secrets.cloudfiles.user %>', // See README for secrets.json or replace this with your user
    'key': '<%= secrets.cloudfiles.key %>', // See README for secrets.json or replace this with your own key
    'region': '<%= secrets.cloudfiles.region %>', // See README for secrets.json or replace this with your region
    'upload': [{
      'container': '<%= secrets.cloudfiles.container %>', // See README for secrets.json or replace this with your container name
      'src': '<%= paths.dist_img %>/*',
      'dest': '/',
      'stripcomponents': 0
    }]
  }
};
