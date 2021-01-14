/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const { DefinePlugin } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ROOT_DIRECTORY = process.cwd();
const NODE_ENV = process.env.NODE_ENV;

const env = require('dotenv').config({ path: `../config/.env.${NODE_ENV}` }).parsed;

const MAX_FILE_SIZE_IN_BYTES = 5000000;

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = (env, argv) => {
    // Only for SSR
    if (env.platform === 'server') {
        config.name = 'server';
        config.target = 'node';
        config.entry = {
            server: './src/index.ts',
        };
        config.output = {
            filename: '[name].[contenthash:6].js',
            chunkFilename: '[name].[contenthash:6].js',
        };
    }

    const config = {
        context: ROOT_DIRECTORY,
        target: 'web',
        name: 'client',
        devtool: 'source-map',
        entry: {
            client: ['react-hot-loader/patch', './src/index.tsx'],
        },
        output: {
            path: path.resolve(ROOT_DIRECTORY, 'build'),
            filename: '[name].[contenthash:6].js',
            chunkFilename: '[name].[contenthash:4].js',
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    exclude: /(node_modules|bower_components)/,
                    test: /\.(ts|js)x?$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                    resolve: {
                        extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    },
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(png|jpg|svg|gif|ico|woff|pdf|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/[name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                inject: true,
                template: path.resolve(ROOT_DIRECTORY, 'src', 'public', 'index.html'),
                minify: NODE_ENV === 'production' ? true : false,
            }),
            new DefinePlugin(envKeys),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'src/public/manifest.json', to: 'manifest.json' },
                    { from: 'src/assets/images', to: 'images' },
                ],
            }),
            new InjectManifest({
                swSrc: './src/serviceWorker.ts',
                swDest: 'serviceWorker.js',
                maximumFileSizeToCacheInBytes: MAX_FILE_SIZE_IN_BYTES,
            }),
        ],
        resolve: {
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: './tsconfig.json',
                }),
            ],
            alias: {
                'react-dom': '@hot-loader/react-dom',
            },
        },
    };

    return config;
};
