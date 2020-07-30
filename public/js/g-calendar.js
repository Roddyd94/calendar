const fs = require("fs");
const { google } = require("googleapis");
const { rejects } = require("assert");
const { resolve } = require("path");
var exports = (module.exports = {});
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

// Load client secrets from a local file.
exports.service = (id, CRED_PATH, TOKEN_DIR) => {
	return new Promise((resolve, reject) => {
		fs.readFile(CRED_PATH, async (err, content) => {
			if (err) reject(err);
			// Authorize a client with credentials, then call the Google Calendar API.
			resolve(
				await exports.authorize(JSON.parse(content), id, TOKEN_DIR)
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
exports.authorize = (credentials, id, TOKEN_DIR) => {
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
			if (err) {
				console.log("ReadFile error: ");
				console.log("TOKEN_PATH: " + TOKEN_PATH);
				console.log("id: " + id);
				resolve(oAuth2Client);
			} else {
				oAuth2Client.setCredentials(JSON.parse(token));
				resolve(oAuth2Client);
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
exports.getAccessToken = (oAuth2Client, id, code, TOKEN_DIR) => {
	return new Promise((resolve, reject) => {
		oAuth2Client.getToken(code, (err, token) => {
			if (err) reject(err);
			oAuth2Client.setCredentials(token);
			TOKEN_PATH = TOKEN_DIR + `${id}.json`;
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				if (err) reject(err);
				console.log("Token stored to", TOKEN_PATH);
			});
		});
		resolve(id);
	});
};

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
exports.listEvents = (auth, length = 10, date) => {
	const calendar = google.calendar({ version: "v3", auth });
	return new Promise((resolve, reject) => {
		calendar.events.list(
			{
				calendarId: "primary",
				timeMin: new Date().toISOString(),
				maxResults: length,
				singleEvents: true,
				orderBy: "startTime",
			},
			(err, res) => {
				if (err)
					return console.log("The API returned an error: " + err);
				const events = res.data.items;
				if (events.length) {
					events.map((event, i) => {
						const start = event.start.dateTime || event.start.date;
						resolve(events);
					});
				} else {
					console.log("No upcoming events found.");
				}
			}
		);
	});
};
