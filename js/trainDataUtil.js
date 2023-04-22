async function loadTrainDataAtStop(stopID, campus) {
    try {
        const response = await fetch(`https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=dd4939ade14e4384836da74b33ef078a&mapid=${stopID}&max=5&outputType=JSON`);
        const json = await response.json();
        popTrainData(json, campus);
        console.log('CTA train data received successfully!');
    } catch (err) {
        console.log(err);
    }
}

// Parses the JSON received with train data
function popTrainData(json, campus) {
    for(let i = 0; i < 5; i++) {
        // Gets where the train is headed ("service to ...")
        const service = (json.ctatt.eta[i].stpDe);
        // Gets the time at which the train will arrive
        const arrivalTime = new Date((json.ctatt.eta[i].arrT)).toLocaleTimeString('en-US');
        document.getElementById(`${campus}train${i+1}route`).innerHTML = service;
        document.getElementById(`${campus}train${i+1}arrtm`).innerHTML = arrivalTime;
    }
}

//Chicago red line stop ID: 41450
//Loyola red line stop ID: 41300

// loadTrainDataAtStop(41300, 'lsc');
// loadTrainDataAtStop(41450, 'wtc');