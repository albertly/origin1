const path = require('path');

const { ProvidePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcFolder = 'src';
const distFolder = 'dist';

module.exports = (env, options) => {
return {
    entry: path.join(__dirname, srcFolder, 'ts', 'app.tsx') ,


    module: {
        rules: [
        { test: /\.tsx?$/, loader: 'ts-loader'},
        { test: /\.json$/, loader: 'json'},
        { test: /\.scss$/, 
            exclude: [path.join(__dirname, srcFolder, 'ts')],
            loader: ['style', 'css', 'sass']
        },

        { test: /\.scss$/, 
            exclude: [path.join(__dirname, srcFolder, 'scss')],

            loader: ['raw', 'sass']
        }

        ]

    },

    plugins: [
        new ProvidePlugin({
            'Promise': 'es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),

        new CopyWebpackPlugin([{
            from: path.join(srcFolder, 'images'),
            to: path.join('..', 'images')
        }]),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, srcFolder, 'index.html'),
            filename: path.join('..', 'index.html'),
            inject: 'body'
        })


    ],

    output: {
        path: path.join(__dirname, distFolder, 'js'),
        filename: '[name].js',
        publicPath: '/js'
    },

    devtool: 'source-map',

    devServer: {
        contentBase: 'dist',
        historyApiFallback: true,
        port: 5000,
        proxy: {
            '/widgets': {
                target: 'http://0.0.0.0:3010'
            }
        }
    }


}};