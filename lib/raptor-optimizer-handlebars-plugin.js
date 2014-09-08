var compileFile = require('./compileFile');

module.exports = function(optimizer, config) {
    optimizer.dependencies.registerJavaScriptType('hbs', require('./dependency-handlebars'));
    optimizer.dependencies.registerRequireExtension('hbs', function(path, context, callback) {
        compileFile(path, callback);
    });
};