var request = require("request");
const { query } = require("express");

var yearTypes = ["getLunCalInfo", "getSolCalInfo"];
var url =
	"http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/" +
	yearTypes[0];
var queryParams =
	"?" +
	encodeURIComponent("ServiceKey") +
	"=hQHtzArZhOZxfKBWc3wZDNkuMZ4BLdC7No%2FkCXkERhhvQjZUg7JjJ6cDJIScNxIQUVCJa4TJCrl9fOeXGVgufA%3D%3D";
queryParams +=
	"&" + encodeURIComponent("solYear") + "=" + encodeURIComponent("2015");
queryParams +=
	"&" + encodeURIComponent("solMonth") + "=" + encodeURIComponent("09");
// queryParams +=
// 	"&" + encodeURIComponent("solDay") + "=" + encodeURIComponent("22");
queryParams +=
	"&" + encodeURIComponent("_type") + "=" + encodeURIComponent("json");
console.log(url + queryParams);
request(
	{
		url: url + queryParams,
		method: "GET",
	},
	function (error, response, body) {
		console.log("Status", response.statusCode);
		console.log("Reponse received", body);
	}
);
