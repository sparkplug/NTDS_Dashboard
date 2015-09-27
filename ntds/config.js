var dest = '../static/js/',
    src = './client',
    mui = './node_modules/material-ui/src';

module.exports = {
    browserSync: {
        server: {
            // We're serving the src folder as well
            // for sass sourcemap linking
            baseDir: [dest, src]
        },
        files: [
            dest + '/**'
        ]
    },

    browserify: {
        // Enable source maps
        debug: true,
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: src + 'client/app.js',
            dest: dest,
            outputName: 'bundle.js'
        }]
    }
};
