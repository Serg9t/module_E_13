const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

let mode = 'development';
let hot = true;
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    hot = false;
}

console.log(mode + ' mode');

module.exports = {
    entry: './src/index.js',
    mode: mode,
    output: {
        filename: 'main.js'
    },
    devServer: {
        historyApiFallback: true,
        static: './dist',
        open: true,
        hot: hot,
        port: 3001,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            filename: './index.html'
        }),
        new TerserWebpackPlugin(),
        new ESLintPlugin({
            extensions: ['js'],
            exclude: 'node_modules',
        }),
        // new CssMinimizerPlugin(),
    ],
    optimization:{
        minimize: true,
        minimizer: [new TerserWebpackPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule: true,
                    }

                }, 'css-loader'],
            },
            {
				test: /\.pug$/,
                use: [
                    {
                    loader: 'pug-loader',
                    options: {
                        pretty: true,
                    }
                }
            ],

            },
        ]
    },

};
