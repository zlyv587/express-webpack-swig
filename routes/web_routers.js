var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = function (app, compiler) {
  // pre handle user

  // 获取登录信息
  // todo 这里有两种写法：
  // 一种是像下面这样写，优点 简洁，缺点 至少在 404 的时候不需要这个
  // 一种是在每个路由前面添加，优点 只在需要的地方使用， 缺点 代码冗余
  // 首页

  app.get('/', function (req, res, next) {
    renderTemplate(res, next, 'home');
  });
  // 频道首页
  app.get('/details', function (req, res, next) {
    renderTemplate(res, next, 'detail')
  });
  function renderTemplate(res, next, template) {
    if (process.env.NODE_ENV == 'dev') {
      var templateOutPath = compiler.outputPath + '/view/page/'
      let filename = templateOutPath + template + '.html';
      compiler.outputFileSystem.readFile(filename, function (err, result) {
        let fileInfo = path.parse(path.join(filename));
        mkdirp(fileInfo.dir, () => {
          fs.writeFileSync(path.join(filename), result);
          res.render(template, {title: 33333});
        });
      });
    } else {
      res.render(template, {title:5555});
    }
  }
};
