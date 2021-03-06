var navBody = document.querySelector(".slide_body").classList.add("show");

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log("User signed out.");
	});
	var profRequest = new Request(`https://roddyd.net/profile?info=4`);
	fetch(profRequest).then(async (res) => {
		var msg = await res.text();
		if (msg) console.log(msg);
	});
}

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	var profRequest = new Request(
		`https://roddyd.net/profile?email=${profile.getEmail()}&info=1`
	);
	fetch(profRequest).then(async (res) => {
		var url = await res.text();
		if (url) location.href = url;
	});
}

var taskButton = document.querySelector("#task-button");
var scheduleButton = document.querySelector("#schedule-button");
var calendarButton = document.querySelector("#calendar-button");
var clockButton = document.querySelector("#clock-button");
if (taskButton)
	taskButton.onclick = () => {
		location.href = "/task";
	};
if (scheduleButton)
	scheduleButton.onclick = () => {
		location.href = "/schedule";
	};
if (calendarButton)
	calendarButton.onclick = () => {
		location.href = "/calendar";
	};
if (clockButton)
	clockButton.onclick = () => {
		location.href = "/";
	};
