/**
 * Created with JetBrains WebStorm.
 * Author: rye
 * Date: 9/12/13
 * Time: 10:34 AM
 */

var pages = require('./pages');
var forms = require('./forms');
var user = require('./user');

module.exports = function(app) {

    passport = app.passport;

    auto_auth = passport.authenticate('local', {usernameField:'email', passwordField:'pass', failureRedirect: '#', successRedirect: '/'});
    function check_auth(req, res, next) {

        if (req.isAuthenticated()) {
            if (req.path == '/attendence') {
                if (req.user.authority == 'admin') {
                    return next();
                } else {
                    res.redirect('/');
                }
            }
            return next();
        }
        res.redirect('/');
    }

//    app.get('/', pages.index);
    app.get('/', pages.attendence);

    app.get('/login', pages.login);
    app.post('/login', auto_auth, forms.login);
    app.get('/signout', pages.signout);

    app.get('/signup', pages.signup);
    app.post('/signup', forms.signup);

    app.get('/reset-password', check_auth, pages.reset_password);
    app.get('/profile', check_auth, pages.profile);
    app.post('/update-account', check_auth, forms.update_account);

    app.get('/users', check_auth, user.list);
    app.get('/dashboard', check_auth, pages.dashboard);

    app.post('/upload-file', forms.upload_file);
    app.post('/send-email', forms.send_email);

    app.get('*', function(req, res, next) {
        res.render('404', {});
    })

}
