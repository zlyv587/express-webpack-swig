const host = require('../config/index').host;
const request = require('./request');

exports.getPlayRecord = function (params) {
    return [
        {
            name: '今天',
            list: [
                {
                    name: '电影一',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                },
                {
                    name: '电影二',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                },
                {
                    name: '电影三',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                }
            ]
        },
        {
            name: '昨天',
            list: [
                {
                    name: '电影一',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                },
                {
                    name: '电影二',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                },
                {
                    name: '电影三',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                }
            ]
        },
        {
            name: '一周之前',
            list: [
                {
                    name: '电影一',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                },
                {
                    name: '电影二',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                },
                {
                    name: '电影三',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                },
                {
                    name: '电影一',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                },
                {
                    name: '电影二',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                },
                {
                    name: '电影三',
                    brief: '简介简介简介简介简介简介简介简介简介简介简介'
                }
            ]
        }
    ];
    // return request.get(host.cms + 'some url');
};
exports.getPlayRecordDev = function (params) {
    console.log(params, 'params');
    const url = `${host.userCenter}/userRecordList`;
    return request.get(url, params);
};