require('colors');
var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var swig = require('swig');
var proxyMiddleware = require('http-proxy-middleware');


function setDevServerConfig(app) {
  var proxyMiddleware = require('http-proxy-middleware');
  var webpackConfig = require('./build/webpack.dev.conf');
  var webpack = require('webpack');
  var compiler = webpack(webpackConfig);
  var fs = require('fs');
  var mkdirp = require('mkdirp');
  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
  });
  var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {
    }
  })
// force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({action: 'reload'})
      cb()
    })
  });
  // serve webpack bundle output
  app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
  app.use(hotMiddleware);
  app.use((req, res, next) => {
    var filename = './src/view/component';
    var distName = './dist/view/component';
    mkdirp(distName, function () {
      syncFiles(filename, distName);
      next()
    });
  });
  function syncFiles(src, target) {
    fs.readdir(src, function (err, paths) {
      if (err) {
        console.log('读取文件夹出错')
      }
      paths.map(function (_p) {
        if (!/\./.test(_p)) {
          let p = path.join(target, _p);
          // console.log(p)
          if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
          }
          return syncFiles(path.join(src, _p), p)
        }
        // var data = fs.readFileSync(path.join(src, _p), 'utf8');
        // fs.writeFileSync(path.join(target, _p), data);
        var readstream = fs.createReadStream(path.join(src, _p));
        var writestream = fs.createWriteStream(path.join(target, _p));
        readstream.pipe(writestream);
      });
    });
  }

  app.use((req, res, next) => {
    var templateOutPath = compiler.outputPath + '/view/page/'
    var filename = templateOutPath + 'base.html';
    compiler.outputFileSystem.readFile(filename, function (err, result) {
      var fileInfo = path.parse(path.join(filename));
      mkdirp(fileInfo.dir, () => {
        fs.writeFileSync(path.join(filename), result);
        next()
      });
    });
  });
  console.log('> Starting dev server...')
  devMiddleware.waitUntilValid(() => {
    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
      // opn(uri)
    }
  })

  var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
  app.use(staticPath, express.static('./static'));
  require('./routes/web_routers')(app, compiler);

}

function getApp() {
  var app = express();
  if (process.env.NODE_ENV === 'dev') {
    setDevServerConfig(app);
  } else {
    app.use(express.static(path.join(__dirname, './dist')));
  }
// view engine setup
  app.set('views', path.join(__dirname, 'dist/view/page'));

  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  swig.setDefaults({cache: false});
// 传说中可以使favicon走内存，提高性能？
  app.use(favicon(path.join(__dirname, 'src/img/favicon.ico')));

// // 本地开发用,反向代理客户端请求
//     if (!process.env.onCloud) {
//         var proxyTable = config.proxyTable;
//         Object.keys(proxyTable).forEach(function (context) {
//             var options = proxyTable[context];
//             if (typeof options === 'string') {
//                 options = {target: options}
//             }
//             app.use(proxyMiddleware(options.filter || context, options))
//         });
//
//         // console访问记录
//         app.use(consoleLog(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'));
//         // 打印渲染时间
//         app.use(renderMiddleWare.render);
//     }


// 引入路由
  if (process.env.NODE_ENV !== 'dev') {
    require('./routes/web_routers')(app);
  }

// app.use('', web_routers);

  return app;

}


module.exports = getApp;
