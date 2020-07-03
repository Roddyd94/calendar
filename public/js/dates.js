export var dates = (calendar) => {
    var weeks = [[],[],[],[],[],[]];
    var firstDate = new Date(`${calendar.year}-${calendar.month}`);
    var lastDate = new Date(`${(calendar.month == 12)?(calendar.year + 1):(calendar.year)}-${(calendar.month == 12)?(1):(calendar.month + 1)}`);

    console.log(lastDate);
    lastDate = new Date(lastDate.getTime() - 1000 * 60 * 60 * 24);

    var monthName = document.getElementById("month-name");
    monthName.innerHTML = `${calendar.year}년 ${calendar.month}월`;
    var monthSelector = document.getElementById("calendar-grid");

    for (let i = 0; i < Math.ceil((lastDate.getDate() + firstDate.getDay()) / 7) ; i++) {
        let weekSelector = document.createElement("tr");
        weekSelector.id = `week-${i + 1}`;
        weekSelector.classList.add("week-contents");
        
        for (let j = 0; j < 7; j++){
            weeks[i][j] = new Date(firstDate.getTime() + i * (1000 * 60 * 60 * 24 * 7)
                + (j - firstDate.getDay()) * (1000 * 60 * 60 * 24));

            let dateSelector = document.createElement("td");
            dateSelector.id = `date-${i + 1}-${j + 1}`;

            if (weeks[i][j].getMonth() + 1 == calendar.month){
                if(weeks[i][j].getDate() == calendar.today)
                    dateSelector.classList.add("today");
                if (j == 0) dateSelector.classList.add("sunday");
                else if (j == 6) dateSelector.classList.add("saturday");
            }
            else{
                dateSelector.classList.add("other-month")
                if (j == 0) dateSelector.classList.add("other-sunday");
                else if (j == 6) dateSelector.classList.add("other-saturday");
            }

            dateSelector.classList.add("date-cell");
            dateSelector.innerHTML = `${weeks[i][j].getDate()}일`;
            weekSelector.appendChild(dateSelector);
        }
        monthSelector.appendChild(weekSelector);
    }
};