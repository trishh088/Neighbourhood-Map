var styles = [
      {elementType:'geometry',stylers:[{color:'#242f3e'}]},{elementType:'labels.text.stroke',stylers:[{color:'#242f3e'}]},{elementType:'labels.text.fill',stylers:[{color:'#746855'}]},{featureType:'administrative.locality',elementType:'labels.text.fill',stylers:[{color:'#d59563'}]},{featureType:'poi',elementType:'labels.text.fill',stylers:[{color:'#d59563'}]},{featureType:'poi.park',elementType:'geometry',stylers:[{color:'#263c3f'}]},{featureType:'poi.park',elementType:'labels.text.fill',stylers:[{color:'#6b9a76'}]},{featureType:'road',elementType:'geometry',stylers:[{color:'#38414e'}]},{featureType:'road',elementType:'geometry.stroke',stylers:[{color:'#212a37'}]},{featureType:'road',elementType:'labels.text.fill',stylers:[{color:'#9ca5b3'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#746855'}]},{featureType:'road.highway',elementType:'geometry.stroke',stylers:[{color:'#1f2835'}]},{featureType:'road.highway',elementType:'labels.text.fill',stylers:[{color:'#f3d19c'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#2f3948'}]},{featureType:'transit.station',elementType:'labels.text.fill',stylers:[{color:'#d59563'}]},{featureType:'water',elementType:'geometry',stylers:[{color:'#17263c'}]},{featureType:'water',elementType:'labels.text.fill',stylers:[{color:'#515c6d'}]},{featureType:'water',elementType:'labels.text.stroke',stylers:[{color:'#17263c'}]}
        ];

var map;


function initAutocomplete() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom: 13,
    //for changing the look of the map
    styles: styles,
    //allows users to change the map type to road , terrian or satellite
    mapTypeControl: true
  });
   var bounds = new google.maps.LatLngBounds();

var input = document.getElementById('city');
            ViewModel.city = new google.maps.places.SearchBox(input);
            // Bias the SearchBox results towards current map's viewport.
           map.addListener('bounds_changed', function() {
              ViewModel.city.setBounds(map.getBounds());
            });
            // Listen for the event fired when the user selects a prediction and retrieve
         // more details for that place.
         ViewModel.city.addListener('places_changed', function() {
           var places = ViewModel.city.getPlaces();

           if (places.length == 0) {
             return;
           }
var markers = [];
           // Clear out the old markers.
           markers.forEach(function(marker) {
             marker.setMap(null);
           });

           // For each place, get the icon, name and location.
         var bounds = new google.maps.LatLngBounds();
         places.forEach(function(place) {
           if (!place.geometry) {
             console.log("Returned place contains no geometry");
             return;
           }
           var icon = {
             url: place.icon,
             size: new google.maps.Size(71, 71),
             origin: new google.maps.Point(0, 0),
             anchor: new google.maps.Point(17, 34),
             scaledSize: new google.maps.Size(25, 25)
           };

           // Create a marker for each place.
           markers.push(new google.maps.Marker({
             map: map,
             icon: icon,
             title: place.name,
             position: place.geometry.location,
             animation: google.maps.Animation.DROP
           }));
           // On idle, change marker animation to bounce
              google.maps.event.addListener(map, 'idle', function () {
                  markers.setAnimation(google.maps.Animation.BOUNCE);
              });

           if (place.geometry.viewport) {
               // Only geocodes have viewport.
               bounds.union(place.geometry.viewport);
             } else {
               bounds.extend(place.geometry.location);
             }
           });
           map.fitBounds(bounds);
         });
        //  marker = new google.maps.Marker({
        //           map: map,
        //           draggable: true,
        //           animation: google.maps.Animation.DROP,
        //           position: {lat: 40.719526, lng: -74.0089934}
        //         });
        //         // On idle, change marker animation to bounce
        //            google.maps.event.addListener(map, 'idle', function () {
        //                marker.setAnimation(google.maps.Animation.BOUNCE);
        //            });
        // Search for hotels in the selected city, within the viewport of the map.


}


var ViewModel = function() {
    var self = this;



  //closing the nav bar
  self.closeNav = function() {
    closeNav: ko.observable(document.getElementById("main").style.marginLeft = "0px"),
    ko.observable(document.getElementById("mySidenav").style.width = "0"),
    ko.observable(document.getElementById("map").style.marginLeft = "0"),
    ko.observable(document.body.style.backgroundColor = "#1F2C40")
  }
  //opening the nav bar
  self.openNav = function() {
    openNav: ko.observable(document.getElementById("main").style.marginLeft = "220px"),
    ko.observable(document.getElementById("mySidenav").style.width = "220px"),
    ko.observable(document.getElementById("map").style.marginLeft = "220px"),
    ko.observable(document.body.style.backgroundColor = "rgba(0,0,0,0.4)")
  }

  //for taking the city input
  self.city = ko.observable("");
    //linking input to google map

    // ko.observable(new google.maps.places.SearchBox(input));


  //for area and cuisine input
  self.area = ko.observable("");
  self.cuisine = ko.observable("");



}
ko.applyBindings(new ViewModel());
