const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: ['./src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: './src/*',
                to: './',
                flatten: true,
                ignore: ['index.html']
            },
            {
                from: './src/css',
                to: 'css',
                toType: 'dir',
                flatten: true
            },
            {
                from: './src/assets',
                to: 'assets',
                toType: 'dir',
            }
        ])
    ]
}

/**
    devServer: {
        contentBase: './dist'
    }, */