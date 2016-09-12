var map;

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 50.8373992, lng: -0.1764012},
    zoom: 13
  });
}

// var request = {
//   location: center,
//   radius: 8047,
//   types: ['restaurant']
// };

var service = new google.maps.places.placesService(map);
service.nearbySearch(request, callback);

function callback(results, status){
  if (status === google.maps.places.PlacesServiceStatus,OK){
    for (var i = 0; i < results.length; i ++ ){
      createMarker(results[i]);
    }
  }
}
