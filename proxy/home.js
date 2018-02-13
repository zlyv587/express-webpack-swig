var host = require('../config/index').host;
var hostParentUrl = require('../config/index').hostParentUrl;
var request = require('./request');

exports.getChannelData = function (params, page=1) {
    console.log('hostParentUrl', hostParentUrl)
    console.log(host, 'host=======================');
    // return request.get(host.cms + '/indexChannel/' + params.id);
    return request.get(`${host.cms}/indexChannel/${params.id}?page=${page}`);
};