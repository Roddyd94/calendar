var inputLunaYear = async (date, selector) => {
	var lunaString = `${date.getFullYear()}${
		date.getMonth() + 1 < 10
			? "0" + (date.getMonth() + 1)
			: date.getMonth() + 1
	}${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
	if (lunaDate) {
		if (lunaDate[0].solMonth != lunaString.substring(4, 6)) {
		} else {
			dateNum = date.getDate() - 1;
			tempMonth = Number(lunaDate[dateNum].lunMonth);
			tempDay = Number(lunaDate[dateNum].lunDay);
			tempLeap = lunaDate[dateNum].lunLeapmonth;

			let lunaSelector = document.createElement("span");
			lunaSelector.classList.add("luna-dates");
			lunaSelector.innerHTML = `${tempMonth}.${tempDay}${
				tempLeap == "Y" ? "(윤)" : ""
			}`;
			selector.appendChild(lunaSelector);
		}
	} else {
		await (async () => {
			var lunaRequest = new Request(
				`http://roddyd.net/lunaYear?date=${lunaString}`
			);
			await fetch(lunaRequest).then(async (res) => {
				var lunaData = await res.json();
				lunaDate = lunaData;
				dateNum = date.getDate() - 1;
				tempMonth = Number(lunaDate[dateNum].lunMonth);
				tempDay = Number(lunaDate[dateNum].lunDay);
				tempLeap = lunaDate[dateNum].lunLeapmonth;

				let lunaSelector = document.createElement("span");
				lunaSelector.classList.add("luna-dates");
				lunaSelector.innerHTML = `${
					tempLeap == "윤" ? "(윤)" : ""
				}${tempMonth}.${tempDay}`;
				selector.appendChild(lunaSelector);
			});
		})();
	}
};

var inputHoliday = (calHoli, selector, date) => {
	if (calHoli) {
		if (calHoli.length > 0) {
			calHoli.forEach((element) => {
				let dateString = String(element.locdate);
				let temp = dateString.substring(0, 4);
				temp += "-" + dateString.substring(4, 6);
				temp += "-" + dateString.substring(6, 8);
				let tempDate = new Date(temp);
				if (
					tempDate.getFullYear() == date.getFullYear() &&
					tempDate.getMonth() == date.getMonth() &&
					tempDate.getDate() == date.getDate()
				) {
					let contentSelector = document.createElement("div");
					contentSelector.classList.add("holiday");
					contentSelector.innerHTML = element.dateName;
					selector.appendChild(contentSelector);
					if (element.isHoliday == "Y")
						selector.classList.add("rest");
				}
			});
		} // else if (calendar.holiday.locdate == weeks[i][j])
		// dateSelector.innerHTML += "\t " + calendar.holiday.dateName;
	}
};

var lunaDate;
var tempMonth;
var tempDay;
var tempLeap;
var dateNum;

export var dates = (calendar) => {
	var weeks = [];
	var firstDate = new Date(`${calendar.year}-${calendar.month}`);
	var lastDate = new Date(
		`${calendar.month == 12 ? calendar.year + 1 : calendar.year}-${
			calendar.month == 12 ? 1 : calendar.month + 1
		}`
	);
	lastDate = new Date(lastDate.getTime() - 1000 * 60 * 60 * 24);

	var monthName = document.getElementById("month-name");
	monthName.innerHTML = `${calendar.year}년 ${calendar.month}월`;
	var monthSelector = document.getElementById("calendar-grid");

	for (
		let i = 0;
		i < Math.ceil((lastDate.getDate() + firstDate.getDay()) / 7);
		i++
	) {
		weeks.push([]);
		let weekSelector = document.createElement("tr");
		weekSelector.id = `week-${i + 1}`;
		weekSelector.classList.add("week-contents");

		for (let j = 0; j < 7; j++) {
			weeks[i][j] = new Date(
				firstDate.getTime() +
					i * (1000 * 60 * 60 * 24 * 7) +
					(j - firstDate.getDay()) * (1000 * 60 * 60 * 24)
			);

			let dateSelector = document.createElement("td");
			dateSelector.id = `date-${i + 1}-${j + 1}`;

			if (j == 0) dateSelector.classList.add("sunday");
			else if (j == 6) dateSelector.classList.add("saturday");

			if (weeks[i][j].getMonth() + 1 == calendar.month) {
				if (weeks[i][j].getDate() == calendar.today)
					dateSelector.classList.add("today");
			} else {
				dateSelector.classList.add("other-month");
			}

			dateSelector.classList.add("date-cell");
			dateSelector.innerHTML = `${weeks[i][j].getDate()}일`;

			(async () => {
				await inputLunaYear(weeks[i][j], dateSelector);
				inputHoliday(calendar.holiday, dateSelector, weeks[i][j]);
			})();

			weekSelector.appendChild(dateSelector);
		}
		monthSelector.appendChild(weekSelector);
	}
};
