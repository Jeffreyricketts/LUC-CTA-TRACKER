// AUTO REFRESH
// Creates functionality to automatically refresh
// Timer is unaffected by user quick-refreshing timetables

function timer(campus){
    // Initializes variables/values
    const timeLeft = document.getElementById(`${campus}-time-left`);
    timeLeft.innerHTML = '30s';
    const timerBarProg = document.getElementById(`${campus}-timer-bar-progress`);
    timerBarProg.style.width = '100%';
    let sec = 30;
    // Clock portion of the timer
    const timer = setInterval(function () {
        sec--;
        let barWidth = (sec / 30) * 100;

        if (sec >= 0) {
            timerBarProg.style.width = `${barWidth}%`;
            timeLeft.innerHTML = `${sec}s`;
        } else {
            clearInterval(timer)
            timerBarProg.style.width = "0%";
            refreshAt(campus);
            this.timer(campus);
        }
    }, 1000);
}

function refreshAt(campus) {
    if (campus === 'lsc') {
        loadTrainDataAtStop(41300, 'lsc');
        loadBusDataAtStop(1027, '147,155', 'lsc');
    }
    if (campus === 'wtc') {
        loadTrainDataAtStop(41450, 'wtc');
        loadBusDataAtStop(1127, '147,155', 'wtc');
    }
}

refreshAt('lsc');
refreshAt('wtc');
timer('lsc');
timer('wtc');
