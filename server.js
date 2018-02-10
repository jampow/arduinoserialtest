const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const serialSend = require('./serial.js');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', function(socket){
	console.log('connected');

	socket.on('redled', function(val){
		console.log(val);
		serialSend(val.toString());
	})
})

http.listen(3000, function() {
	console.log('listening on: 3000');
});