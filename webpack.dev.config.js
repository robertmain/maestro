const server = require('./src/server/webpack.config');
const { HotModuleReplacementPlugin } = require('webpack');

const {
    SERVER_PORT = 3000,
} = process.env;

/**
 * Watch settings are the same between client and server, so we're keeping them
 * here for consistency
 */
const watchConfig = {
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
};

/**
* Development Webpack Build File
*
* This webpack configuration extends `webpack.config.js` and builds on it to
* provide hot module replacement, watch moide and a dev server for the
* client-side code
*
* Other dev tools such as watching, hot module reloading etc. has been split
* out into other config files
*
* @param {object} env Webpack `env` object
*/
module.exports = ({ mode = 'development' } = {}) => ([
    {
        ...server.config({ mode }, process.env),
        ...watchConfig,
        plugins: [
            ...server.config({ mode }, process.env).plugins,
            new HotModuleReplacementPlugin(),
        ],
    },
]);
