let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDate = today.getDate();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let cTitle = document.getElementById("cTitle");
let cLabel = document.getElementById("cLabel");
let cellContainer = document.getElementById("cDates");
let row;
let cell;
let cellText;
let check;

let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

//week label
for (let k = 0; k < 7; k++) {
  cell = document.createElement("div");
  cellText = document.createTextNode(daysOfWeek[k]);
  cell.appendChild(cellText);
  cell.classList.add("colorWeek");
  cLabel.appendChild(cell);
}

//months select option
for (let l = 0; l < 12; l++) {
  cell = document.createElement("option");
  cellText = document.createTextNode(months[l]);
  cell.appendChild(cellText);
  cell.value = l;
  selectMonth.appendChild(cell);
}

//year select option
for (let m = -3; m < 5; m++) {
  cell = document.createElement("option");
  cellText = document.createTextNode(m + today.getFullYear());
  cell.appendChild(cellText);
  cell.value = m + today.getFullYear();
  selectYear.appendChild(cell);
}

showCalendar(currentMonth, currentYear);

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = selectYear.value;
  currentMonth = selectMonth.value;
  showCalendar(currentMonth, currentYear);
}

function reset() {
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();

  //empty previous contents
  cellContainer.innerHTML = "";

  cTitle.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("div");
    row.classList.add("rows");

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("div");
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement("div");
        cell.classList.add("dates");
        cellText = document.createTextNode(date);
        if (date < 10) {
          cell.classList.add("indent");
        }
        if (
          date === today.getDate() &&
          year == today.getFullYear() &&
          month == today.getMonth()
        ) {
          check = document.createTextNode("\u2655");
          cell.classList.add("crown", "highlightToday");
          cell.appendChild(check);
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }
    if (row.childNodes.length > 0) {
      cellContainer.appendChild(row);
    }
  }
}

//how many days in month
function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
