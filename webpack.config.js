

const webpack = require('webpack');
/*,
        ,
    "plugins" : [
         "transform-object-assign",
         ["transform-es2015-modules-commonjs", { "loose": true }],
         "transform-es3-property-literals",
         "transform-es3-member-expression-literals"
    ], "*/
var libraryName = 'k_logging';

module.exports = {
    entry: {
        index: './Src/index',
    },
    //devtool: "cheap-module-source-map",
    output: {
        path: 'Public',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: '[name].bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                include: __dirname+ '/Src',
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: __dirname + '/Src',
            },
            {
                test: /\.scss$/,
                loaders: ['style','css','sass'],
            },/*
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.woff$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot$/,
                loader: "file-loader"
            },
            {
                test: /\.svg$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            }*/
        ],
    },
    plugins: [
        //压缩JS
        /*new webpack.DefinePlugin({
              'process.env': {
                NODE_ENV: JSON.stringify('production')
              }
            }),
        new webpack.optimize.UglifyJsPlugin(),*/

        //七牛插件
        /*new QiniuPlugin({

        // 七牛云的两对密匙 Access Key & Secret Key
        accessKey: '7SXiYZNWBQyXvS8eRg0PFNMlcRIxS9xQ2NaunjXn',

        secretKey: 'trgyS9ecNNBIogkKsOkipGQEe9TMYPNErSdDdKfO',

        // 七牛云存储空间名称
        bucket: 'journey',

        // 上传到七牛后保存的文件名
        path: 'rc/journey/0.0.1'

      }),*/
    ],
};
