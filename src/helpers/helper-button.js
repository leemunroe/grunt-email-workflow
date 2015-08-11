// 
// Helper for bullet proof buttons
// Type accepts 'primary' or 'secondary'
//
// Example:
// {{{ button type="primary" align="center" url="http://www.leemunroe.com" title="Call to action" }}}
//
module.exports.button = function (params) {
  return '\
    <table class="btn btn-' + params.hash.type + '">\
      <tr>\
        <td align="' + params.hash.align + '">\
          <table>\
            <tr>\
              <td>\
                <a href="' + params.hash.url + '">' + params.hash.title + '</a>\
              </td>\
            </tr>\
          </table>\
        </td>\
      </tr>\
    </table>\
  '
};
