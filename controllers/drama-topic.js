/**
 * Created by asus on 2017/11/15.
 */
const dramaTopic = require('../proxy/drama-topic');

exports.renderPage = function (req, res) {
    dramaTopic.getVideoList(req.query).then(function (data) {
            console.log('==data:', data)
        renderPage(req, res, data);
    })
        .catch(function (err) {
            renderPage(req, res);
        });
    function renderPage(req, res, data) {

        res.render('./drama-topic/drama-topic.jade', {
            data: data,
            moduleId: req.query.moduleId
        });
    }
};
