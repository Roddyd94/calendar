import { dates } from "/js/dates.js";

var dateData = document.querySelector("#date-data");
// var holiData = JSON.parse(document.querySelector("#holi-data").innerHTML);
var dateString = dateData.innerHTML;
var today = new Date();
var calendar = {};
var clickPrev = document.querySelector(".left-arrow");
var clickNext = document.querySelector(".right-arrow");

var holiData;
var holiRequest = new Request(`http://roddyd.net/holiday?date=${dateString}`);

if (dateString != "") {
	calendar.year = dateString.substring(0, 4);
	calendar.month = dateString.substring(4, 6);
	calendar.today = dateString.substring(6, 8);
} else {
	calendar.year = today.getFullYear();
	calendar.month = today.getMonth() + 1;
	calendar.today = today.getDate();
}

(async () => {
	await fetch(holiRequest).then(async (res) => {
		holiData = await res.json();
		calendar.holiday = holiData;
		dates(calendar);
	});
})();

clickPrev.onclick = () => {
	location.href = `calendar?date=${
		calendar.month == 1 ? calendar.year - 1 : calendar.year
	}
${
	calendar.month == 1
		? "12"
		: calendar.month - 1 > 9
		? calendar.month - 1
		: "0" + (calendar.month - 1)
}
01`;
};
clickNext.onclick = () => {
	location.href = `calendar?date=${
		calendar.month == 12 ? calendar.year + 1 : calendar.year
	}
${
	calendar.month == 12
		? "01"
		: calendar.month + 1 > 9
		? calendar.month + 1
		: "0" + (calendar.month + 1)
}
01`;
};
