// AUTO REFRESH
// Creates functionality to automatically refresh
// Timer is unaffected by user quick-refreshing timetables

function timer(){
    // Gets each of the individual timer bars and counters
    const timeLeft = document.querySelectorAll(`.time-left`);
    const timerBarProg = document.querySelectorAll(`.timer-bar-progress`);
    let sec = 30;
    // Clock portion of the timer
    const timer = setInterval(function () {
        sec--;
        let barWidth = (sec / 30) * 100;

        if (sec >= 0) { // This changes the dynamic countdown value and timer bar for each bar/timer in both campus timetables
            timerBarProg.forEach(bar => bar.style.width = `${barWidth}%`);
            timeLeft.forEach(time => time.innerHTML= `${sec}s`);
        } else {
            clearInterval(timer)
            timerBarProg.forEach(bar => bar.style.width = "0%");
            refresh()
            this.timer();
        }
    }, 1000);
}

const busKey = "";
const trainKey = "";

function refresh() {
    loadTrainDataAtStop(41300, 'lsc', trainKey);
    loadBusDataAtStop(1027, '147,155', 'lsc', busKey);
    loadTrainDataAtStop(41450, 'wtc', trainKey);
    loadBusDataAtStop(1127, '147,155', 'wtc', busKey);
    updateDelayPercentage();
}

timer();
refresh();