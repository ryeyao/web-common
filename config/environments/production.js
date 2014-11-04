var express = require('express');

module.exports = function(app) {
    app.mongodb = {
        host  : "localhost",
        database: "prod_vpipes",
        dbstring: "mongodb://localhost/prod_vpipes"
    };

    app.coocieSecret = 'visual pipes';
}
