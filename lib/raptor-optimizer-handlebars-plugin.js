var compileFile = require('./compileFile');

module.exports = function(optimizer, config) {
    var dependency = require('./dependency-handlebars');

    function requireReader(path, context, callback) {
        compileFile(path, callback);
    }

    ['hbs',
     'handlebars'].forEach(function(ext) {
        optimizer.dependencies.registerPackageType(ext, dependency);
        optimizer.dependencies.registerRequireExtension(ext, requireReader);
    });
};