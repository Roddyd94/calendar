var express = require("express");
var https = require("https");
var fs = require("fs");
var cookieParser = require("cookie-parser");
var handlebars = require("express-handlebars").create({
	defaultLayout: "main",
	partialsDir: "views/partials",
});

var holiday = require(__dirname + "/public/js/holiday");
var lunaYear = require(__dirname + "/public/js/luna-year");
var gCalendar = require(__dirname + "/public/js/g-calendar");
var sqlUser = require(__dirname + "/public/js/sql-user");

var options = {
	key: fs.readFileSync(__dirname + "/ssl/private.key"),
	cert: fs.readFileSync(__dirname + "/ssl/certificate.crt"),
	ca: fs.readFileSync(__dirname + "/ssl/ca_bundle.crt"),
};

const TOKEN_DIR = __dirname + "/api/token/";
const CRED_PATH = __dirname + "/api/client_secret.json";

var app = express();

app.use(express.static(__dirname + "/public"));
app.set("port", process.env.PORT || 443);
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/calendar", (req, res) => {
	res.render("calendar", {
		helpers: {
			dateData: req.query.date,
		},
	});
});

app.get("/task", (req, res) => {
	res.render("task", { helpers: { dateData: req.query.date } });
});

app.get("/holiday", (req, res) => {
	var thisYear = new Date().getFullYear();
	var year = req.query.date ? req.query.date.substring(0, 4) : `${thisYear}`;
	var path = `./public/json/holi_${year}.json`;
	var holiData;
	if (fs.existsSync(path)) {
		fs.readFile(path, "utf-8", (err, data) => {
			if (err || !data) {
				throw err;
			}
			holiData = JSON.parse(data.toString());
			res.json(holiData);
		});
	} else {
		(async () => {
			holiData = await holiday.reqHoliday(req.query.date);
			fs.writeFile(path, JSON.stringify(holiData), (err) => {
				if (err) {
					throw err;
				}
				console.log(`${path} is saved.`);
				res.json(holiData);
			});
		})();
	}
});

app.get("/lunaYear", (req, res) => {
	var today = new Date();
	var year = req.query.date
		? req.query.date.substring(0, 4)
		: `${today.getFullYear()}`;
	var month = req.query.date
		? req.query.date.substring(4, 6)
		: `${today.getMonth() + 1}`;
	var path = `./public/json/luna_${year}-${month}.json`;
	var lunaData;
	if (fs.existsSync(path)) {
		fs.readFile(path, "utf-8", (err, data) => {
			if (err || !data) {
				throw err;
			}
			lunaData = JSON.parse(data.toString());
			res.json(lunaData);
		});
	} else {
		(async () => {
			lunaData = await lunaYear.reqLunaYear(req.query.date);
			fs.writeFile(path, JSON.stringify(lunaData), (err) => {
				if (err) {
					throw err;
				}
				console.log(`${path} is saved.`);
				res.json(lunaData);
			});
		})();
	}
});

app.get("/redirect", (req, res) => {
	var oAuth2Client;
	oAuth2Client = gCalendar.authorize(id);
	gCalendar.getAuthUrl(oAuth2Client);

	if (req.query.code) gCalendar.getAccessToken(oAuth2Client, req.query.code);
	res.redirect("/home");
});

app.get("/profile", (req, res) => {
	var oAuth2Client;
	var id = null;
	var email = req.query.email;
	(async () => {
		id = await sqlUser.existsId(email);
		if (!id) {
			await sqlUser.addId(id, email);
		}
		oAuth2Client = await gCalendar.service(id, null, CRED_PATH, TOKEN_DIR);
		var url = await gCalendar.getAuthUrl(oAuth2Client);
		res.send(url);
	})();
});

app.use((req, res, next) => {
	res.status(404);
	res.render("404");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500);
	res.render("500");
});

https.createServer(options, app).listen(app.get("port"), () => {
	console.log(
		"Express started on https://localhost:" +
			app.get("port") +
			"; press Ctrl-C to terminate"
	);
});
