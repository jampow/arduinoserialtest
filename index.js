const SerialPort = require('serialport');
const port = new SerialPort('/dev/cu.usbmodemfd1341', {
	baudRate: 9600,
	parser: new SerialPort.parsers.Readline('\n')
});


port.on('open', onOpen);
port.on('data', onData);

function onOpen() {
	console.log('serial port opened');
}

function onData(data) {
	console.log(data.toString());
}

function sendData(data) {
	const len = data.length;
	for(let i = 0; i < len; i++) {
		port.write(new Buffer(data[i], 'ascii'), function(err, results) {
			if(err) {
				console.log('Error:',err);
				console.log('Results:', results);
			}
		});
	}

	port.write(new Buffer('\n', 'ascii'), function(err, results) {
		if(err) {
			console.log('Error:',err);
			console.log('Finish:', results);
		}
	});

}

setInterval(function(){
	sendData('10');
}, 2000);

