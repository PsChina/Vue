const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'bit1.net'),
        filename: 'bundle.js'
    },
    module: {
        rules :[
            {test: /\.jsx?$/, 
                use: [
                    {
                        loader: 'babel-loader', 
                        options: {
                            plugins: [
                                [
                                    "@babel/plugin-proposal-decorators",
                                    {
                                        "legacy": true
                                    }
                                ],
                                "transform-vue-jsx"
                            ],
                            presets: [
                                [
                                  "@babel/preset-env",
                                  {
                                      "targets" : {
                                          "node": "current"
                                      }
                                  },
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/, 
                loader: 'ts-loader',
                exclude: /node_modules/,
                options:{
                    appendTsSuffixTo: [/\.ts\.vue$/],
                    appendTsxSuffixTo: [/\.tsx\.vue$/]
                }
            },
            {test: /\.html?$/, use: 'html-loader'},
            {test: /\.css$/, use: ['style-loader','css-loader']},
            {test: /\.(scss|sass)$/, use: ['vue-style-loader','css-loader','sass-loader']},
            {test: /\.less$/, use: ['vue-style-loader','css-loader','less-loader']},
            {
                test: /\.vue$/,

                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            plugins: [
                                [
                                  "@babel/plugin-proposal-decorators",
                                  {
                                    "legacy": true
                                  }
                                ],
                                "transform-vue-jsx"
                              ],
                              presets: [
                                  [
                                    "@babel/preset-env",
                                    {
                                        "targets" : {
                                            "node": "current"
                                        }
                                    }
                                  ]
                              ],
                              loaders: {
                                ts: [ 
                                  'babel-loader!ts-loader'
                                ],
                                tsx: [
                                  'babel-loader!ts-loader'
                                ]
                              }
                        }
                    }
                ]
            },
            { test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$/, use: [ { 
                loader: 'url-loader', 
                options: {
                    limit: 10000
                } 
            } ]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/index.ejs'),
            title: 'My App',
            filename:'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(), //
        new VueLoaderPlugin()
    ],
    devServer:{
        contentBase: path.resolve(__dirname, 'src'),
        port: 8080,
        // hot: true,
        open: true,
        host: '0.0.0.0',
        // https: true
    },
    resolve:{
        extensions:['.js','.jsx','.vue','.json','.ts','.tsx'],
        alias:{
            'vue$': 'vue/dist/vue.esm.js' 
        }
    }
}