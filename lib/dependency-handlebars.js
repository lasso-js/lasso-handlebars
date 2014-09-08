var compileFile = require('./compileFile');

module.exports = {
    properties: {
        'path': 'string'
    },

    init: function() {
        if (!this.path) {
            throw new Error('"path" is required for a Handlebars dependency');
        }

        this.path = this.resolvePath(this.path);
    },

    read: function(optimizerContext, callback) {
        var path = this.path;
        compileFile(path, callback);
    },

    getSourceFile: function() {
        return this.path;
    },

    lastModified: function(optimizerContext, callback) {
        optimizerContext.getFileLastModified(this.path, callback);
    }
};
