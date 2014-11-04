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

    passport.serializeUser(function(user, done) {
//        console.log('Serialize User id ' + user._id);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {

//        console.log('De-Serialize User');
        app.user_model.sync();
        app.user_model.get(id, function(err, user) {
//            console.log('err ' + err);
            if (err) {
                done(err);
            } else {
                done(err, user);
            }
        })
    });

    passport.use(new LocalStrategy({usernameField:'email', passwordField:'pass'},
        function(email, password, done) {
            console.log('passport.use ' + email + password);
            console.log('Auth ok, email: ' + email + ' pass ' + password);
            app.user_model.sync();
            app.user_model.find({email:email}, function(err, user) {
                if (err || !user.length) {
                    console.log('No User Found! err ' + err + ' length ' + user.length);
                    done(err);
                } else {
                    if (user.length) {
                        console.log('User ' + user[0] + ' found.');
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
    done(null, null);

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