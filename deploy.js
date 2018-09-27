const path = require('path');
const glob = require('glob');
const ejs = require('ejs');
const cheerio = require('cheerio');
const fs = require('fs')

function renderTemplates() {
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

  ejs.renderFile(__dirname + '/deploy/index.ejs', { templates }, {} , function(err, str) {
    // str => Rendered HTML string
      fs.writeFileSync(__dirname + '/deploy/index.html', str, 'utf-8');
  });
}

renderTemplates()