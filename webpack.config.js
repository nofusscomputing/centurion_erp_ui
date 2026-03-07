const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => {

  const isDevelopment = argv.mode !== 'production';

    return {
        entry: {
            bundle: path.resolve(__dirname, 'src', 'index.js'),
        },

        output: {
            path: path.resolve(__dirname, 'build'),
            filename: isDevelopment ? '[name].js' : 'assets/js/[name].[contenthash].js',
            publicPath: '/',
            clean: true,
        },

        devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',

        devServer: {
            static: path.resolve(__dirname, 'public'),
            hot: true,
            historyApiFallback: true, // SPA routing
            open: true,
            compress: true,
            port: 3000,
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                isDevelopment && require.resolve('react-refresh/babel')
                            ].filter(Boolean)
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[name].[contenthash][ext]'
                    }
                },
                {
                    test: /\.(ttf|woff2)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[name].[contenthash][ext]'
                    }
                },

                /**
                 * Customize .svg
                 * 
                 * Note: must be after any other rules that may match.
                 */

                {    // src/images/icons
                    test: /\/icons\/[a-zA-Z]+\.svg$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/icons/[name].[contenthash][ext]'
                    }
                },
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            new Dotenv(),
            isDevelopment && new ReactRefreshWebpackPlugin(),
            !isDevelopment && new MiniCssExtractPlugin({
                filename: 'assets/styles/[name].[contenthash].css'
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "public",
                        to: ".",
                        globOptions: {
                            ignore: ["**/index.html"]
                        }
                    }
                ]
            })
        ].filter(Boolean),

        resolve: {
            extensions: ['.js', '.jsx']
        }
    };

};
