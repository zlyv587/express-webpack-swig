/**
 * Created by asus on 2017/11/30.
 */
const request = require('./request');
const host = require('../config/index').host;

// exports.getPersonalMember = function (params) {
//     return axios.get(host.cms + '/ftl/pc/detail/' + params.id + '.shtml');
// };
exports.getPersonalMember = function (params) {
    console.log(params, 'params=============');
    const url = `${host.userCenter}/getUsrVip`;
    return request.get(url, params);
};
exports.buyRecord = function (params) {
    console.log(params, 'params=============');
    const url = `${host.userCenter}/getPayOrder`;
    return request.get(url, params);
};