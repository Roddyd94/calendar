var today = document.querySelector("#clock-today");
var clock = document.querySelector("#clock-countdown");
var task = document.querySelector("#clock-task");
var click = document.querySelector("#clock-click");

var taskTime = new Date();
taskTime.setFullYear(2020);
taskTime.setMonth(06);
taskTime.setDate(28);
taskTime.setHours(15);
taskTime.setMinutes(0);

var getTime = (clockSwitch=1) => {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth();
    const date = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    var timeLeft = new Date();

    timeLeft.setFullYear(taskTime.getFullYear() - year);
    timeLeft.setMonth(taskTime.getMonth() - month);
    timeLeft.setDate(taskTime.getDate() - date + 1);
    timeLeft.setHours(taskTime.getHours() - hour);
    timeLeft.setMinutes(taskTime.getMinutes() - minute);
    timeLeft.setSeconds(taskTime.getSeconds() - second);

    const secondsLeft = timeLeft.getSeconds();
    const minutesLeft = timeLeft.getMinutes();
    const hoursLeft = timeLeft.getHours();
    const datesLeft = timeLeft.getDate() - 1;
    const monthsLeft = timeLeft.getMonth() - 1;
    const yearsLeft = timeLeft.getFullYear();

    if (clockSwitch) {
        today.innerHTML = `${yearsLeft}.${(monthsLeft / 10 >= 1) ? monthsLeft : ('0' + monthsLeft)}.${(datesLeft / 10 >= 1) ? datesLeft : ('0' + datesLeft)}`;
        task.innerHTML = `[일정이름]`;
        clock.innerHTML = `${hoursLeft}:${(minutesLeft / 10 >= 1) ? minutesLeft : ('0' + minutesLeft)}:${(secondsLeft / 10 >= 1) ? secondsLeft : ('0' + secondsLeft)}`;
    }
    else {
        today.innerHTML = `${year}.${(month / 10 >= 1) ? month : ('0' + month)}.${(date / 10 >= 1) ? date : ('0' + date)}`;
        task.innerHTML = `[일정이름]`;
        clock.innerHTML = `${hour}:${(minute / 10 >= 1) ? minute : ('0' + minute)}:${(second / 10 >= 1) ? second : ('0' + second)}`;
    }
};

click.onclick = () => {
    location.href="calendar";
}

getTime();

setInterval(getTime, 1000);