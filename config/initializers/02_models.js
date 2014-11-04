/**
 * @file 03_models.js
 * @brief 
 * @author Rye Yao
 * @version 0.1
 * @date 2013-09-11
 */

var orm = require('orm');

module.exports = function(app, done) {

    enforce = orm.enforce;

//    app.use(orm.express(app.mongodb.dbstring, {
//        define: function(db, models) {
//            models.user = db.define("user", {
//            	name	: String,
//            	email	: String,
//            	pass    : String,
//            	date    : Date,
//                authority   : String
//            }, {
//            	validations : {
//            		name     : [ enforce.required('Name cannot be null'), enforce.ranges.length(3, 14, 'missing')],
//            		email    : [ enforce.unique('Email already taken!'), enforce.unique({ ignoreCase : true }), enforce.patterns.email('Invalid e-mail')],
//            		pass     : [ enforce.required('Password cannot be null')]
//            	}
//            });
//            app.user_model = models.user;
//        }
//    }));

    done(null, null);
}
