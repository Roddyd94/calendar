import { dates } from "/js/dates.js";
var dateString = document.querySelector("#date-data").innerHTML;
var id = document.getElementById("id-data").innerHTML;
var today = new Date();
var calendar = {};
var clickPrev = document.querySelector(".left-arrow");
var clickNext = document.querySelector(".right-arrow");
const calendar_Body = document.querySelector(".slide_body");
const calendar_tbody = document.querySelector(".calendar_tbody");

var monthName = document.getElementById("month-name");

var startDate = new Date();
var endDate = new Date();

var tempDate = new Date();

startDate = dateString
	? new Date(`${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-01`)
	: new Date(tempDate.setDate(1));
endDate = new Date(startDate);
endDate.setMonth(endDate.getMonth() + 1);

var startDateString = startDate.toISOString();
var endDateString = endDate.toISOString();

var holiData;
var taskData;

var holiRequest = new Request(`https://roddyd.net/holiday?date=${dateString}`);
var gCalRequest = new Request(
	`https://roddyd.net/gCalendar?length=${9999}&startDate=${startDateString}&endDate=${endDateString}`
);

if (dateString != "") {
	calendar.year = Math.floor(Number(dateString) / 10000);
	calendar.month = Math.floor((Number(dateString) % 10000) / 100);
	calendar.today = Math.floor(Number(dateString) % 100);
} else {
	calendar.year = today.getFullYear();
	calendar.month = today.getMonth() + 1;
	calendar.today = today.getDate();
}

(async () => {
	if (id)
		await fetch(gCalRequest).then(async (res) => {
			taskData = await res.json();
			console.log(taskData);
			calendar.tasks = taskData;
		});
	await fetch(holiRequest).then(async (res) => {
		holiData = await res.json();
		calendar.holiday = holiData;
	});
	await dates(calendar);
	setTimeout(() => {
		calendar_Body.classList.add("show");
	}, 400);
})();

clickPrev.onclick = () => {
	setTimeout(() => {
		location.href = `calendar?date=${
			calendar.month == 1 ? calendar.year - 1 : calendar.year
		}${
			calendar.month == 1
				? "12"
				: calendar.month - 1 > 9
				? calendar.month - 1
				: "0" + (calendar.month - 1)
		}01`;
	}, 500);
	calendar_Body.classList.add("body_left_to_right");
};
clickNext.onclick = () => {
	setTimeout(() => {
		location.href = `calendar?date=${
			calendar.month == 12 ? calendar.year + 1 : calendar.year
		}${
			calendar.month == 12
				? "01"
				: calendar.month + 1 > 9
				? calendar.month + 1
				: "0" + (calendar.month + 1)
		}01`;
	}, 500);
	calendar_Body.classList.add("body_right_to_left");
};
