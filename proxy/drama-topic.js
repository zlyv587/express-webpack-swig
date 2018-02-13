/**
 * Created by asus on 2017/11/22.
 */
var request = require('./request');
var host = require('../config/index').host;

exports.getVideoList = function (params) {
    var moduleId = params.moduleId ? params.moduleId : '';
    var columnId = params.columnId ? params.columnId : '';
    var pageNo = params.pageNo ? params.pageNo : '1';
    return request.fetch(host.cms + '/itemModule/' + moduleId + '/' + columnId);
};