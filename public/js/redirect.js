const fs = require("fs");
const mysql = require("mysql");
const crypto = require("crypto");
const readline = require("readline");
const { google } = require("googleapis");

var sqlConnection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "calendar",
	password: "calendar",
	database: "calendar",
});

sqlConnection.connect();

const oAuth2Client = new google.auth.OAuth2(
	client_id,
	client_secret,
	redirect_uris[0]
);

exports.redirect = (id = null, email, url) => {
	var TOKEN_PATH = `./api/token/${id}.json`;

	oAuth2Client.getToken(code, (err, token) => {
		if (err) return console.error("Error retrieving access token", err);
		oAuth2Client.setCredentials(token);
		// Store the token to disk for later program executions

		if (email) {
			sqlConnection.query(
				`SELECT id FROM Userdata WHERE email=${email});`,
				(error, result, fields) => {
					if (error) {
						console.log("error:" + error);
					} else {
						id = result[0].id;
					}
				}
			);
		}

		if (!id) {
			id = crypto.randomBytes(20).toString("hex");
			TOKEN_PATH = `./api/token/${id}.json`;
			sqlConnection.query(
				`INSERT INTO Userdata (id, email) VALUES(${id}, ${email});`,
				(error, result, fields) => {
					if (error) {
						console.log("error:" + error);
					} else {
						console.log(`Created token id of ${email}@gmail.com`);
					}
				}
			);
		}

		fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
			if (err) return console.error(err);
			console.log("Token stored to", TOKEN_PATH);
		});
	});
};
