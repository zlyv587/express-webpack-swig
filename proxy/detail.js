/**
 * Created by asus on 2017/11/22.
 */
var request = require('./request');
var host = require('../config/index').host;

exports.getDetail = function (params) {
    // return axios.get('http://10.103.60.151:8380/ftl/pc/detail/1378.shtml');
    return request.get(host.cms + '/detail/name/' + params.id + '.shtml');
};