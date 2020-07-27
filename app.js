var express = require("express");
var handlebars = require("express-handlebars").create({
	defaultLayout: "main",
	partialsDir: "views/partials",
});

var holiday = require("./public/js/holiday");

var app = express();

app.use(express.static(__dirname + "/public"));
app.set("port", process.env.PORT || 12345);
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/calendar", (req, res) => {
	var holiData;

	(async () => {
		var temp = await holiday.reqHolidays(req.query.date);
		holiData = temp;

		res.render("calendar", {
			helpers: {
				dateData: req.query.date,
				holiDatas: JSON.stringify(holiData),
			},
		});
	})();
});

app.get("/task", (req, res) => {
	res.render("task", { helpers: { dateData: req.query.date } });
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
