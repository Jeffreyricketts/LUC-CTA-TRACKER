// Use JavaScript to track public transportation in real-time
// Here is an example of using the Google Maps API to display a map
// function initMap() {
//   var directionsService = new google.maps.DirectionsService();
//   var directionsRenderer = new google.maps.DirectionsRenderer();
//   // Create a new map centered on the user's current location
//   //   if (navigator.geolocation) {
//   //   navigator.geolocation.getCurrentPosition(function(position) {
//   //     var lat = position.coords.latitude;
//   //     var lng = position.coords.longitude;
//   //     var map = new google.maps.Map(document.getElementById('map'), {
//   //       center: {lat: lat, lng: lng},
//   //       zoom: 12,
//   //     });
//   //
//   //     // Add a marker at the user's current location
//   //     // var marker = new google.maps.Marker({
//   //     //   position: {lat: lat, lng: lng},
//   //     //   map: map,
//   //     //   title: 'You are here'
//   //     // });
//   //     const transitLayer = new google.maps.TransitLayer();
//   //
//   //     transitLayer.setMap(map);
//   //     var busNumbers = [];
//   //     for (var i = 0; i < buses.length; i++) {
//   //       busNumbers.push(buses[i].number);
//   //     }
//   //     console.log(busNumbers.map())
//   //   }, function() {
//   //     handleLocationError(true, infoWindow, map.getCenter());
//   //   });
//   // } else {
//   //   // Browser doesn't support Geolocation
//   //   handleLocationError(false, infoWindow, map.getCenter());
//   // }
//   var lat = position.coords.latitude;
//   var lng = position.coords.longitude;
//   const map = new google.maps.Map(document.getElementById("map"), {
//
//     zoom: 12,
//     center: { lat: lat, lng: lng },
//   });
//   directionsRenderer.setMap(map);
//   calculateAndDisplayRoute(directionsService, directionsRenderer);
//   document.getElementById("mode").addEventListener("change", () => {
//     calculateAndDisplayRoute(directionsService, directionsRenderer);
//   });
// }



/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// [START maps_directions_travel_modes]
function initMap() {
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  var latitude;
  var longitude;
  navigator.geolocation.getCurrentPosition(
      function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
      });

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: 41.9756854, lng: -87.6523867 },
  });
  directionsRenderer.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsRenderer,latitude,longitude);
  document.getElementById("select_camp").addEventListener("change", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer,latitude,longitude);
  });

}

function calculateAndDisplayRoute(directionsService, directionsRenderer, lang, long) {
  const selectedMode = document.getElementById("mode").value;
  // I will get the current location from current user location.


  console.log(lang);
  console.log(long);
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
        origin: {lat: 41.9756854, lng: -87.6523867},

        destination: {lat: lat_d, lng: lon_d},
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        transitOptions: {
          // departureTime: new Date(1337675679473),
          modes: ['BUS'],
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
    calculateAndDisplayRoute(directionsService, directionsRenderer);
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