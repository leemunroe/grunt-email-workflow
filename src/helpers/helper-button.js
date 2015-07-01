// 
// Helper for bullet proof buttons
// Example:
// {{{ button 'http://www.leemunroe.com' 'Click here' }}}
//
module.exports.button = function (params) {
  return '\
    <table class="btn btn-'+ params.hash.type +'">\
      <tr>\
        <td>\
          <a href="' + params.hash.url + '">' + params.hash.title + '</a>\
        </td>\
      </tr>\
    </table>\
  '
};
