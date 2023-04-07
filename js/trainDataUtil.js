async function loadTrainDataAtStop(stopID, campus) {
    const response = await fetch(`https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=dd4939ade14e4384836da74b33ef078a&mapid=${stopID}&max=5&outputType=JSON`);
    const json = await response.json();
    console.log(JSON.stringify(json));
    console.log(json)
    popTrainData(json, campus);
}

// Parses the JSON received with train data
function popTrainData(json, campus) {
    for(let i = 0; i < 5; i++) {
        // Gets where the train is headed ("service to ...")
        const service = (json.ctatt.eta[i].stpDe);
        // Gets the time at which the train will arrive
        const arrivalTime = new Date((json.ctatt.eta[i].arrT)).toLocaleTimeString('en-US');
        console.log(`Train at ${stop} stop with ${service} arriving at: ${arrivalTime}`);
        document.getElementById(`${campus}train${i+1}route`).innerHTML = service;
        document.getElementById(`${campus}train${i+1}arrtm`).innerHTML = arrivalTime;
    }
}

loadTrainDataAtStop(41300, 'lsc');
loadTrainDataAtStop(41450, 'wtc');