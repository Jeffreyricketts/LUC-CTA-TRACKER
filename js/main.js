
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// [START maps_directions_travel_modes]
const transportation = {
  mode: 'BUS',
  setMode(value) {
    if (value === 1) {
      this.mode = 'BUS';
    } else if (value === 2) {
      this.mode = 'SUBWAY';
    } else {
      this.mode = 'BUS';
    }
  },

  getMode() {
    return this.mode;
  },
};

// setter and getter for transportation mode.
function change_tras(modeValue) {
  transportation.setMode(modeValue);
  const mode = transportation.getMode();
  console.log(mode);
  return mode;
}

const current_location = {
  latitude:0,
  longitude:0,
  setdir(latitude,longitude){
    this.latitude=latitude;
    this.longitude=longitude;
  },
  get_lat(){
    return this.latitude
  },
  get_long(){
    return this.longitude;
  }
}

function update_dir_lat(lat,long){
  current_location.setdir(lat,long);
  const lat_ = current_location.get_lat();
  const  long_ = current_location.get_long();

  return lat_;
}
function update_dir_long(lat,long){
  current_location.setdir(lat,long);
  // const lat_ = current_location.get_lat();
  const  long_ = current_location.get_long();
  return long_;
}
function initMap() {
  const directionsRenderer = new google.maps.DirectionsRenderer(); // bus and train direction
  const directionsService = new google.maps.DirectionsService();// transportation
  var latitude;
  var longitude;
  var update_lat;
  var update_long;
  navigator.geolocation.getCurrentPosition(
      function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        //setter for current position
        update_lat = update_dir_lat(latitude,longitude);
        update_long = update_dir_long(latitude,longitude);

      });

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 41.8337329, lng: -87.7319639 },
  });

  directionsRenderer.setMap(map);
  console.log('lat updated :', update_lat)
  console.log('long updated :', update_long)
  calculateAndDisplayRoute(directionsService, directionsRenderer,update_lat,update_long,transportation.mode);
  document.getElementById("select_camp").addEventListener("change", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer,update_lat,update_long,transportation.mode);
  });

}





function calculateAndDisplayRoute(directionsService, directionsRenderer, lang, long,change_transit) {
  const selectedMode = document.getElementById("mode").value;
  // I will get the current location from current user location.
  //

  console.log('mode is ', transportation.mode);
  change_transit = transportation.mode;
  console.log('is changed ? ',lang);
  console.log('is changed ? ',long);

  var select_campus = document.getElementById('select_camp').value;
  // console.log('Here seclect campus');
  // console.log(select_campus);
  var lat_d ;
  var lon_d ;
  if (select_campus == 1){
    lat_d = 41.9989483;
    lon_d = -87.6608341;
  }else if (select_campus == 2){
    lat_d = 41.8975944;
    lon_d = -87.6291794;
  }else{

  }


  directionsService
      .route({
        origin: {lat: lang, lng: long},
        destination: {lat: lat_d, lng: lon_d},
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        transitOptions: {
          // departureTime: new Date(1337675679473),
          modes: [transportation.getMode()],
          routingPreference: 'FEWER_TRANSFERS'
        },
        travelMode: google.maps.TravelMode[selectedMode],
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
  // .catch((e) => window.alert("Directions request failed due to " + status));

}

window.initMap = initMap;
// [END maps_directions_travel_modes]

function calcRoute() {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  var start = new google.maps.LatLng(lat, lng);
  var travelMode =document.getElementById("mode").addEventListener("change", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer, lang, long,change_transit);
  });
  var end = new google.maps.LatLng(41.9989483, -87.6608341);
  var request = {
    origin: start,
    destination: end,
    travelMode: travelMode
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
}
// Calculate the router start and end destinations.

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

setTimeout(20)
window.initMap = initMap;//initMap()

// Use JavaScript to display the arrival time of the public transportation
var arrivalTime = 5; // Set the arrival time to 5 minutes
document.getElementById("arrival-time").innerHTML = arrivalTime;



/* open and close the side navigation bar */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

