// 
// Helper for bullet proof buttons
// Example:
// {{{primary_button 'http://www.leemunroe.com' 'Click here'}}}
//
module.exports.primary_button = function (url, title) {
  return '\
    <table class="btn btn-primary">\
      <tr>\
        <td>\
          <a href="' + url + '">' + title + '</a>\
        </td>\
      </tr>\
    </table>\
  '
};
