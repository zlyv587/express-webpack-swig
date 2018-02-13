/**
 * Created by yuliang on 2017/11/15.
 */
var host = require('../config/index').host;
var request = require('./request');

exports.getSeachList = function (params) {
    params.keyWord = params.keyWord ? params.keyWord : '';
    params.num = params.num ? parseInt(params.num) + 1 : 1;
    params.size = params.size ? params.size : 10;
    console.log(params);
    var url = host.search + '/search/searchByNameLike?nameCn=' + params.keyWord + '&pageNum=' + params.num + '&pageSize=' + params.size;
    return request.fetch(encodeURI(url))
};

// 获取热门搜索
exports.getHotSearch = function () {
    return request.get(host.cms + '/searchTop');
};

