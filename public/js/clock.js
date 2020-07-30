var today = document.querySelector("#clock-today");
var clock = document.querySelector("#clock-countdown");
var task = document.querySelector("#clock-task");
var click = document.querySelector("#clock-click");
var taskTime = new Date();

var summary = "일정 이름";
var id = document.getElementById("id-data").innerHTML;

var getClock = async (clockSwitch = 1) => {
	const time = new Date();
	taskTime = new Date(document.getElementById("date-data").innerHTML);
	if (clockSwitch) {
		let timeLeft = 0;
		timeLeft = taskTime.getTime() - time.getTime();

		let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
		let hoursLeft = Math.floor(
			(timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		let minutesLeft = Math.floor(
			(timeLeft % (1000 * 60 * 60)) / (1000 * 60)
		);
		let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

		task.innerHTML = summary;
		today.innerHTML = `${daysLeft}일`;
		clock.innerHTML = `${hoursLeft}:${
			minutesLeft / 10 >= 1 ? minutesLeft : "0" + minutesLeft
		}:${secondsLeft / 10 >= 1 ? secondsLeft : "0" + secondsLeft}`;
	} else {
		let year = time.getFullYear();
		let month = time.getMonth() + 1;
		let date = time.getDate();
		let hour = time.getHours();
		let minute = time.getMinutes();
		let second = time.getSeconds();

		today.innerHTML = `${year}.${month / 10 >= 1 ? month : "0" + month}.${
			date / 10 >= 1 ? date : "0" + date
		}`;
		clock.innerHTML = `${hour}:${
			minute / 10 >= 1 ? minute : "0" + minute
		}:${second / 10 >= 1 ? second : "0" + second}`;
	}
};

var gCalRequest = new Request(
	`https://roddyd.net/gCalendar?id=${id}&length=${1}&info=${1}`
);
fetch(gCalRequest).then(async (res) => {
	var events = await res.json();
	document.getElementById("date-data").innerHTML =
		events[0].start.dateTime || events[0].start.date;
	summary = `[${events[0].summary}]까지`;
	// let lunaSelector = document.createElement("span");
	// lunaSelector.classList.add("luna-dates");
	// lunaSelector.innerHTML = `${
	// 	tempLeap == "윤" ? "(윤)" : ""
	// }${tempMonth}.${tempDay}`;
	// selector.appendChild(lunaSelector);
});
if (id == "") {
	setInterval(getClock, 1000, 0);
} else {
	setInterval(getClock, 1000, 1);
}

click.onclick = () => {
	location.href = "schedule";
};
