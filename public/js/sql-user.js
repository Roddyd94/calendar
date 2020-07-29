var mysql = require("mysql");
var crypto = require("crypto");

var sqlConnection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "calendar",
	password: "calendar",
	database: "calendar",
});

sqlConnection.connect();

exports.existsId = (email) => {
	var id = null;
	return new Promise((resolve, reject) => {
		sqlConnection.query(
			`SELECT id FROM Userdata WHERE email='${email}';`,
			(error, result, fields) => {
				if (error) reject(error);
				else {
					if (result[0]) {
						id = result[0].id;
						console.log(`The ID of ${email} already exists: ${id}`);
						resolve(id);
					} else if (id == undefined) {
						resolve(null);
					}
				}
			}
		);
	});
};

exports.addId = (id, email) => {
	if (id) return;

	id = crypto.randomBytes(20).toString("hex");
	return new Promise((resolve, reject) => {
		sqlConnection.query(
			`INSERT INTO Userdata (id, email) VALUES('${id}', '${email}');`,
			(error, result, fields) => {
				if (error) reject(error);
				else {
					id = result.id;
					console.log(`The new ID of ${email} added: ${id}`);
					resolve(id);
				}
			}
		);
	});
};
