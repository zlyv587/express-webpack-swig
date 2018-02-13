var host = require('../config/index').host;
var request = require('./request');

exports.getTypeList = function () {
    const testUrl = 'http://localhost:3000/test';
    const url = host.search + '/search/searchTypeList.shtml';
    return request.get(url);
};

exports.filterVideoList = function (params) {
    console.log(params, 'params');
    const url = `${host.search}/search/albumList/`;
    return request.get(url, params);
};