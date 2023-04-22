async function loadBusDataAtStop(stopID, routeID, campus) {
    try {
        const response = await fetch(`http://www.ctabustracker.com/bustime/api/v2/getpredictions?key=aLpvnDLJJwdLHdJUCNpf594yF&stpid=${stopID}&rt=${routeID}&top=5&format=json`);
        const json = await response.text();
        popBusData(json, campus);
        console.log('CTA bus data received successfully!');
    } catch (err) {
        console.log(err);
    }
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
        return `${hours+12 % 13}${mins} AM`; // TODO:  Tentative solution --> may need fixing
    }
}

function popBusData(json, campus) {
    let routeNum, direction, dest, arrivalTime;
    let prediction = (JSON.parse(json)['bustime-response'].prd);
    for(let i = 0; i < prediction.length; i++) {
        let prd = prediction[i];
        routeNum = prd.rt;
        direction = prd.rtdir;
        dest = prd.des;
        arrivalTime = prd.prdtm.slice(9);
        document.getElementById(`${campus}bus${i+1}name`).innerHTML = routeNum;
        document.getElementById(`${campus}bus${i+1}route`).innerHTML = `${direction} towards ${dest}`;
        document.getElementById(`${campus}bus${i+1}arrtm`).innerHTML = busTimeFormat(arrivalTime);
    }
}

// INITIALIZES TIME TABLES

// Stop 1027 is the stop in front of Regis hall at LSC
loadBusDataAtStop(1027, '147,155', 'lsc');
// Stop 1127 is the stop in front of Water Tower Place at WTC
loadBusDataAtStop(1127, '147,155', 'wtc');