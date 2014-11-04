var express = require('express');
var path = require('path');
var jade = require('jade');

module.exports = function(app) {

    app.set('port', process.env.PORT || 3000);

    // Configure application settings.  Consult the Express API Reference for a
    // list of the available [settings](http://expressjs.com/api.html#app-settings).
    app.set('views', app.__dirname + '/views');
    app.engine('.jade', jade.__express);
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.multipart());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());

    app.use(require('stylus').middleware(app.__dirname + '/public'));
    app.use(express.static(path.join(app.__dirname, 'public')));

    if (app.customer_config) {
        app.customer_config(app);
    }

}
