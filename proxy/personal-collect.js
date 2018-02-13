/**
 * Created by asus on 2017/11/30.
 */
const request = require('./request');
const host = require('../config/index').host;
exports.getPersonalCollectDev = function (params) {
    console.log(params, 'params');
    const url = `${host.userCenter}/getFavorite`;
    return request.get(url, params);
};
exports.getPersonalCollect = function (params) {
    return [
        {
            nameCn: '电影一',
            brief: '简介简介简介简介简介简介简介简介简介简介简介',
            id: 1,
            cpId: 2,
            clickUrl: 3,
            favoriteTime: '2017-12-20'
        },
        {
            nameCn: '电影二',
            brief: '简介简介简介简介简介简介简介简介简介简介简介',
            id: 1,
            cpId: 2,
            clickUrl: 3,
            favoriteTime: '2017-12-20'
        },
        {
            nameCn: '电影三',
            brief: '简介简介简介简介简介简介简介简介简介简介简介',
            id: 1,
            cpId: 2,
            clickUrl: 3,
            favoriteTime: '2017-12-20'
        },
        {
            nameCn: '电影一',
            brief: '简介简介简介简介简介简介简介简介简介简介简介',
            id: 1,
            cpId: 2,
            clickUrl: 3,
            favoriteTime: '2017-12-20'
        },
        {
            nameCn: '电影二',
            brief: '简介简介简介简介简介简介简介简介简介简介简介',
            id: 1,
            cpId: 2,
            clickUrl: 3,
            favoriteTime: '2017-12-20'
        },
        {
            nameCn: '电影三',
            brief: '简介简介简介简介简介简介简介简介简介简介简介',
            id: 1,
            cpId: 2,
            clickUrl: 3,
            favoriteTime: '2017-12-20'
        },
        {
            nameCn: '电影一',
            brief: '简介简介简介简介简介简介简介简介简介简介简介',
            id: 1,
            cpId: 2,
            clickUrl: 3,
            favoriteTime: '2017-12-20'
        },
        {
            nameCn: '电影二',
            brief: '简介简介简介简介简介简介简介简介简介简介简介',
            id: 1,
            cpId: 2,
            clickUrl: 3,
            favoriteTime: '2017-12-20'
        },
        {
            nameCn: '电影三',
            brief: '简介简介简介简介简介简介简介简介简介简介简介',
            id: 1,
            cpId: 2,
            clickUrl: 3,
            favoriteTime: '2017-12-20'
        }
    ];
    // return axios.get(host.cms + ':8180/ftl/pc/detail/' + params.id + '.shtml');
};