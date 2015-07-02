// 
// Helper for bullet proof buttons
// Type accepts 'primary' or 'secondary'
//
// Example:
// {{{ button type="primary" url="http://www.leemunroe.com" title="Click to visit" }}}
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
