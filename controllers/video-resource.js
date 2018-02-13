/**
 * Created by xiaojiang on 2017/11/22.
 */
const VideoResource = require('../proxy/index').VideoResource;

exports.showVideoResource = async function (req, res, next) {
    /* 定义六个筛选变量 */
    const category1 = '', // 频道
        freeOrNot = null,
        areaId = null,
        category2 = null, // 类型
        Year = null,
        orderType = null; //按热度或更新时间
    /*
     * 1.分类搜索条件接口（频道，地区，年代，类型…）
     * http://10.103.60.151:8380/ftl/search/searchTypeList.shtml
     *2.分类搜索接口
     * http://10.103.60.151:8380/ftl//search/albumList/?category1=104&freeOrNot=0&areaId=5919&category2=5891&year=20&orderType=update_time
     * */
    // 首先请求分类数据 不需要参数
    const ResourceTypeData = await VideoResource.getTypeList().catch(err => {
        res.status(500);
        return next(err);
    });

    /* 定义需要显示的筛选类型 */
    const filterArray = ['DAB', 'DAC', 'DAA', 'DAE']; // 后端可能会返回很多类别，但暂时前端只显示这几个
    let isInit = false;
    /* 查询字段映射表 */
    const queryMap = {
        "频道": 'category1',
        "地区": 'DAB',
        "年份": 'DAC',
        "类型": 'DAA',
        "资费": 'DAE'
    };
    let typeData = ResourceTypeData.datas;
    console.log(typeData, 'typeData====================');
    /* 需要判断没有query的情况 默认添加大类中的第一个 */
    const queryObj = req.query;
    if (JSON.stringify(queryObj) === '{}') {
        queryObj.category1 = typeData[0].category1.toString();
    }
    const queryKey = Object.keys(queryObj);
    if (!queryKey.includes('category1')) {
        queryObj.category1 = typeData[0].category1.toString();
    } else {
        isInit = true;
    }
    /* 分页处理 */
    queryObj.pageSize = 18;
    if (!queryObj.pageNum) {
        queryObj.pageNum = 1;
    }
    const paramsValueArr = [];
    for (const item in queryObj) {
        if (queryObj.hasOwnProperty(item) && item != 'pageNum') {
            // 排序的字段值是字母 不统一
            // const id = parseInt(queryObj[item]);
            const id = queryObj[item];
            paramsValueArr.push(id);
        }
    }
    console.log(queryObj, '=============queryObj============');
    if (queryObj.hasOwnProperty('DAE') && queryObj.DAE == 0) {
        paramsValueArr.push('001');
    }
    console.log(paramsValueArr, '===============paramsValueArr================');
    const subTypeData = typeData.filter(item => paramsValueArr.includes(item.category1.toString()))[0];

    const videoDataResource = await VideoResource.filterVideoList(queryObj).catch(err => {
        next(err)
    });
    const pageTotal = videoDataResource.totalCount;
    const testpass = 'aha';
    const videoData = videoDataResource.datas;
    const testVideoData = videoData.slice(0, 2);
    res.render('./resource/resource.jade', {
        typeData,
        subTypeData,
        title: '片库',
        test: 100,
        queryObj,
        queryMap,
        filterArray,
        paramsValueArr,
        videoData,
        testpass,
        pageTotal
    });
};
/* 获取类型数据 */
function getTypeList() {
    const testUrl = 'http://localhost:3000/test';
    const url = config.cmsHost+'/ftl/search/searchTypeList.shtml';
    return axios.get(url);
}
/* 获取筛选条件的视频列表 */
function filterVideoList(params) {
    const url = `${config.cmsHost}/ftl/search/albumList/`;
    return axios.get(url, {params});
}