/**
 * Created by Lzhang on 2017/12/20.
 */
//
var host = require('../config/index').host;
var request = require('./request');

exports.getUserInfo = function (params) {
    // return axios.get('http://10.103.60.151:8380/ftl/pc/detail/1378.shtml');
    return request.post(host.userCenter + '/synUser.shtml?token='+ params.token);
};