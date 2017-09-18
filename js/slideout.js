'use strict';
var styles = [{
    elementType: 'geometry',
    stylers: [{
        color: '#242f3e'
    }]
}, {
    elementType: 'labels.text.stroke',
    stylers: [{
        color: '#242f3e'
    }]
}, {
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#746855'
    }]
}, {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#d59563'
    }]
}, {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#d59563'
    }]
}, {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{
        color: '#263c3f'
    }]
}, {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#6b9a76'
    }]
}, {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{
        color: '#38414e'
    }]
}, {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{
        color: '#212a37'
    }]
}, {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#9ca5b3'
    }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{
        color: '#746855'
    }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
        color: '#1f2835'
    }]
}, {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#f3d19c'
    }]
}, {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{
        color: '#2f3948'
    }]
}, {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#d59563'
    }]
}, {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{
        color: '#17263c'
    }]
}, {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#515c6d'
    }]
}, {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{
        color: '#17263c'
    }]
}];
var infoWindow;
var map;
var markers = [];
var locations = [
  {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
  {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
  {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.7413549,
            lng: -73.9980244
        },
        zoom: 13,
        //for changing the look of the map
        styles: styles,
        //allows users to change the map type to road , terrian or satellite
        mapTypeControl: true
    });
    // to make the markers visible even if the viewport is reduced
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
    //this is for predefined locations on start up
    // var locations = [
    //   {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
    //   {title: 'Chelsea Loft 40.7444883,-73.9949465', location: {lat: 40.7444883, lng: -73.9949465}},
    //   {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
    //   {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
    //   {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    // ];
    var bounds = new google.maps.LatLngBounds();
    var largeInfowindow = new google.maps.InfoWindow();
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      var position = locations[i].location;
      var title = locations[i].title;
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.BOUNCE,


      });
      document.getElementById('show-listings').addEventListener('click', showListings);
      document.getElementById('hide-listings').addEventListener('click', hideListings);

      // function populateInfoWindow(marker, infowindow) {
      //   // Check to make sure the infowindow is not already opened on this marker.
      //   if (infowindow.marker != marker) {
      //     infowindow.marker = marker;
      //     infowindow.setContent('<div>' + marker.title + '</div>');
      //     infowindow.open(map, marker);
      //     // Make sure the marker property is cleared if the infowindow is closed.
      //     infowindow.addListener('closeclick', function() {
      //       infowindow.marker = null;
      //     });
      //   }
      // }
      function populateInfoWindow(marker, infowindow) {
          // Check to make sure the infowindow is not already opened on this marker.
          if (infowindow.marker != marker) {
            infowindow.setContent('');


              infowindow.marker = marker;
              // Make sure the marker property is cleared if the infowindow is closed.
              infowindow.addListener('closeclick', function() {
                  infowindow.marker = null;
              });
              var streetViewService = new google.maps.StreetViewService();
              var radius = 50;
              // In case the status is OK, which means the pano was found, compute the
              // position of the streetview image, then calculate the heading, then get a
              // panorama from that and set the options
              function getStreetView(data, status) {
                  if (status == google.maps.StreetViewStatus.OK) {
                      var nearStreetViewLocation = data.location.latLng;
                      var heading = google.maps.geometry.spherical.computeHeading(
                          nearStreetViewLocation, marker.position);
                      infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                      var panoramaOptions = {
                          position: nearStreetViewLocation,
                          pov: {
                              heading: heading,
                              pitch: 30
                          }
                      };
                      var panorama = new google.maps.StreetViewPanorama(
                          document.getElementById('pano'), panoramaOptions);
                  } else {
                      infowindow.setContent('<div>' + marker.title + '</div>' +
                          '<div>No Street View Found</div>');
                  }
              }
              // Use streetview service to get the closest streetview image within
              // 50 meters of the markers position
              streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
              // Open the infowindow on the correct marker.
              infowindow.open(map, marker);
          }
      }

      // Push the marker to our array of markers.
      markers.push(marker);
      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      });
      bounds.extend(markers[i].position);
    };


    //for external search of places usisg search box

    var input = document.getElementById('city');
    var city = new google.maps.places.SearchBox(input);
    // Bias the SearchBox results towards current map's viewport.
    // markers.push(null);
    map.addListener('bounds_changed', function() {
        city.setBounds(map.getBounds());
    });
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    city.addListener('places_changed', function() {
        var places = city.getPlaces();



        if (places.length == 0) {
            window.alert("We did not find any place matching your request");
        }


        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();

        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }


            //     url: place.icon,
            // var icon = {
            //     size: new google.maps.Size(71, 71),
            //     origin: new google.maps.Point(0, 0),
            //     anchor: new google.maps.Point(17, 34),
            //     scaledSize: new google.maps.Size(55, 55)
            // };
            // Create a marker for each place.

            var marker = (new google.maps.Marker({
                map: map,
                // icon: icon,
                title: place.name,
                position: place.geometry.location,
                animation: google.maps.Animation.BOUNCE
            }));
            // Clear out the old markers.
            //  markers.setMap(null);



            // Push the marker to our array of markers.
            markers.push(marker);
            // Create an onclick event to open an infowindow at each marker.
            marker.addListener('click', function() {
                populateInfoWindow(this, largeInfowindow);
            });

            // This function populates the infowindow when the marker is clicked. We'll only allow
            // one infowindow which will open at the marker that is clicked, and populate based
            // on that markers position.
            function populateInfoWindow(marker, infowindow) {
                // Check to make sure the infowindow is not already opened on this marker.
                if (infowindow.marker != marker) {
                  infowindow.setContent('');

                    infowindow.marker = marker;
                    // Make sure the marker property is cleared if the infowindow is closed.
                    infowindow.addListener('closeclick', function() {
                        infowindow.marker = null;
                    });
                    var streetViewService = new google.maps.StreetViewService();
                    var radius = 50;
                    // In case the status is OK, which means the pano was found, compute the
                    // position of the streetview image, then calculate the heading, then get a
                    // panorama from that and set the options
                    function getStreetView(data, status) {
                        if (status == google.maps.StreetViewStatus.OK) {
                            var nearStreetViewLocation = data.location.latLng;
                            var heading = google.maps.geometry.spherical.computeHeading(
                                nearStreetViewLocation, marker.position);
                            infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                            var panoramaOptions = {
                                position: nearStreetViewLocation,
                                pov: {
                                    heading: heading,
                                    pitch: 30
                                }
                            };
                            var panorama = new google.maps.StreetViewPanorama(
                                document.getElementById('pano'), panoramaOptions);
                        } else {
                            infowindow.setContent('<div>' + marker.title + '</div>' +
                                '<div>No Street View Found</div>');
                        }
                    }
                    // Use streetview service to get the closest streetview image within
                    // 50 meters of the markers position
                    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
                    // Open the infowindow on the correct marker.
                    infowindow.open(map, marker);
                }
            }

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

        map.fitBounds(bounds);



    });
    // This function will loop through the listings and hide them all.
}

            function hideListings() {
            //   for (var i = 0; i < markers.length; i++) {
            //     markers[i].setMap(null);
            //   }
            // }
            for (var i = 0; i < markers.length; i++) {
              if(city.length===0){
                markers[i].setVisible(true);
              } else {
                markers[i].setVisible(false);
              }
            }
            }

            function showListings() {
              for (var i = 0; i < markers.length; i++) {
                if(city.length===0){
                  markers[i].setVisible(false);
                } else {
                  markers[i].setVisible(true);
                }
              }

            }



