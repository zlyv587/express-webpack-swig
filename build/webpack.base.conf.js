var path = require('path')
var config = require('../config')
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var utils = require('./utils');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function assetsPath(_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}


var entries = getEntry('src/js/*.js', 'src/js/');



var config  = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].[hash].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      }, {
        test: /\.(png|jpeg|gif|svg|jpg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
}

var viewsObj = getView('src/view/page/*.html', 'src/view/page');
config.plugins = [];
for (var key in viewsObj) {
  var htmlName = viewsObj[key];
  var chunks = htmlName == 'base' ? [htmlName, 'common'] : [htmlName];
  var conf = {
    filename: './view/page/' + htmlName + '.html', //生成的html存放路径，相对于dist
    template: './src/view/page/' + htmlName + '.html', //html模板路径, 相对于项目根目录
    inject: false, //js插入的位置，true/'head'/'body'/false
    // hash: true, //为静态资源生成hash值
    favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
    chunks: chunks,//需要引入的chunk，不配置就会引入所有页面的资源
  }
  config.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = config;

function getView(globPath, pathDir) {
  var files = glob.sync(globPath);
  var entries = {},
    entry, dirname, basename, pathname, extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);

    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
    entries[pathname] =  basename;
  }
  return entries;
}

function getEntry(globPath, pathDir) {
  var files = glob.sync(globPath);
  var entries = {},
    entry, dirname, basename, pathname, extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    entries[basename] = './' + entry;
  }
  return entries;
}

