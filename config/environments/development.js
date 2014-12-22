/**
 * @file development.js
 * @brief 
 * @author Rye Yao
 * @version 0.1
 * @date 2013-09-11
 */

var express = require('express');
module.exports = function(app) {

    console.log('Initializing development environment...');
    app.mongodb = {
        host  : "localhost",
        database: "mydb",
        dbstring: "mongodb://localhost/mydb"
    };

    app.coocieSecret = 'Your Secret';

    app.use(express.errorHandler());
    app.simplesmtp = {
        SMTPBanner: 'Welcome to SMTP',
        name: 'SMTP',
        port: 9876
    }
}
