/**
 * Created with JetBrains WebStorm.
 * Author: rye
 * Date: 10/16/13
 * Time: 3:46 PM
 */

var simplesmtp = require('simplesmtp');
var fs = require('fs');

module.exports = function(app, done) {
    var options = app.simplesmtp;
    var smtp = simplesmtp.createServer({secureConnection:true, requireAuthentication:true, SMTPBanner: options.SMTPBanner, name: options.name});

    smtp.listen(options.port, function(err, msg) {
        console.log(err||msg);
    });
    smtp.on('startData', function(connection) {
        console.log('Message from:', connection.from);
        console.log('Message to:', connection.to);
        connection.parser = new (require('mailparser').MailParser)({defaultCharset:'utf-8'});
        connection.parser.on('end', function(mail) {
            smtp.removeListener('startData', arguments.callee);
        });
    });
    smtp.on('data', function(connection, chunk) {
        connection.parser.write(chunk);
    });

    smtp.on('dataReady', function(connection, callback) {
        console.log('Incoming message.');
        connection.parser.end();
        callback(null, 'ABC1');
    });

    smtp.on('authorizeUser', function(envelope, username, password, callback) {
        smtp.removeListener('authorizeUser', arguments.callee);
        console.log('Authorizing...');
        callback(null, username == 'pooh' && password == 'honey');
    });

    this.end = function() {
        smtp.end();
    }

    done(null, 'SimpleSMTP server is listening on port ' + options.port);
}