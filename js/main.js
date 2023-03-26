// Use JavaScript to track public transportation in real-time
// Here is an example of using the Google Maps API to display a map
function initMap() {
  // Create a new map centered on the user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},
        zoom: 12
      });

      // Add a marker at the user's current location
      var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map,
        title: 'You are here'
      });
      const transitLayer = new google.maps.TransitLayer();

      transitLayer.setMap(map);
      var busNumbers = [];
      for (var i = 0; i < buses.length; i++) {
        busNumbers.push(buses[i].number);
      }
      console.log(busNumbers.map())
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

initMap()

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
