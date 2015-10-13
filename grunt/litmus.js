// Send your email template to Litmus for testing
// grunt litmus --template=transaction.html
module.exports = function(grunt) {
  return {
    test: {
      src: ['<%= paths.dist %>/'+grunt.option('template')],
      options: {
        username: '<%= secrets.litmus.username %>', // See README for secrets.json or replace this with your username
        password: '<%= secrets.litmus.password %>', // See README for secrets.json or replace this with your password
        url: 'https://<%= secrets.litmus.company %>.litmus.com', // See README for secrets.json or replace this with your company url
        clients: ['android4', 'aolonline', 'androidgmailapp', 'aolonline', 'ffaolonline',
        'chromeaolonline', 'appmail6', 'iphone6', 'ipadmini', 'ipad', 'chromegmailnew',
        'iphone6plus', 'notes85', 'ol2002', 'ol2003', 'ol2007', 'ol2010', 'ol2011',
        'ol2013', 'outlookcom', 'chromeoutlookcom', 'chromeyahoo', 'windowsphone8'] // https://#{company}.litmus.com/emails/clients.xml
      }
    }
  }
};
