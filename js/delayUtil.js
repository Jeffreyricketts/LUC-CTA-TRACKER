var totalTimes = 0;
var totalDelays = 0;

function updateDelayPercentage() {
    const delayPercent = document.getElementById("delay-percentage");
    let percent = (totalDelays / totalTimes) * 100;
    delayPercent.innerHTML = `${percent.toFixed(1)}%`;
    totalTimes = 0;
    totalDelays = 0;
}