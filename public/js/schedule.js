var scheduleLine = document.querySelector("#schedule-line");
document.createElement("div");

var id = document.getElementById("id-data").innerHTML;

var gCalRequest = new Request(
	`https://roddyd.net/gCalendar?id=${id}&length=${10}&info=${1}`
);
fetch(gCalRequest).then(async (res) => {
	var events = await res.json();
	events.map((event, i) => {
		console.log(event);
	});

	// let lunaSelector = document.createElement("span");
	// lunaSelector.classList.add("luna-dates");
	// lunaSelector.innerHTML = `${
	// 	tempLeap == "윤" ? "(윤)" : ""
	// }${tempMonth}.${tempDay}`;
	// selector.appendChild(lunaSelector);
});
