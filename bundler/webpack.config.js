const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer:
    {
        contentBase: './dist',
        open: true,
        host: '0.0.0.0'
    },
    entry: path.resolve(__dirname, '../src/index.js'),
    output:
    {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins:
    [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin([{from: 'src/static'}])
    ],
    module:
    {
        rules:
        [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // ?? necéssaire ?? //
                use: ['babel-loader']
            },
            // {
            //     test: /\.css$/,
            //     use: [MiniCssExtractPlugin.loader, 'css-loader']
            // },
            {
                test: /\.styl$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options: {outputPath: 'images/'}
                    }
                ]
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options: {outputPath: 'fonts/'}
                    }
                ]
            }
        ]
    }
}