var path = require('path');
const pkg = require("./package.json");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack');


//当前运行环境
const production = process.env.NODE_ENV === 'production';
process.noDeprecation = true;
var plugins = [
  new ProgressBarPlugin(),
  new HappyPack({
    id: 'jsx',
    threads: 4,
    loaders: [ 'babel-loader' ]
  }),
  new HappyPack({
    id: 'less',
    threads: 4,
    loaders: ['css-loader?minimize=true', 'less-loader'],
  }),
  new HappyPack({
    id: 'scss',
    threads: 4,
    loaders: ['css-loader?minimize=true', 'sass-loader'],
  }),
  new CopyWebpackPlugin([{from: './dll',to:'dll'}]),
  new HtmlWebpackPlugin({
    title: pkg.name,
    inject: 'body',
    filename: 'index.html',
    template: 'index.html'
  })
]

if (production) {
  // const releasePath = path.resolve(__dirname, "../../resources/static/module");
  const releasePath = path.resolve(__dirname, "build");
    plugins.push(
        new ExtractTextPlugin('[name].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
        filename: '[name].js',
      }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require', 'module', '_']
            },
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new CleanWebpackPlugin([pkg.name], {root: releasePath, verbose: true})

    )
} else {
    plugins.push(
        new ExtractTextPlugin('[name].css?[hash]'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require('./dll/manifest.json')
        }),
    )
}

module.exports = {
    entry: {
        [pkg.name]: [
            'babel-polyfill',
            './src/main'
        ]
    },
    output: {
        filename: production ? '[name].js' : '[name].js?[hash]',
        path: path.join(__dirname, 'build'),
        publicPath: production ? './' : '/',
        chunkFilename:  '[name].[chunkhash].chunk.js'
    },
    devtool: 'source-map',
    plugins,
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
          utils: path.resolve(process.cwd(), "src/utils"),
          pages: path.resolve(process.cwd(), "src/pages"),
          components: path.resolve(process.cwd(), "src/components")
        }
    },

    module: {
        rules: [{
            test: /\.js?$/,
            use: 'happypack/loader?id=jsx',
            exclude: /(node_modules)/
        }, {
            test: /\.scss/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'happypack/loader?id=scss'
            })
        }, {
            test: /\.(less|css)$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'happypack/loader?id=less'
            })
        }, {
            test: /\.(png|jpg|gif|md)$/,
            use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: ['url-loader?limit=10000&mimetype=images/svg+xml']
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }]
    },
    devServer: {//webpack-dev-server配置热更新以及跨域
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true,//实时刷新
        port: '8888',  //不指定固定端口
        hot: true,
        proxy: {
          "**": "/"
        }
    },
};