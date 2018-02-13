/**
 * Created by WangJie on 2017/11/15.
 */
const Detail = require('../proxy/detail');

const PersonCollect = require('../proxy/index').PersonCollect;

// index page
// exports.details = function (req, res) {
//     res.render('video-details', {
//         title: '主页',
//         demoStr: '55',
//         lis: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
//         items: ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60'],
//         plots : [
//             {
//                 title: '第1集',
//                 content:'单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍。'
//             },
//             {
//                 title: '第2集',
//                 content:'单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍。'
//             },
//             {
//                 title: '第3集',
//                 content:'单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍。'
//             },
//             {
//                 title: '第4集',
//                 content:'单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍。'
//             },
//             {
//                 title: '第5集',
//                 content:'单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍。'
//             },
//             {
//                 title: '第6集',
//                 content:'单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍单集介绍。'
//             }
//         ],
//         abstract:'改编自橘花散里小说《将军在上我在下》，原著位居2011年晋江网原创点击榜首。作品以宋朝的风云变幻为背景，讲述了一个武艺超群的冷面女将军与倾国倾城的纨绔俏王爷...',
//         abstract2:'改编自橘花散里小说《将军在上我在下》，原著位居2011年晋江网原创点击榜首。作品以宋朝的风云变幻为背景，讲述了一个武艺超群的冷面女将军与倾国倾城的纨绔俏王爷..改编自橘花散里小说《将军在上我在下》，原著位居2011年晋江网原创点击榜首。作品以宋朝的风云变幻为背景，讲述了一个武艺超群的冷面女将军与倾国倾城的纨绔俏王爷'
//     });
// };

//
// exports.details = function (req, res) {
//      renderPage(req, res, data1127);
// };


exports.details = async function (req, res, next) {
    // console.log(11111111);
    // console.log('params',req.params);

    let isCollect = 0;
    if (res.locals.isLogin) {
        const lenovoUserId = req.cookies.lenoveId;
        const bssToken = req.cookies.bssToken;
        const conAlbumId = req.params.id;
        const paramsObj = {
            platform: 1,
            cpId: 110,
            conAlbumId,
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
        if (resData.list.length !== 0) {
            isCollect = 1;
        }
    }

    Detail.getDetail(req.params)
        // Detail.getDetail({id:5811})
        .then(function (response) {
            renderPage(req, res, response, isCollect);
        })
        .catch(function (err) {
            next(err);
            // renderPage(req, res);
        });
};

function deepCopy(target, source) {
    if (!source || typeof source !== 'object') {
        return;
    }
    // 这个方法有点小trick，target一定得事先定义好，不然就不能改变实参了。
    // 具体原因解释可以看参考资料中 JS是值传递还是引用传递
    if (!target || typeof source !== 'object') {
        return;
    }
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            if (source[key] && typeof source[key] == 'object') {
                target[key] = deepCopy(target[key], source[key]);
            }
            else {
                target[key] = source[key];
            }
        }
    }
    return target;
}


function calcStorys(L, W) {
    L = L.toString().replace(/[^0-9]/ig, '');
    if (L == null) return [];
    var u = W == 1 ? 10 : 60;
    var arr = [];
    var last = 0;
    var cal = function (L) {
        var l = Math.floor(L / u);
        var W = L % u;
        for (var i = 0; i < l; i++) {
            // 添加分集选项
            last = u * (i + 1);
            var temp = (1 + i * u) + '-' + last;
            arr.push(temp);
        }
        if (W > 0) {
            // console.log(W);
            var finalNum = last + (1 * W);
            // console.log(finalNum);
            var J = (last + 1) + '-' + finalNum;
            arr.push(J);
        }
    };
    cal(L);
    return arr;
}

function count(data) {
    if (data == null) return [];
    var arr = [];
    // var y = Math.ceil(data.length / 10);

    arr = data.slice(0, 10);
    // arr.map(function (n,i) {
    //     n.orderNumber = '第' + n.orderNumber + '集';
    // });
    return arr;
}

function calTotal(k) {
    if (k == null) return;
    k = k > 60 ? 60 : k;
    var w = [];
    for (var i = 1; i < k + 1; i++) {
        w.push(i)
    }
    return w;
}
function renderPage(req, res, data, isCollect) {
    var data = data;
    var dataD = data.data;
    // console.log(dataD, 'nameaaa');
    // console.log(dataD.description, 'description11111111111111111111');
    // console.log(data.guessLike, 'guessLike');
    // console.log(data.conContentBeans, 'conContentBeans');
    // console.log(req.params.id, 'req');
    var numberLis = '';
    if (dataD.upStatusDesc) {
        // 电视剧剧集采用upStatusDesc 来判断，而不用episodes ，目的是为了避免 共23集，当前只更新到20集时不会展现出23集
        numberLis = dataD.upStatusDesc.toString().replace(/[^0-9]/ig, '');
    }

    var lists = calcStorys(dataD.conContentBeans.length || dataD.episodes, 1);
    var summarys = calcStorys(dataD.upStatusDesc || dataD.episodes, 2);
    var contents = count(dataD.conContentBeans);
    var plotsIsNull = true;
    contents.forEach(function (item) {
        if (item.highlight) {
            return plotsIsNull = false;
        }
    });
    var typeNameObj = {
        'ALBUM': '电视剧',
        'PROGRAM': '综艺',
        'MOVIE': '电影'
    };
    res.render('./details/details.jade', {
        isCollect: isCollect,
        detailId: req.params.id,
        searchContent: res.searchContent,
        title: '详情页',
        details: dataD,
        type: typeNameObj[dataD.displayType],
        description: dataD.description ? (dataD.description.length > 88 ? dataD.description.substring(0, 88) + '...' : dataD.description || '暂无数据') : '暂无',
        // description: dataD.description ? (dataD.description.length > 88 ? dataD.description.substring(0, 88) + '...' : dataD.description || '暂无数据') : '暂无',
        descriptionDetail: dataD.description ? dataD.description : '暂无数据',
        showMore: dataD.description ? (dataD.description.length > 88 ? true : false) : false,
        // showMore: false,
        playCountCn: dataD.playCountCn ? dataD.playCountCn : '无',
        score: dataD.score ? dataD.score : '无',
        poster: dataD.poster ? dataD.poster : '暂无数据',
        lis: calTotal(~~numberLis || 40),
        plots: contents,
        plotsIsNull: plotsIsNull,
        upStatusDesc: dataD.upStatusDesc ? dataD.upStatusDesc : '暂无数据',
        // items: ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60'],
        items: lists,
        summarys: summarys,
        recommendation: data.guessLike ? data.guessLike.elements.slice(0, 12) : '暂无数据'
    });
}


