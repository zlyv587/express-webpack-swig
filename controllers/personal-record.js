/**
 * Created by WangJie on 2017/11/30.
 */
const PersonRecord = require('../proxy/personal-record');
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
exports.getPerRecord = async function (req, res, next) {
    console.log('个人中心的代码掉滴哦啊的++++++++++============')
    /* 获取cookie中的信息 */
    const lenovoUserId = req.cookies.lenovoId;
    const bssToken = req.cookies.bssToken;
    let queryStr = '';
    const paramsObj = {
        platform: 1,
        cpId: 110,
        lenovoUserId,
        bssToken
        // lenovoUserId: '10108364374',
        // bssToken: '4bVVY-d_rVUU-AFeAVymNuTWWhgMGZV1shbuP5fAgtRt10rQ9wOkwigP_HethaGh'
    };
    // 暂注释
    const resData = await PersonRecord.getPlayRecordDev(paramsObj).catch(err => {
        res.status(500);
        return next(err);
    });
    /* 当前时间的时间戳的时间戳 */
    const currentTime = Date.parse(new Date());
    const oneDayTime = 24 * 60 * 60 * 1000;
    /* 格式化播放记录数据模板 */
    const formatRecordData = [
        {name: "今天", list: []},
        {name: "昨天", list: []},
        {name: "一周之内", list: []},
        {name: "更早", list: []},
    ];
    const hasRecordArr = [];
    resData.list.forEach((item, index) => {
        hasRecordArr.push(item.list);
        item.updateTime = dealTime(item.updateTime);
        /* 今天 */
        if (currentTime - item.updateTime2 < oneDayTime) {
            formatRecordData[0].list.push(item);
        }
        /* 昨天 */
        if (oneDayTime < currentTime - item.updateTime2 && currentTime - item.updateTime2 < 2 * oneDayTime) {
            formatRecordData[1].list.push(item);
        }
        /* 一周内 */
        if (2 * oneDayTime < currentTime - item.updateTime2 && currentTime - item.updateTime2 < 7 * oneDayTime) {
            formatRecordData[2].list.push(item);
        }
        /* 更早 */
        if (7 * oneDayTime < currentTime - item.updateTime2) {
            formatRecordData[3].list.push(item);
        }
    });
    const len = resData.list.length;
    renderPage(req, res, formatRecordData, len);
    // personal.getPersonal({id: 0})
    //     .then(function (response) {
    //         renderPage(req, res, response);
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //         renderPage(req, res, response);
    //     });

};


function renderPage(req, res, data, len) {
    res.render('./personal-record/personal-record.jade', {
        title: '播放记录',
        currentRoute: 0,
        len,
        playRecordData: data
    });
}


