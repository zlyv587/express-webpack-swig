/**
 * Created by WangJie on 2017/11/30.
 */
const PersonCollect = require('../proxy/index').PersonCollect;
function dealTime(timeStr) {
    const YYYY = timeStr.substr(0, 4);
    const MM = timeStr.substr(4, 2);
    const DD = timeStr.substr(6, 2);
    const HH = timeStr.substr(8, 2);
    const mm = timeStr.substr(10, 2);
    const ss = timeStr.substr(12, 2);
    return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
}
// 个人中心
exports.getPerCollect = async function (req, res, next) {
    var data = PersonCollect.getPersonalCollect();
    /* 获取cookie中的信息 */
    const lenovoUserId = req.cookies.lenovoId;
    const bssToken = req.cookies.bssToken;
    let queryStr = '';
    const paramsObj = {
        platform: 1,
        cpId: 110,
        lenovoUserId,
        bssToken,
        // lenovoUserId: '10108364374',
        // bssToken: '4bVVY-d_rVUU-AFeAVymNuTWWhgMGZV1shbuP5fAgtRt10rQ9wOkwigP_HethaGh'
    };
    // 暂注释
    const resData = await PersonCollect.getPersonalCollectDev(paramsObj).catch(err => {
        res.status(500);
        return next(err);
    });
    resData.list.forEach((item, index) => {
        item.favoriteTime = dealTime(item.favoriteTime);
    });
    const renderData = {
        list: resData.list,
    };

    renderPage(req, res, renderData);
    // personal.getPersonal({id: 0})
    //     .then(function (response) {
    //         renderPage(req, res, response);
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //         renderPage(req, res, response);
    //     });
};


function renderPage(req, res, data) {
    res.render('./personal-collect/personal-collect.jade', {
        title: '我的收藏',
        currentRoute: 2,
        collectData: data
    });
}


