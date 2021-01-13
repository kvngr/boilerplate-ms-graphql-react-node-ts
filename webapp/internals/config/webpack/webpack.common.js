/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const ROOT_DIRECTORY = process.cwd();

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    context: ROOT_DIRECTORY,
    target: 'web',
    name: 'client',
    devtool: 'source-map',
    entry: {
        client: './src/index.tsx',
    },
    output: {
        path: path.resolve(ROOT_DIRECTORY, 'build'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.tsx?$/,
                loader: 'ts-loader',
                resolve: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
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
            template: path.resolve(ROOT_DIRECTORY, 'src', 'public', 'index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/public/manifest.json', to: 'manifest.json' },
                { from: 'src/assets/images', to: 'images' },
            ],
        }),
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
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
            }),
        ],
    },
};
