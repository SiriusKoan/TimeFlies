const day_of_week_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var year_progress_bar = document.getElementById("year").children[0];
var month_progress_bar = document.getElementById("month").children[0];
var day_progress_bar = document.getElementById("day").children[0];

function month_days(month, year) {
    if (month == 2) {
        if (year % 4 == 0) {
            if (year % 100 == 0) {
                if (year % 400 == 0) {
                    return 29;
                }
                return 28;
            }
            return 29;
        }
        return 28;
    }
    return days[month - 1];
}

function year_days(year) {
    var days = 0;
    for (var i = 1; i <= 12; i++) {
        days += month_days(i, year);
    }
    return days;
}

function render_current_time() {
    var now = new Date();
    var hours = `${now.getHours()}`.padStart(2, "0");
    var minutes = `${now.getMinutes()}`.padStart(2, "0");
    var seconds = `${now.getSeconds()}`.padStart(2, "0");
    var day = `${now.getDate()}`.padStart(2, "0");
    var month = `${now.getMonth() + 1}`.padStart(2, "0");
    var year = now.getFullYear();
    var day_of_week = now.getDay();
    document.getElementById("current-time").innerText = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${day_of_week_names[day_of_week]}`;
    setTimeout(render_current_time, 200);
}

function generate_ticks(id, count) {
    var bar = document.getElementById(id);
    var ticks_html = "";
    for (var i = 1; i < count; i++) {
        ticks_html += `<span class="tick" style="left: ${i * 100 / count}%"></span>`;
    }
    bar.innerHTML += ticks_html;
}

function render_progress_bar() {
    var now = new Date();
    // year
    var seconds_of_passed_months = 0;
    for (var i = 1; i < now.getMonth(); i++) {
        seconds_of_passed_months += month_days(i, now.getFullYear()) * 86400;
    }
    seconds_of_passed_months += now.getDate() * 86400;
    seconds_of_passed_months += now.getSeconds() + now.getMinutes() * 60 + now.getHours() * 3600
    var year_percentage = seconds_of_passed_months * 100 / (year_days(now.getFullYear()) * 86400);
    year_progress_bar.style.width = year_percentage.toFixed(2) + "%";
    year_progress_bar.innerText = year_percentage.toFixed(2) + "%";
    // month
    var seconds_of_passed_days = 86400 * (now.getDate() - 1);
    seconds_of_passed_days += now.getSeconds() + now.getMinutes() * 60 + now.getHours() * 3600
    var month_percentage = seconds_of_passed_days * 100 / (month_days(now.getMonth() + 1, now.getFullYear()) * 86400);
    month_progress_bar.style.width = month_percentage.toFixed(2) + "%";
    month_progress_bar.innerText = month_percentage.toFixed(2) + "%";
    // day
    var day_percentage = (now.getSeconds() + now.getMinutes() * 60 + now.getHours() * 3600) * 100 / 86400;
    day_progress_bar.style.width = day_percentage.toFixed(2) + "%";
    day_progress_bar.innerText = day_percentage.toFixed(2) + "%";
    setTimeout(render_progress_bar, 1000);
}

render_progress_bar();
render_current_time();
generate_ticks("year", 4);
generate_ticks("month", 4);
generate_ticks("day", 2);