const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = env => {
    const config = {
        entry: __dirname + '/src/app/index.ts',
        output: {
            path: __dirname + '/dist',
            filename: 'bundle.js',
            publicPath: '/',
        },
        resolve: {
            modules: [
                __dirname,
                path.join(__dirname, 'node_modules'),
            ],
            alias: {
                '@': `src`,
            },
            extensions: ['.ts', '.tsx', '.js', '.scss', '.png'],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: [/node_modules/]
                },
                {
                    test: /\.(sass|scss)$/,
                    use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                mimetype: 'image/png',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + '/src/public/index.html',
                inject: 'body',
            }),
        ],
        devServer: {
            contentBase: './src/public',
            port: 7700,
        }
    }

    if (env.production) {
        config.plugins.push(new ScriptExtHtmlWebpackPlugin({
            inline: [/\.(js|css)$/],
        }))
    } else {
        config.plugins.push(new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'pixi.js',
                    entry: 'dist/pixi.min.js',
                    global: 'PIXI',
                }
            ],
        }))
    }

    return config
}
