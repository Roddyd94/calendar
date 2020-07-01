var today = document.querySelector("#clock-today");
var clock = document.querySelector("#clock-countdown");
var task = document.querySelector("#clock-task");
var click = document.querySelector("#clock-click");

var taskYear = 2020;
var taskMonth = 12;
var taskDate = 3
var taskHours = 9;
var taskMinutes = 0;

var taskTime = new Date(`${taskYear}-${taskMonth}-${taskDate} ${taskHours}:${taskMinutes}`);

var getTime = (clockSwitch=1) => {
    const time = new Date();
    
    if (clockSwitch) {
        var timeLeft = 0;
        timeLeft = taskTime.getTime() - time.getTime();

        var daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        var hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        task.innerHTML = `[수능] 까지`;
        today.innerHTML = `${daysLeft}일`;
        clock.innerHTML = `${hoursLeft}:${(minutesLeft / 10 >= 1) ? minutesLeft : ('0' + minutesLeft)}:${(secondsLeft / 10 >= 1) ? secondsLeft : ('0' + secondsLeft)}`;
    }
    else {
        const year = time.getFullYear();
        const month = time.getMonth();
        const date = time.getDate();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();

        today.innerHTML = `${year}.${(month / 10 >= 1) ? month : ('0' + month)}.${(date / 10 >= 1) ? date : ('0' + date)}`;
        clock.innerHTML = `${hour}:${(minute / 10 >= 1) ? minute : ('0' + minute)}:${(second / 10 >= 1) ? second : ('0' + second)}`;
    }
};

click.onclick = () => {
    location.href="calendar";
}

getTime();

setInterval(getTime, 1000);