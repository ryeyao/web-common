/**
 * @file 02_passport.js
 * @brief 
 * @author Rye Yao
 * @version 0.1
 * @date 2013-09-11
 */

var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var crypto = require('crypto');

module.exports = function(app, done) {

    if (typeof app.user_model === 'undefined') {
        done('Failed to initialize Passport', 'No User Model Defined.')
        return;

    }
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {

        app.user_model.sync();
        app.user_model.get(id, function(err, user) {
            if (err) {
                done(err);
            } else {
                done(err, user);
            }
        })
    });

    passport.use(new LocalStrategy({usernameField:'email', passwordField:'pass'},
        function(email, password, done) {
            app.user_model.sync();
            app.user_model.find({email:email}, function(err, user) {
                if (err || !user.length) {
                    done(err, 'User not found.');
                } else {
                    if (user.length) {
                        validatePassword(password, user[0].pass, function(err, res) {
                            if (res){
                                done(err, user[0]);
                            } else {
                                done(err, user[0]);
                            }
                        });
                    }
                }
            })
        }
    ));

    app.use(passport.initialize());
    app.use(passport.session());

    app.passport = passport;
    done(null, 'Passport initialized successfully.');

}

var md5 = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

var validatePassword = function(plainPass, hashedPass, callback)
{
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + md5(plainPass + salt);
    callback(null, hashedPass === validHash);
}