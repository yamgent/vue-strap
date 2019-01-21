var webpack = require('webpack')
var path = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    'vue-strap': './src/index.js',
  },
  output: {
    filename: './dist/[name].js',
    library: 'VueStrap',
    libraryTarget: 'umd'
  },
  node: {
    fs: "empty"
  },
  resolve: {
    root: path.resolve('./')
  },
  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue' },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel'
      },
      { test: /\.css$/, loader: "style-loader!css-loader?root=./docs/" },
      {test: /\.scss$/, loader: "style!css!sass"},
      {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      { test: require.resolve("jquery"), loader: "expose-loader?jQuery" }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery'
    })
  ]
};


if (process.env.NODE_ENV === 'production') {
  delete module.exports.devtool;
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery'
    })
  ];
}
