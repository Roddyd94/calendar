import { dates } from '/js/dates.js';
var dateData = document.querySelector('#date-data');
var dateString = dateData.innerHTML;
var today = new Date();
var calendar = {};
var clickPrev = document.querySelector('.left-arrow');
var clickNext = document.querySelector('.right-arrow');
const calendar_Body = document.querySelector('.slide_body');
const calendar_tbody = document.querySelector('.calendar_tbody');

var cells = document.querySelector('.date-cell');

var holiData;
var holiRequest = new Request(`https://localhost/holiday?date=${dateString}`);

if (dateString != '') {
  calendar.year = Math.floor(Number(dateString) / 10000);
  calendar.month = Math.floor((Number(dateString) % 10000) / 100);
  calendar.today = Math.floor(Number(dateString) % 100);
} else {
  calendar.year = today.getFullYear();
  calendar.month = today.getMonth() + 1;
  calendar.today = today.getDate();
}

(async () => {
  await fetch(holiRequest)
    .then(async (res) => {
      holiData = await res.json();
      calendar.holiday = holiData;
      dates(calendar);
    })
    .then(() => {
      setTimeout(() => {
        calendar_Body.classList.add('show');
      }, 400);
    });
})();

clickPrev.onclick = () => {
  setTimeout(() => {
    location.href = `calendar?date=${
      calendar.month == 1 ? calendar.year - 1 : calendar.year
    }
	${
    calendar.month == 1
      ? '12'
      : calendar.month - 1 > 9
      ? calendar.month - 1
      : '0' + (calendar.month - 1)
  }
	01`;
  }, 500);
  calendar_Body.classList.add('body_left_to_right');
};

clickNext.onclick = () => {
  setTimeout(() => {
    location.href = `calendar?date=${
      calendar.month == 12 ? calendar.year + 1 : calendar.year
    }
${
  calendar.month == 12
    ? '01'
    : calendar.month + 1 > 9
    ? calendar.month + 1
    : '0' + (calendar.month + 1)
}
01`;
  }, 500);
  calendar_Body.classList.add('body_right_to_left');
};

// cells.onclick = () => {
// 	location.href = `calendar?date=${
// 		calendar.month == 12 ? calendar.year + 1 : calendar.year
// 	}
// ${
// 	calendar.month == 12
// 		? "01"
// 		: calendar.month + 1 > 9
// 		? calendar.month + 1
// 		: "0" + (calendar.month + 1)
// }
// 01`;
// };
