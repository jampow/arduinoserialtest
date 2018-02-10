const SerialPort = require('serialport');
const port = new SerialPort('/dev/cu.usbmodemfd1341', {
	baudRate: 9600,
	parser: new SerialPort.parsers.Readline('\n')
});

port.on('open', onOpen);

function onOpen() {
	console.log('serial port opened');
}

module.exports = function(data) {
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
