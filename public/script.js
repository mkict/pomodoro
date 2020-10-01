var socket = io();
var $log = $('.bot #log');
var $countDown = $('.mid #countDown');
var count = 1;
const TIME_ONE_SECOND = 1000;

$alertBtn = $('.mid #alert-btn');
$alertBtn.click(function() {
	socket.emit('click');
});

socket.on('startCount', function() {
	logAppendToList(count, 'Pomodoro');
	runClockPomo();
});

socket.on('break', function(){
	logAppendToList(count, 'Break');
	runClockBreak();
});

socket.on('updateCount', function() {
	logAppendToList(count, 'Pomodoro');
	runClockPomo();
});

function logAppendToList (count, text) {
	$log.append($(`<li id=${count}'>`).text(`${count}. ${text}`));
}

function runClockPomo() {
	let min = 0, sec = 2;
	var clock = setInterval(fcount, TIME_ONE_SECOND);
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
		document.getElementById("countDown").innerHTML = `${min}:${sec}`;
	}
}

function runClockBreak() {
	let bmin = 0;
	let bsec = count % 4 == 0 ? 4 : 3;

	var clock = setInterval(fcount, TIME_ONE_SECOND);
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
		document.getElementById("countDown").innerHTML = `${bmin}:${bsec}`;
	}
}
