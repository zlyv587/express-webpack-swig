/**
 * Created by asus on 2017/11/30.
 */
var axios = require('axios');
var host = require('../config/index').host;

exports.getPersonal = function (params) {
    return axios.get(host.cms + '/pc/detail/' + params.id + '.shtml');
};