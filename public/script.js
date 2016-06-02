var socket = io();
var $log = $('.bot #log');
var $countDown = $('.mid #countDown');
var count = 1;

$alertBtn = $('.mid #alert-btn');
$alertBtn.click(function() {
	socket.emit('click');
});

socket.on('startCount', function() {
	$log.append($('<li id = ' + count + '>').text('' + count + '. Pomodoro'));
	runClockPomo();
});

socket.on('break', function(){
	$log.append($('<li id = ' + count + '>').text('' + count + '. Break'));
	runClockBreak();
});

socket.on('updateCount', function() {
	$log.append($('<li id = ' + count + '>').text('' + count + '. Pomodoro'));
	runClockPomo();
});

function runClockPomo() {
	var min = 0,
	    sec = 2;
	var clock = setInterval(fcount, 1000);
	function fcount() {
		if (min == 0 && sec == 0) {
			clearInterval(clock);
			socket.emit('fin');
			return 0;
		}
		if (sec == 0) {
			min--;
			sec--;
			sec = sec + 60;
		} else {
			sec--;
		}
		document.getElementById("countDown").innerHTML = min + ":" + sec;
	}
}

function runClockBreak() {
	if (count % 4 == 0) {
		var bmin = 0,
		    bsec = 4;
	} else {
		var bmin = 0,
		    bsec = 3;
	}

	var clock = setInterval(fcount, 1000);
	function fcount() {
		if (bmin == 0 && bsec == 0) {
			clearInterval(clock);
			count++;
			socket.emit('update');
			return 0;
		}
		if (bsec == 0) {
			bmin--;
			bsec--;
			bsec = bsec + 60;
		} else {
			bsec--;
		}
		document.getElementById("countDown").innerHTML = bmin + ":" + bsec;
	}
}
