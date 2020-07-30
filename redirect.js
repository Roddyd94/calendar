var express = require("express");

var app = express();

app.set("port", process.env.PORT || 80);

app.get("*", (req, res) => {
	res.redirect("https://" + req.headers.host + req.url);
});

app.listen(80);
