var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
	console.log('from get root');
	res.sendFile(path.join(__dirname,'../client','/client.html'));
});

app.post('/', function (req, res) {
	var room = req.body.room;
	var ID = req.body.ID;
	console.log('room, ',room,' ID ',ID);
});


var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('listenting at ',host,': ',port);
});