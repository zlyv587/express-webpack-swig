var path = require('path')
var glob = require('glob');
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var swigPlugin = require('./swig.js');

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;

var commonsChunk = getCommonsChunk('src/js/*.js', 'src/js/page/');

console.log(commonsChunk);

function getCommonsChunk(globPath, pathDir) {
  var files = glob.sync(globPath);
  var entries = [],
    entry, dirname, basename, extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    entries.push(basename);
  }
  return entries;
}

var cssLoader = [
  {
    loader: 'css-loader',
  },
  {
    loader: 'postcss-loader',
  },
  {loader: 'less-loader'}
];
var webpackConfig = merge(baseWebpackConfig, {
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: cssLoader,
          fallback: 'style-loader',
        }),
      },
    ]
  },
  devtool: false,
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: {
    //     safe: true
    //   }
    // }),
    // 压缩css 导致postcss不起作用
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name]. css')
    }),
    new swigPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: commonsChunk, //提取哪些模块共有的部分
      minChunks: commonsChunk.length // 提取至少3个模块共有的部分
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

console.log(JSON.stringify(webpackConfig.module.rules[4]));

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
