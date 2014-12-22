
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { user: req.user, title: 'Web Commons' });
};

exports.login = function(req, res) {
    res.render('login', { user: req.user, title: 'Web Commons' });
}

exports.signup = function(req, res) {
    res.render('signup', { user: req.user, title: 'SignUp'});
}

exports.profile = function(req, res) {
    res.render('profile', { user: req.user, title: 'Web Commons' });
}

exports.dashboard = function(req, res) {
    res.render('dashboard', { user: req.user, title: 'Dashboard' });
}

exports.reset_password = function(req, res) {
    res.render('reset', { user: req.user });
}

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
}
