
var fs = require('fs');
var handlebars = require('handlebars');

function compileFile(path, callback) {
    fs.readFile(path, 'utf8', function(err, src) {
        if (err) {
            return callback(err);
        }
        callback(null, 'module.exports=' + handlebars.precompile(src));
    });
}

module.exports = function(lasso, config) {
    ['hbs',
     'handlebars'].forEach(function(ext) {
         lasso.dependencies.registerRequireType(
             ext,
             {
                 properties: {
                     'path': 'string'
                 },

                 init: function(lassoContext, callback) {
                     if (!this.path) {
                         return callback(new Error('"path" is required for a Handlebars dependency'));
                     }

                     this.path = this.resolvePath(this.path);
                     callback();
                 },

                 read: function(lassoContext, callback) {
                     compileFile(this.path, callback);
                 },

                 getSourceFile: function() {
                     return this.path;
                 },

                 getLastModified: function(lassoContext, callback) {
                     lassoContext.getFileLastModified(this.path, callback);
                 }
             });
    });
};
