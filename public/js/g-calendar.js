const fs = require("fs");
const { google } = require("googleapis");
const { rejects } = require("assert");
var exports = (module.exports = {});
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// Load client secrets from a local file.
exports.service = (id, callback, CRED_PATH, TOKEN_DIR) => {
	return new Promise((resolve, reject) => {
		fs.readFile(CRED_PATH, async (err, content) => {
			if (err)
				console.log("Error loading client secret file:", reject(err));
			// Authorize a client with credentials, then call the Google Calendar API.
			resolve(
				await exports.authorize(
					JSON.parse(content),
					id,
					callback,
					TOKEN_DIR
				)
			);
		});
	});
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
exports.authorize = (credentials, id, callback, TOKEN_DIR) => {
	return new Promise((resolve, reject) => {
		const { client_secret, client_id, redirect_uris } = credentials.web;
		const oAuth2Client = new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0]
		);

		TOKEN_PATH = TOKEN_DIR + `${id}.json`;

		// Check if we have previously stored a token.
		fs.readFile(TOKEN_PATH, (err, token) => {
			if (err) resolve(oAuth2Client);
			else {
				oAuth2Client.setCredentials(JSON.parse(token));
				if (callback) callback(oAuth2Client);
			}
		});
	});
};

/**
 * Get url for user authorization code
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
exports.getAuthUrl = (oAuth2Client) => {
	return new Promise((resolve, reject) => {
		const authUrl = oAuth2Client.generateAuthUrl({
			access_type: "offline",
			scope: SCOPES,
		});
		resolve(authUrl);
	});
};

/**
 * Get and store new token with the code
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
exports.getAccessToken = (oAuth2Client, code) => {
	var id;
	oAuth2Client.getToken(code, (err, token) => {
		if (err) return console.error("Error retrieving access token", err);

		oAuth2Client.setCredentials(token);

		TOKEN_PATH = `./api/token/${id}.json`;

		fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
			if (err) return console.error(err);
			console.log("Token stored to", TOKEN_PATH);
		});
	});
	return id;
};

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
	const calendar = google.calendar({ version: "v3", auth });
	calendar.events.list(
		{
			calendarId: "primary",
			timeMin: new Date().toISOString(),
			maxResults: 10,
			singleEvents: true,
			orderBy: "startTime",
		},
		(err, res) => {
			if (err) return console.log("The API returned an error: " + err);
			const events = res.data.items;
			if (events.length) {
				console.log("Upcoming 10 events:");
				events.map((event, i) => {
					const start = event.start.dateTime || event.start.date;
					console.log(`${start} - ${event.summary}`);
				});
			} else {
				console.log("No upcoming events found.");
			}
		}
	);
}
