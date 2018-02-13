exports.showLogin = function(req, res) {
    res.render('login', {
        title: '登录',
    })
}

exports.showSignup = function(req, res) {
    res.render('sigup', {
        title: '注册',
    })
}