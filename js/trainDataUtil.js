const loadTrainDataAtStop = (stopID, campus, key) => {
    const trainData = fetch(`https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${key}&mapid=${stopID}&max=5&outputType=JSON`);
    trainData.then(response => response.json())
        .then(jsonData => {
            popTrainData(jsonData, campus)
            console.log('CTA train data received successfully!');
        });
    return trainData;
}

// Parses the JSON received with train data
function popTrainData(json, campus) {
    for(let i = 0; i < 5; i++) {
        totalTimes++;
        // Gets where the train is headed ("service to ...")
        const service = (json.ctatt.eta[i].stpDe);
        // Gets the time at which the train will arrive
        const arrivalTime = new Date((json.ctatt.eta[i].arrT)).toLocaleTimeString('en-US');
        document.getElementById(`${campus}train${i+1}route`).innerHTML = service;
        document.getElementById(`${campus}train${i+1}arrtm`).innerHTML = arrivalTime;
        if (json.ctatt.eta[i].isDly == '1') {
            totalDelays++;
            document.getElementById(`${campus}train${i+1}arrtm`).innerHTML = `${arrivalTime} (delayed)`;
            document.getElementById(`${campus}train${i+1}arrtm`).style.color = 'red';
            document.getElementById(`${campus}train${i+2}arrtm`).style.color = 'black';
        }
    }
}
//Chicago red line stop ID: 41450
//Loyola red line stop ID: 41300