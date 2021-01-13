/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const NodemonWebpackPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const ROOT_DIRECTORY = process.cwd();

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    context: ROOT_DIRECTORY,
    name: 'server',
    target: 'node',
    mode: NODE_ENV,
    watch: process.env.NODE_ENV === 'development' ? true : false,
    devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
    entry: {
        server: './src/index.ts',
    },
    output: {
        path: path.resolve(ROOT_DIRECTORY, 'build', 'server'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: process.env.NODE_ENV === 'development' ? [new NodemonWebpackPlugin()] : [],
    externals: [
        nodeExternals(),
        new Dotenv({
            path: path.resolve(ROOT_DIRECTORY, 'config', `.env.${NODE_ENV}`),
            safe: true,
            allowEmptyValues: true,
            systemvars: true,
            silent: true,
            defaults: false,
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
};
