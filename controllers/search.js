/**
 * Created by yuliang on 2017/11/15.
 */

const Search = require('../proxy/index').Seacrh;

exports.ShowSearchPage = function (req, res, next) {

    Search.getSeachList(req.query).then(function (data) {
        renderPage(data);
    }).catch(function (err) {
        next(err);
    });

    function renderPage(data) {
        res.render('search/search.jade', {
            keyWord: req.query.keyWord,
            data: data,
            pageSearchTextDefault: req.query.keyWord
        });
    }
};