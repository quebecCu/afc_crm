var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    plugins: [
      new ExtractTextPlugin('styles.css')
    ],
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract(
                'style-loader',
                combineLoaders([{
                  loader: 'css-loader',
                  query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                  }
                }])
              )
            }
        ]
    }
};

module.exports = config;
