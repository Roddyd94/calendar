import { dates } from '/js/dates.js';
var dateData = "20200605";
var today = new Date();
var calendar = {};
var clickPrev = document.querySelector(".left-arrow");
var clickNext = document.querySelector(".right-arrow");

if (dateData != ""){
    calendar.year = Math.floor(Number(dateData) / 10000);
    calendar.month = Math.floor((Number(dateData) % 10000) / 100);
    calendar.today = Math.floor(Number(dateData) % 100);
}
else {
    calendar.year = today.getFullYear();
    calendar.month = today.getMonth() + 1;
    calendar.today = today.getDate();
}

dates(calendar);

clickPrev.onclick = () => {
    location.href=`calendar?date=${calendar.year}
${(calendar.month - 1 > 9)?(calendar.month - 1):('0' + (calendar.month - 1))}
${(calendar.today > 9)?(calendar.today):('0'+calendar.today)}`
}
clickNext.onclick = () => {
    location.href=`calendar?date=${calendar.year}
${(calendar.month + 1 > 9)?(calendar.month + 1):('0' + (calendar.month + 1))}
${(calendar.today > 9)?(calendar.today):('0'+calendar.today)}`
}