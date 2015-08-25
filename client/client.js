navigator.mozGetUserMedia({ video: true, audio: false }, function (stream) {
	var querystring = require('querystring');
	var http = require('http');
	var Peer = require('simple-peer');

	var peer = new Peer({
		initiator: location.hash === '#init',
		trickle: false,
		stream: stream
	});

	peer.on('signal', function (data) {
		peerID = data;
	});

	document.getElementById('connect').addEventListener('click', function () {
		console.log('HEY THERE');
		var roomName = document.getElementById('room').value;

		var data = querystring.stringify({
			room: roomName,
			ID: peerID
		});

		var options = {
			host: 'localhost',
			path: '/',
			port: '3000',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(data)
			}
		};

		var req = http.request(options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				console.log("body: " + chunk);
			});
		});

		req.write(data);
		req.end();

	});

	peer.on('stream', function (stream) {
		var video = document.createElement('video')
		document.body.appendChild(video)
		video.src = window.URL.createObjectURL(stream)
		video.play()
	});
}, function (err) {
	console.error(err)
});