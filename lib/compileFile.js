var fs = require('fs');
var handlebars = require('handlebars');

module.exports = function(path, callback) {
    fs.readFile(path, 'utf8', function(err, src) {
        if (err) {
            return callback(err);
        }
        callback(null, 'module.exports=' + handlebars.precompile(src));
    });
};