// function loadData() {
//    var $nytHeaderElem = $('#nytimes-header');
//   var $nytElem = $('#nytimes-articles');
//    ViewModel.city = $('#city').val(); //city input
//   // clear out old data before new request
//   $nytElem.text("");
//   //NYT AJax request
//       var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + ViewModel.city + '&sort=newest&api-key=4c3e33c2b2534f8c958d1c1e6084f75e';
//          $.getJSON(nytimesUrl,function(data){
//        $nytHeaderElem.text('New york Times articles about ' + ViewModel.city);
//        articles = data.response.docs;
//   console.log(articles);
//   //checks if articles are there or not and to handle if a ser puts a wierd query
//   if(articles.length===0 ){
//     $nytHeaderElem.text(' articles are not there');
//   }
//   if(!$.trim(ViewModel.city)) {
//     $nytHeaderElem.text('please enter an input first');
//   }else
//        for(var i=0;i<articles.length;i++){
//
//          var article = articles[i];
//          $nytElem.append('<li class="article">'+
//              				'<a href="'+article.web_url+'">'+article.headline.main+
//              					'</a>'+
//              				'<p>' + article.snippet + '</p>'+
//              				'</li>');     };
//                   }).fail(function(e) {
//                 $nytHeaderElem.text('New york Times articles could not be loaded ');
//
//   });
//   return false; //important as you wont get the output without it
//
//   };
//   // $('#inputSection').submit(loadData); //calls the load data function
//   clickContainer = document.getElementById('nyt');
//   // clickContainer.addEventListener('submit', loadData);
//   clickContainer.addEventListener('click', loadData);



var ViewModel = function() {
    var self = this;
    // for the slide out menu
self.navIsOpen = ko.observable(false);
self.closeNav = function () {
  self.navIsOpen(false);
}
self.openNav = function () {
  self.navIsOpen(true);
}

self.locationArray = ko.observableArray([locations]);
console.log(self.locationArray());

self.listViewClick = function(list,i) {
    map.panTo(self.locationArray()); // Pan to correct marker when list view item is clicked
map.setZoom(15); //Zoom map view
// list.markers.setAnimation(google.maps.Animation.DROP); // Bounce marker when list view item is clicked
    // infoWindow.open(map, list.markers); // Open info window on correct marker when list item is clicked
google.maps.event.trigger(list, 'click');

}




// self.markers = [];
// // self.locations = ko.observableArray(locations);
//
// //Map info windows to each item in the markers array
//   self.markers.map(function(info) {
//     infoWindow = new google.maps.InfoWindow({
//       content: content
//     });
//     //Add click event to each marker to open info window
//     info.addListener('click', function() {
//       infoWindow.open(map, this),
//         info.setAnimation(google.maps.Animation.BOUNCE) //Markers will bounce when clicked
//       setTimeout(function() {
//         info.setAnimation(null)
//       }, 2000); //Change value to null after 2 seconds and stop markers from bouncing
//     });
//
//   });

    // //closing the nav bar
    // self.closeNav = function() {
    //     closeNav: ko.observable(document.getElementById("main").style.marginLeft = "0px"),
    //     ko.observable(document.getElementById("mySidenav").style.width = "0"),
    //     ko.observable(document.getElementById("map").style.marginLeft = "0"),
    //     ko.observable(document.body.style.backgroundColor = "#1F2C40")
    // }
    // //opening the nav bar
    // self.openNav = function() {
    //     openNav: ko.observable(document.getElementById("main").style.marginLeft = "220px"),
    //     ko.observable(document.getElementById("mySidenav").style.width = "220px"),
    //     ko.observable(document.getElementById("map").style.marginLeft = "220px"),
    //     ko.observable(document.body.style.backgroundColor = "rgba(0,0,0,0.4)")
    // }

    //for taking the city input
    self.city = ko.observable("");
    //linking input to google map






}

ko.applyBindings(new ViewModel());
