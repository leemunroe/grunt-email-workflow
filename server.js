var express = require('express'),
    cheerio = require('cheerio'),
    path = require('path'),
    fs = require('fs'),
    app = express();

// Use embedded javascript for the view engine (templates)
app.set('view engine', 'ejs');

// Routes to assets
app.use('/', express.static(path.join(__dirname, '/preview')));
app.use('/css', express.static(path.join(__dirname, '/preview/css')));
app.use('/dist', express.static(path.join(__dirname, '/dist')));

// Allow relative image links from either ./dist/img or ./src/img
app.use('/src/img', express.static(path.join(__dirname, '/src/img')));
app.use('/dist/img', express.static(path.join(__dirname, '/dist/img')));

// DEBUG - load CSS directly for inspection
// app.use('/src/css', express.static(path.join(__dirname, '/src/css')));

app.use(require('connect-livereload')({
  port: 35729
}));

app.listen(process.env.PORT, function() {
  console.log('Express server listening.');
});

// Set the route handler for the preview page.
app.get('/', (req, res) => {

  res.status(200);

  var data = {
      templates: getTemplates()
  };

  res.render(path.join(__dirname,'/preview/index'), data);
});

module.exports = app;

// DEBUG - custom callback for simple server logging
/*
module.exports = app.listen(4000, function() {
  console.log('Express server listening on port ' + app.get('port'));
});
*/

// Helper function to get templates and their 'subject' from <title> tag
function getTemplates() {
    var templates = [],
        templateDir = path.join(__dirname,'/dist/'),
        templateFiles = fs.readdirSync(templateDir);

    templateFiles.forEach( function (file) {
        // if (file.substr(-5) === '.html') {
          if (file.substring(file.length -5) === '.html') {
          
          var contents = fs.readFileSync(templateDir + file, 'utf8');
          
          if (contents) {
            $ = cheerio.load(contents);

            templates.push({
              'filename': '/dist/' + file,
              'subject': $('html title').text() || 'Subject not available'
            });
          }
        }
    });

    return templates;
}
