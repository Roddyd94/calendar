var request = require("request");

var exports = (module.exports = {});
exports.reqLunaYear = (date) => {
	var year = date.substring(0, 4);
	var month = date.substring(4, 6);
	var day = date.substring(6, 8);

	var yearTypes = ["getLunCalInfo", "getSolCalInfo"];
	var url =
		"http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/" +
		yearTypes[0];
	var queryParams =
		"?" +
		encodeURIComponent("ServiceKey") +
		"=hQHtzArZhOZxfKBWc3wZDNkuMZ4BLdC7No%2FkCXkERhhvQjZUg7JjJ6cDJIScNxIQUVCJa4TJCrl9fOeXGVgufA%3D%3D";
	queryParams +=
		"&" + encodeURIComponent("solYear") + "=" + encodeURIComponent(year);
	queryParams +=
		"&" + encodeURIComponent("solMonth") + "=" + encodeURIComponent(month);
	queryParams +=
		"&" + encodeURIComponent("solDay") + "=" + encodeURIComponent(day);
	queryParams +=
		"&" + encodeURIComponent("_type") + "=" + encodeURIComponent("json");
	return new Promise((resolve, reject) => {
		request(
			{
				url: url + queryParams,
				method: "GET",
			},
			(error, response, body) => {
				if (error) reject(error);
				if (response.statusCode != 200) {
					reject("Invalid status code <" + response.statusCode + ">");
				}
				console.log("Lunar year API Status", response.statusCode);
				var lunaDate = JSON.parse(body).response.body.items.item;
				if (lunaDate) {
					var result = {
						lunYear: lunaDate.lunYear,
						lunMonth: lunaDate.lunMonth,
						lunDay: lunaDate.lunDay,
						lunLeapmonth: lunaDate.lunLeapmonth,
						solYear: lunaDate.solYear,
						solMonth: lunaDate.solMonth,
						solDay: lunaDate.solDay,
					};
				}
				resolve(result);
			}
		);
	});
};
