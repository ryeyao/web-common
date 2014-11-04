/**
 * Created with JetBrains WebStorm.
 * Author: rye
 * Date: 9/12/13
 * Time: 11:02 AM
 */

var fs = require('fs');
var async = require('async');
var path = require('path');



module.exports = function(app) {

    configDir = app.__dirname + '/config/';
    initializersDir = configDir + '/initializers/';
    environmentsDir = configDir + '/environments/';

    app.configure(function() {

        set_environments(app);
        set_initializers(app);
        set_router(app);

    })
}

function set_environments(app) {

    var environments = {};
    environments.all = require(environmentsDir + 'all');
    environments.development = require(environmentsDir + 'development');
    environments.production = require(environmentsDir + 'production');

    // Set all.js
    if (app.get('env') == 'production') {
        app.customer_config = environments.production;
    } else {
        app.customer_config = environments.development;
    }
    environments.all(app);
}

function set_initializers(app) {

    var dir = initializersDir;
    var files = fs.readdirSync(dir).sort();

    async.forEachSeries(files, function(file, next) {
        require(path.join(dir, file))(app, function(err, msg) {
            console.log('Initializating ' + file.replace('.js', '') + '...');
            if (err) {
                console.log('Error:' + err + ' ' + msg);
                app.exit();
            } else {
                if (msg) {
                    console.log('INFO: ' + msg);
                }
                next();
            }
        })
    })
}

function set_router(app) {
    app.use(app.router);
    router = require(app.__dirname + '/routes/router');
    router(app);
}

