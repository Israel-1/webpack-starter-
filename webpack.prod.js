const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require("mini-css-extract-plugin"); 
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); 
const CopyPlugin              = require("copy-webpack-plugin"); 
const MinifyPlugin            = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
 
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },

    output: {
        filename: "main.[contentHash].js", 
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /styles\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },

            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    
                },
            }, 
            
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: 'assets/[name].[ext]'
                    }
                }]
            }, 

            {
                test: /\.js/, 
                exclude: /node_modules/, 
                use: [
                    "babel-loader"
                ]
            }
        ]
    },
    
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),

        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css", 
            ignoreOrder: false
        }),

        new CopyPlugin([
            {from: "src/assets", to: "assets/"}
        ]), 

        new MinifyPlugin(), 
        new CleanWebpackPlugin(),
    ]
 
}

