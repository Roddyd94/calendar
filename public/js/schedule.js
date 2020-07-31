var scheduleLine = document.querySelector("#schedule-line");

var clickPrev = document.querySelector(".left-arrow");
var clickNext = document.querySelector(".right-arrow");
const calendar_Body = document.querySelector(".slide_body");
const calendar_tbody = document.querySelector(".calendar_tbody");

var monthName = document.getElementById("month-name");

document.createElement("div");

var today = new Date();

var dateString = document.querySelector("#date-data").innerHTML;
var id = document.getElementById("id-data").innerHTML;

var startDate = new Date();
var endDate = new Date();

dateString = dateString
	? `${dateString.substring(0, 4)}-${dateString.substring(
			4,
			6
	  )}-${dateString.substring(6, 8)}`
	: today.toISOString().substring(0, 10);
startDate = new Date(dateString);
endDate = new Date(startDate);
endDate.setDate(endDate.getDate() + 1);

monthName.innerHTML = `${startDate.getMonth() + 1}월 ${startDate.getDate()}일`;

var startDateString = startDate.toISOString();
var endDateString = endDate.toISOString();

var gCalRequest = new Request(
	`https://roddyd.net/gCalendar?length=${9999}&startDate=${startDateString}&endDate=${endDateString}`
);

var inputTaskData = (events, selector) => {
	if (events) {
		if (events.length > 0) {
			events.forEach((element) => {
				let contentSelector = document.createElement("div");
				contentSelector.classList.add("g-schedule");
				if (element.start.date) {
					contentSelector.innerHTML = `오늘 주요 일정: ${element.summary}`;
				}
				if (element.start.dateTime) {
					contentSelector.innerHTML = `${new Date(
						element.start.dateTime
					)
						.toISOString()
						.substring(11, 16)} - ${element.summary}`;
					contentSelector.classList.add("g-time");
				}
				selector.appendChild(contentSelector);
			});
		}
	} else {
		let contentSelector = document.createElement("div");
		contentSelector.classList.add("g-schedule");
		contentSelector.innerHTML = `오늘은 일정이 없습니다.`;
		selector.appendChild(contentSelector);
	}
};

fetch(gCalRequest).then(async (res) => {
	var events = await res.json();
	inputTaskData(events, scheduleLine);
	// let lunaSelector = document.createElement("span");
	// lunaSelector.classList.add("luna-dates");
	// lunaSelector.innerHTML = `${
	// 	tempLeap == "윤" ? "(윤)" : ""
	// }${tempMonth}.${tempDay}`;
	// selector.appendChild(lunaSelector);
});
var tempDate = new Date(startDate);
clickPrev.onclick = () => {
	var tempString = new Date(
		tempDate.setDate(tempDate.getDate() - 1)
	).toISOString();
	setTimeout(() => {
		location.href = `schedule?date=${tempString.substring(
			0,
			4
		)}${tempString.substring(5, 7)}${tempString.substring(8, 10)}`;
	}, 500);
	calendar_Body.classList.add("body_left_to_right");
};
clickNext.onclick = () => {
	var tempString = new Date(
		tempDate.setDate(tempDate.getDate() + 1)
	).toISOString();
	setTimeout(() => {
		location.href = `schedule?date=${tempString.substring(
			0,
			4
		)}${tempString.substring(5, 7)}${tempString.substring(8, 10)}`;
	}, 500);
	calendar_Body.classList.add("body_right_to_left");
};
