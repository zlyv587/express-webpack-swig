const Home = require('../proxy/index').Home;
// 加载数据上报配置文件
var path = require('path');

// 引入jade模板引擎
var jade = require('jade');
const compiledFunction = jade.compileFile(path.join(__dirname, '../src/views/pages/home/ajax_home.jade'));
console.log(compiledFunction, '======================compiledFunction==========================');
// 首页
exports.index = function (req, res, next) {
    // 加个判断是否为Ajax
    if (req.query.page) {
        console.log('进入首页ajax请求==============');
        Home.getChannelData({id: 0}, req.query.page)
            .then(function (response) {
                const pageData = renderPageData(req, response, true).pageData;
                const ajaxHtml = compiledFunction({modulesData: pageData.modules});
                // res.set('Content-Type', 'text/html');
                // res.send(new Buffer(ajaxHtml));
                res.send(ajaxHtml);
            })
            .catch(function (err) {
                next(err)
            });
    } else {
        console.log(req.url, 'req.url================');
        Home.getChannelData({id: 0})
            .then(function (response) {
                renderPage(req, res, renderPageData(req, response, true));
            })
            .catch(function (err) {
                next(err)
            });
    }

};

// 频道首页
exports.channelIndex = function (req, res) {
    // 加个判断是否为Ajax
    if (req.query.page) {
        console.log('进入频道ajax请求==============');
        Home.getChannelData(req.params, req.query.page)
            .then(function (response) {
                const pageData = renderPageData(req, response, true).pageData;
                const ajaxHtml = compiledFunction({modulesData: pageData.modules});
                res.send(ajaxHtml);
            })
            .catch(function (err) {
                next(err)
            });
    } else {
        Home.getChannelData(req.params)
            .then(function (response) {
                renderPage(req, res, renderPageData(req, response, false));
            })
            .catch(function (err) {
                next(err)
            });
    }

};

// 生成页面数据
function renderPageData(req, response, isHome) {
    var data = {};
    var responseData = response;

    // 判断是首页，还是频道页
    data.isHome = isHome;
    data.channelId = req.params.id;

    // 根据当前 id 筛选数据
    data.pageData = responseData.channels.filter(function (item) {
        return item && item.id === responseData.channelId;
    })[0];
    return data;
}

function renderPage(req, res, data) {
    res.render('home.html', {
        channelId: data.channelId,
        // reportData: data.reportData,
        title: data.pageData.channelName,
        pageData: data.pageData,
        pageTotal: data.pageData.totalPages,
        bannerData: data.pageData.modules[0].elements,
        pageNavData:  data.pageData.modules[1].navigation,
        modulesData: data.pageData.modules.slice(2),
        isHome: data.isHome,
        // testPartRender: compiledFunction({modulesData: data.pageData.modules.slice(2)})
    });
}

