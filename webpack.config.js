const { config: server } = require('./src/server/webpack.config');

/**
 * Webpack Build File
 *
 * This webpack configuration is used for only building the client and server
 * bundles. It imports both of these from their respective directories, but
 * allows for overrides if required.
 *
 * Other dev tools such as watching, hot module reloading etc. has been split
 * out into other config files
 *
 * @param {object} env Webpack `env` object
 */
module.exports = ({ mode = 'development' } = {}) => ([
    {
        ...server({ mode }, process.env),
    },
]);
