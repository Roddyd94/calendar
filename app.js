var express = require("express");
var fs = require("fs");
var handlebars = require("express-handlebars").create({
	defaultLayout: "main",
	partialsDir: "views/partials",
});

var holiday = require("./public/js/holiday");
var lunaYear = require("./public/js/lunaYear");

var app = express();

app.use(express.static(__dirname + "/public"));
app.set("port", process.env.PORT || 12345);
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
	var day = req.query.date
		? req.query.date.substring(6, 8)
		: `${today.getDate()}`;
	var path = `./public/json/luna_${year}-${month}-${day}.json`;
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

app.use((req, res, next) => {
	res.status(404);
	res.render("404");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500);
	res.render("500");
});

app.listen(app.get("port"), () => {
	console.log(
		"Express started on http://localhost:" +
			app.get("port") +
			"; press Ctrl-C to terminate"
	);
});
