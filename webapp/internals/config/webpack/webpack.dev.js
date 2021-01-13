/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        port: 8090,
        contentBase: './build',
        compress: true,
        historyApiFallback: true,
        // open: true,
        hot: true,
    },
    plugins: [
        new BundleAnalyzerPlugin({ openAnalyzer: false }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
    ],
});
