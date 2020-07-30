var express = require("express");
var https = require("https");
var fs = require("fs");
var cookieParser = require("cookie-parser");
const { connect } = require("http2");
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
app.use(cookieParser());
app.set("port", process.env.PORT || 443);
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get("/", async (req, res) => {
	res.render("home", {
		helpers: { dateData: req.query.date, idData: req.cookies.id },
	});
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

app.get("/schedule", (req, res) => {
	res.render("schedule", {
		helpers: { dateData: req.query.date, idData: req.cookies.id },
	});
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

app.get("/redirect", async (req, res) => {
	var oAuth2Client;
	oAuth2Client = await gCalendar.service(
		req.cookies.id,
		CRED_PATH,
		TOKEN_DIR
	);
	if (req.query.code) {
		await gCalendar.getAccessToken(
			oAuth2Client,
			req.cookies.id,
			req.query.code,
			TOKEN_DIR
		);
		res.redirect("/");
	}
});

app.get("/profile", async (req, res) => {
	var oAuth2Client;
	var id = null;
	var email = req.query.email;
	id = await sqlUser.existsId(email);
	if (!id) {
		id = await sqlUser.addId(id, email);
	}
	res.cookie("id", id, {
		httpOnly: true,
		secure: true,
	});
	oAuth2Client = await gCalendar.service(id, CRED_PATH, TOKEN_DIR);
	var url;
	TOKEN_PATH = TOKEN_DIR + `${id}.json`;
	if (!fs.existsSync(TOKEN_PATH))
		url = await gCalendar.getAuthUrl(oAuth2Client);
	if (req.query.info == 1) res.send(url);
	else if (req.query.info == 2) res.send(id);
});

app.get("/gCalendar", async (req, res) => {
	var date = new Date();
	var oAuth2Client;
	oAuth2Client = await gCalendar.service(req.query.id, CRED_PATH, TOKEN_DIR);
	var events = await gCalendar.listEvents(
		oAuth2Client,
		req.query.length,
		date
	);
	if (req.query.info == 1) {
		res.json(events);
	} else if (req.query.info == 2) {
		let timeData = events[0].start.dateTime || events[0].start.date;
		res.json(timeData);
	}
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
