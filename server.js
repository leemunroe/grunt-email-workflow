var express = require('express'),
    app = express(),
    fs = require('fs');

// Use embedded javascript for the view engine (templates)
app.set('view engine', 'ejs');

// Allow relative links from ./dist to ./src/img
app.use("/src/img", express.static(__dirname + "/src/img"));

// Set the route handler for the preview page.
app.get('/',function(req,res){

  res.status(200);

  // Simple directory walker to get array of ./dist template files
  var templates = [],
      templateFiles = fs.readdirSync(__dirname + '/dist/');

  templateFiles.forEach( function (file) {
      templates.push(file);
  });

  // Set the templates data and send the rendered template
  var data = {
      templates: templates
  };

  res.render(__dirname + '/preview/index', data);

});

module.exports = app;