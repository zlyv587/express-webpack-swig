/**
 * Created by WangJie on 2017/11/30.
 */
const personalVip = require('../proxy/personal-member');

// 个人中心
exports.getPerMember = async function (req, res, next) {
    const productsobj = {
        continuousMonth: '',
        oneMonth: '',
        threeMonth: '',
        halfYear: '',
        oneYear: ''
    };
    res.locals.vipInfo.vipProducts.forEach((item, index) => {
        switch (item.billingType) {
            /* 连续包月 */
            case 'AGA':
                productsobj.continuousMonth = item.strPrice;
                break;
            /* 按月 */
            case 'AGB':
                productsobj.oneMonth = item.strPrice;
                break;
            /* 连续包月 */
            case 'AGC':
                productsobj.threeMonth = item.strPrice;
                break;
            /* 半年 */
            case 'AGD':
                productsobj.halfYear = item.strPrice;
                break;
            /* 一年 */
            case 'AGE':
                productsobj.oneYear = item.strPrice;
                break;
        }
    });
    res.locals.vipInfo.productsobj = productsobj;
    /* 获取cookie中的信息 */
    const lenovoUserId = req.cookies.lenovoId;
    const bssToken = req.cookies.bssToken;
    const paramsObj = {
        // lenovoUserId,
        // bssToken
        lenovoUserId: 10108364374,
        bssToken: '4bVVY-d_rVUU-AFeAVymNuTWWhgMGZV1shbuP5fAgtRt10rQ9wOkwigP_HethaGh'
    };
    // 暂注释
    const resData = await personalVip.buyRecord(paramsObj).catch(err => {
        res.status(500);
        return next(err);
    });
    
    /* 当前时间的时间戳的时间戳 */
    renderPage(req, res, resData);

};

function renderPage(req, res, data) {
    res.render('./personal-member/personal-member.jade', {
        title: 'VIP会员',
        currentRoute: 1,
        buylist: data.list
    });
}


