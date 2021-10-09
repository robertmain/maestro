const { resolve: _resolve, sep } = require('path');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { IgnorePlugin } = require('webpack');

const paths = {
    src: _resolve(__dirname) + sep,
    dist: _resolve(__dirname, '..', '..', 'dist'),
};

/**
 * NestJs uses a custom wrapper around require() that allows it to show a
 * warning when some extra package needs to be installed. This causes problems
 * with webpack, so we're blacklisting packages we're not using with the
 * IgnorePlugin below.
 *
 * To de-blacklist a package, just remove it from this array.
 */
const nestBlacklist = [
    '^cache-manager$',
    '^@nestjs/microservices$',
    // packages below are required from microservices
    '^amqp-connection-manager$',
    '^amqplib$',
    '^grpc$',
    '^mqtt$',
    '^nats$',
    '^redis$',
];

/**
 * Server webpack build configuration.
 *
 * This webpack config produces a bundle for the server-side application only.
 *
 * @param {object} webpackEnv Webpack env object (basically any/all options passed in via the CLI)
 * @param {object} processEnv Process env object (environment variables from process.env)
 */
const config = ({ mode = 'none' }) => ({
    name: 'server',
    mode,
    target: 'node',
    entry: paths.src + 'main.ts',
    externals: [nodeExternals()],
    output: {
        path: paths.dist,
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TSConfigPathsPlugin({
                configFile: './tsconfig.build.json',
            }),
        ],
    },
    context: paths.src,
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.ts$/,
                include: paths.src,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                            getCustomTransformers: (program) => ({
                                before: [require('@nestjs/swagger/plugin').before({}, program)],
                            }),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new IgnorePlugin({
            contextRegExp: /@nestjs/,
            resourceRegExp: new RegExp(nestBlacklist.join('|')),
        }),
    ],
    node: {
        __dirname: false,
    },
});

module.exports = {
    config,
    paths,
};
