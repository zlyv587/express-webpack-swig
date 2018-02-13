require('colors');
var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var swig = require('swig');
var proxyMiddleware = require('http-proxy-middleware');


function getApp() {
  var app = express();

// view engine setup
  app.set('views', path.join(__dirname, 'dist/view/page'));
  app.use(express.static(path.join(__dirname, './dist')));
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  swig.setDefaults({ cache: false });
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
  require('./routes/web_routers')(app);
// app.use('', web_routers);

  return app;

}


module.exports = getApp;
