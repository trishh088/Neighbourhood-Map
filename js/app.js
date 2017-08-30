var map;
var marker;
  // Create a styles array to use with the map.
function initMap() {
  var styles = [
        {elementType:'geometry',stylers:[{color:'#242f3e'}]},{elementType:'labels.text.stroke',stylers:[{color:'#242f3e'}]},{elementType:'labels.text.fill',stylers:[{color:'#746855'}]},{featureType:'administrative.locality',elementType:'labels.text.fill',stylers:[{color:'#d59563'}]},{featureType:'poi',elementType:'labels.text.fill',stylers:[{color:'#d59563'}]},{featureType:'poi.park',elementType:'geometry',stylers:[{color:'#263c3f'}]},{featureType:'poi.park',elementType:'labels.text.fill',stylers:[{color:'#6b9a76'}]},{featureType:'road',elementType:'geometry',stylers:[{color:'#38414e'}]},{featureType:'road',elementType:'geometry.stroke',stylers:[{color:'#212a37'}]},{featureType:'road',elementType:'labels.text.fill',stylers:[{color:'#9ca5b3'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#746855'}]},{featureType:'road.highway',elementType:'geometry.stroke',stylers:[{color:'#1f2835'}]},{featureType:'road.highway',elementType:'labels.text.fill',stylers:[{color:'#f3d19c'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#2f3948'}]},{featureType:'transit.station',elementType:'labels.text.fill',stylers:[{color:'#d59563'}]},{featureType:'water',elementType:'geometry',stylers:[{color:'#17263c'}]},{featureType:'water',elementType:'labels.text.fill',stylers:[{color:'#515c6d'}]},{featureType:'water',elementType:'labels.text.stroke',stylers:[{color:'#17263c'}]}
          ];

          // Constructor creates a new map - only center and zoom are required.
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.7413549, lng: -73.9980244},
            zoom: 13,
            //for changing the look of the map
            styles: styles,
            //allows users to change the map type to road , terrian or satellite
            mapTypeControl: true
          });

          // var tribeca = {lat: 40.719526, lng: -74.0089934}; //lat long literal opject
          // var marker = new google.maps.Marker({
          //   position: tribeca,
          //   map: map,
          //   title: 'First Marker!',
          // });
          marker = new google.maps.Marker({
                   map: map,
                   draggable: true,
                   animation: google.maps.Animation.DROP,
                   position: {lat: 40.719526, lng: -74.0089934}
                 });
                //  marker.addListener('mouseover', toggleBounce);
                // On idle, change marker animation to bounce
                   google.maps.event.addListener(map, 'idle', function () {
                       marker.setAnimation(google.maps.Animation.BOUNCE);
                   });
}
