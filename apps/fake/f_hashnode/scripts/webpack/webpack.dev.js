const path = require('path');
const base = require('./webpack.base');
const webpack = require('webpack');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(base, {
    output: {
        path: path.resolve(__dirname, '../../public/build'),
        filename: '[name].[hash].js',
        publicPath: '/public/build',
        hotUpdateChunkFilename: './hot/hot-update.js',
        hotUpdateMainFilename: './hot/hot-update.json',
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../../public/views/index.html'),
            template: path.resolve(__dirname, '../../public/views/index.template.html'),
            inject: 'body',
            chunks: ['app'],
            // alwaysWriteToDisk: true
        }),
        // new CopyWebpackPlugin([{
        //     from: __dirname + '/../../public/views/index.html',
        //     to: path.resolve(__dirname, '../../public/build/'),
        // }]),
        new HtmlWebpackHarddiskPlugin(),
        new WriteFileWebpackPlugin({
            test: /^(?!.*(hot)).*/,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, "../../public/views"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
        // proxy: {
        //     '/app/partials/': {
        //         target: 'http://localhost:3000/',
        //         pathRewrite: { '^/app/partials': '/'}
        //     }
        // },
        publicPath: '/public/build/',
        inline: true,
        hot: true,
        allowedHosts: [
            'hashnode.lilyzt.com'
        ],
        port: 8090, //端口改为9000
        // open:true // 自动打开浏览器，适合懒人
    }
})