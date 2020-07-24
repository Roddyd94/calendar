var request = require("request");
var exports = (module.exports = {});

exports.reqHoliday = (date) => {
	year = Math.floor(date / 10000);
	month = Math.floor((date % 10000) / 100);
	var specDayTypes = [
		"getRestDeInfo",
		"getHoliDeInfo",
		"getAnniversaryInfo",
		"get24DivisionsInfo",
		"getSundryDayInfo",
	];
	var days = [, , , ,];
	var result = [];
	for (let i = 1; i < 2; i++) {
		let url =
			"http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/" +
			specDayTypes[i];
		let queryParams =
			"?" +
			encodeURIComponent("ServiceKey") +
			"=hQHtzArZhOZxfKBWc3wZDNkuMZ4BLdC7No%2FkCXkERhhvQjZUg7JjJ6cDJIScNxIQUVCJa4TJCrl9fOeXGVgufA%3D%3D";
		queryParams +=
			"&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
		queryParams +=
			"&" +
			encodeURIComponent("numOfRows") +
			"=" +
			encodeURIComponent("50");
		queryParams +=
			"&" +
			encodeURIComponent("solYear") +
			"=" +
			encodeURIComponent(year);
		queryParams +=
			"&" +
			encodeURIComponent("_type") +
			"=" +
			encodeURIComponent("json");
		if (month != 0) {
			queryParams +=
				"&" +
				encodeURIComponent("solMonth") +
				"=" +
				encodeURIComponent(month < 10 ? "0" + month : month);
		}
		return new Promise((resolve, reject) => {
			request(
				{
					url: url + queryParams,
					method: "GET",
				},
				(error, response, body) => {
					if (error) reject(error);
					if (response.statusCode != 200) {
						reject(
							"Invalid status code <" + response.statusCode + ">"
						);
					}
					console.log("Holiday API Status", response.statusCode);
					days = JSON.parse(body).response.body.items.item;
					if (days) {
						if (days.length > 1) {
							days.forEach((element) => {
								result.push({
									locdate: element.locdate,
									dateName: element.dateName,
									isHoliday: element.isHoliday,
								});
							});
						} else {
							result.push({
								locdate: days.locdate,
								dateName: days.dateName,
								isHoliday: days.isHoliday,
							});
						}
					}
					resolve(result);
				}
			);
		});
	}
};
