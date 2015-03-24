var express = require('express'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    app = express();

// Use embedded javascript for the view engine (templates)
app.set('view engine', 'ejs');

// Allow relative image links from either ./dist/img or ./src/img
app.use("/src/img", express.static(__dirname + "/src/img"));
app.use("/dist/img", express.static(__dirname + "/dist/img"));

// Set the route handler for the preview page.
app.get('/',function(req,res){

  res.status(200);

  var data = {
      templates: getTemplates()
  };

  res.render(__dirname + '/preview/index', data);

});

module.exports = app;


// Helper function to get templates and their "subject" from <title> tag
function getTemplates() {
    var templates = [],
        templateDir = __dirname + '/dist/',
        templateFiles = fs.readdirSync(templateDir);

    templateFiles.forEach( function (file) {
        if (file.substr(-5) === '.html') {
          var contents = fs.readFileSync(templateDir + file, 'utf8');
          
          if (contents) {
            $ = cheerio.load(contents);

            templates.push({
              'filename': file,
              'subject': $("html title").text() || "Subject not available"
            });
          }
        }
    });

    return templates;
}
