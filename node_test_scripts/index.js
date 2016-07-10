var NodeWebcam = require('node-webcam')
var five = require('johnny-five');
var Raspi = require('raspi-io');

var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
	var button = new five.Button({
		pin: 'P1-11',
		isPullup: true
	});
 	var led = new five.Led('P1-13');

 	button.on('up', function() {
 		console.log('button triggered (up)');
 	});

 	button.on('down', function() {
		console.log('button triggered (down)');
		led.blink();
		/*
		takePicture(function() {
			led.stop();
		});
		*/
	});
});

function takePicture (cb) {
	var MAX_CAMERA_WIDTH = 2592
	var MAX_CAMERA_HEIGHT = 1944

	var opts = {
	   width: MAX_CAMERA_WIDTH / 4,
	   height: MAX_CAMERA_HEIGHT / 4,
	   delay: 0,
	   quality: 100,
	   output: 'jpeg',
	   verbose: true
	}

	var webcam = NodeWebcam.create(opts);
	webcam.capture(__dirname + '/test_picture', cb);
}
