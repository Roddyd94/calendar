function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log("User signed out.");
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
taskButton.onclick = () => {
	location.href = "/task";
};
scheduleButton.onclick = () => {
	location.href = "/schedule";
};
calendarButton.onclick = () => {
	location.href = "/calendar";
};
clockButton.onclick = () => {
	location.href = "/";
};
