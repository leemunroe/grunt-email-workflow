// Use Mailgun option if you want to email the design to your inbox or to something like Litmus
module.exports = function(grunt) {
  return {
    mailer: {
      options: {
        key: '<%= secrets.mailgun.api_key %>', // See README for secrets.json or replace this with your own key
        domain: '<%= secrets.mailgun.domain %>', // See README for secrets.json or replace this with your own email domain
        sender: '<%= secrets.mailgun.sender %>', // See README for secrets.json or replace this with your preferred sender
        recipient: '<%= secrets.mailgun.recipient %>', // See README for secrets.json or replace this with your preferred recipient
        subject: 'This is a test email'
      },
      src: ['<%= paths.dist %>/'+grunt.option('template')]
    }
  }
};
