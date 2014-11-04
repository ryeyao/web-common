
var crypto  = require('crypto');
var moment  = require('moment');

/* record insertion, update & deletion methods */

exports.new_account = function(user_model, new_user, callback)
{
    user_model.find({email:new_user.email}, function(e, user) {
        if (user.length) {
            callback('email-taken');
        } else {
            user_model.find({name:new_user.name}, function(e, user) {
                if (user.length) {
                    callback('name-taken');
                } else {
                    saltAndHash(new_user.pass, function(hash){
                        new_user.pass = hash;
                        // append date stamp when record was created //
                        new_user.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                        user_model.create(new_user, function(err, items) {
                            callback(err);
                        });
                    });
                }
            });
        }
    });
}

exports.update_account = function(user_model, new_user, callback)
{
    user_model.find({email: new_user.email}, function(err, user) {
        if (user.length) {
            callback('email-taken');
        } else {
            user_model.find({name: new_user.name}, function(err, user) {})
            if (user.length) {
                callback('name-taken');
            } else {

                user[0].name   = new_user.name;
                user[0].email  = new_user.email;

                if (new_user.old_pass == ''){
                    user[0].save()
                } else {
                    validatePassword(new_user.old_pass, user[0].pass, function(err, result){
                        if (err || !result) {
                            callback(err);
                        } else {
                            saltAndHash(new_user.new_pass, function(hash) {
                                user[0].pass = hash;
                                user[0].save();
                            })
                        }
                    });
                }
            }
        }
    });
}

/* account lookup methods */

exports.deleteAccount = function(user_model, id, callback)
{
    user_model.get(id).remove(function(err, items) {
        callback(err);
    });
}

exports.validateResetLink = function(user_model, email, passHash, callback)
{
    user_model.find({ email:email, pass:passHash }, function(e, o){
        callback(o.length ? 'ok' : null);
    });
}

/* private encryption & validation methods */

var generateSalt = function()
{
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

var md5 = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
    var salt = generateSalt();
    callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + md5(plainPass + salt);
    callback(null, hashedPass === validHash);
}
