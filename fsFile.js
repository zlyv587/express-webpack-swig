/**
 * Created by Lzhang on 2017/6/26.
 */
var fs = require('fs');
//
//fs.readFile('./index.html', function(err, data) {
//    console.log('异步读取：', data.toString())
//  fs.stat('./index.html', function(err, stats) {
//    console.log('文件信息：',stats);
//    // 检测文件类型
//    console.log('是否为文件(isFile) ? ' + stats.isFile());
//    console.log('是否为目录(isDirectory) ? ' + stats.isDirectory());
//  });
//});
let routes = '';
let componentData = ''
fs.readdir('./src/components', function (err, files) {

  files.forEach(function (file) {
    //
    const component = file.split('.')[0];
    componentData += `import ${component} from '@/components/${file}'\n`;
    routes += `{
      path: '/${component}',
      name: '${component}',
      component: ${component},
    }, `;
  });

  const routeData = `${componentData}export default [${routes}]`;
  fs.writeFile('./src/allRoutes.js', routeData);
});


