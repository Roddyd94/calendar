function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log("User signed out.");
	});
}

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	var profRequest = new Request(
		`https://roddyd.net/profile?email=${profile.getEmail()}`
	);
	fetch(profRequest).then((response) => {
		console.log(response.text());
	});
}
