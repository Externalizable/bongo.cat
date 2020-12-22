const path = require('path')
const webpack = require('webpack')
const nodeExternal = require('webpack-node-externals')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        server: './src/server.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath : '/'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename:false
    },
    externals: [nodeExternal()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
                include: [
                    path.resolve(__dirname, './src')
                ]
            }, 
            // {
            //     test: /\.html$/,
            //     use: [{loader: 'html-loader'}]
            // }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html',
            excludeChunks: ['server']
        })
    ]
}