const loadBusDataAtStop = (stopID, routeID, campus) => {
    const busData = fetch(`http://www.ctabustracker.com/bustime/api/v2/getpredictions?key=aLpvnDLJJwdLHdJUCNpf594yF&stpid=${stopID}&rt=${routeID}&top=5&format=json`);
    busData.then(response => response.json())
        .then(jsonData => {
            console.log(jsonData);
            popBusData(jsonData, campus)
            console.log('CTA bus data received successfully!');
        });
    return busData;
}

function busTimeFormat(time) { // Function to convert 24 hr time to 12 hour time with am/pm designation
    let hours = parseInt(time.slice(0,2));
    let mins = time.slice(2);
    if (hours > 12) { // If time is past noon, find the time mod 12 to get the PM time
        hours = hours % 12;
        return `${hours}${mins} PM`;
    }else if (hours === 12) { // Case for times during the noon hour
        return `${time} PM`;
    } else if (hours <= 12) { // Case for all AM times
        return `${hours}${mins} AM`;
    }
}

function popBusData(json, campus) {
    let routeNum, direction, dest, arrivalTime;
    let prediction = (json['bustime-response'].prd);
    for(let i = 0; i < prediction.length; i++) {
        totalTimes++;
        let prd = prediction[i];
        routeNum = prd.rt;
        direction = prd.rtdir;
        dest = prd.des;
        arrivalTime = prd.prdtm.slice(9);
        document.getElementById(`${campus}bus${i+1}name`).innerHTML = routeNum;
        document.getElementById(`${campus}bus${i+1}route`).innerHTML = `${direction} towards ${dest}`;
        document.getElementById(`${campus}bus${i+1}arrtm`).innerHTML = busTimeFormat(arrivalTime);
        if(prd.dly) {
            totalDelays++;
            document.getElementById(`${campus}bus${i+1}arrtm`).innerHTML = `${busTimeFormat(arrivalTime)} (delayed)`;
            document.getElementById(`${campus}bus${i+1}arrtm`).style.color = 'red';

        }
    }
}

loadBusDataAtStop(1027, '147,155', 'lsc');
// // Stop 1027 is the stop in front of Regis hall at LSC
// // Stop 1127 is the stop in front of Water Tower Place at WTC