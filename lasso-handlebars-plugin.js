'use strict';

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
                         const pathError = new Error('"path" is required for a Handlebars dependency');
                         if (callback) return callback(pathError);
                         throw pathError;
                     }

                     this.path = this.resolvePath(this.path);
                     if (callback) callback();
                 },

                 read: function(lassoContext, callback) {
                     if (callback) {
                         compileFile(this.path, callback);
                     } else {
                         return new Promise((resolve, reject) => {
                            compileFile(this.path, (err, res) => {
                                return err ? reject(err) : resolve(res);
                            });
                         });
                     }
                 },

                 getSourceFile: function() {
                     return this.path;
                 },

                 getLastModified: function(lassoContext, callback) {
                     return lassoContext.getFileLastModified(this.path, callback);
                 }
             });
    });
};
