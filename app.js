
/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

app.__dirname = __dirname;

require(__dirname + '/config/initialize')(app);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
