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

var map;
var markers = [];
var locations = [{
        title: 'Park Ave Penthouse',
        location: {
            lat: 40.7713024,
            lng: -73.9632393
        }
    },
    {
        title: 'Chelsea Loft',
        location: {
            lat: 40.7444883,
            lng: -73.9949465
        }
    },
    {
        title: 'Union Square Open Floor Plan',
        location: {
            lat: 40.7347062,
            lng: -73.9895759
        }
    },
    {
        title: 'East Village Hip Studio',
        location: {
            lat: 40.7281777,
            lng: -73.984377
        }
    },
    {
        title: 'Chinatown New York City',
        location: {
            lat: 40.7180628,
            lng: -73.9961237
        }
    }
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

    var bounds = new google.maps.LatLngBounds();
    var largeInfowindow = new google.maps.InfoWindow({
        maxWidth: 200
    });

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
            icon: 'https://www.google.com/mapfiles/marker.png',


        });

        //To change the colour of the marker colouron interaction through listview or by manually clicking
        google.maps.event.addListener(marker, 'click', function(marker, i) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setIcon('https://www.google.com/mapfiles/marker.png'); // set back to default
            }
            this.setIcon('https://www.google.com/mapfiles/marker_green.png');
        });


        viewModel.locationArray()[i].marker = marker;




        function populateInfoWindow(marker, infowindow, locationItem) {

            // Check to make sure the infowindow is not already opened on this marker.
            if (infowindow.marker != marker) {
                infowindow.setContent('');



                infowindow.marker = marker;
                // Make sure the marker property is cleared if the infowindow is closed.
                infowindow.addListener('closeclick', function() {
                    infowindow.marker = null;
                    //so that the colour of the marker is red again once the infowindow is closed.
                    marker.setIcon('https://www.google.com/mapfiles/marker.png');
                });
                var streetViewService = new google.maps.StreetViewService();
                var radius = 50;
                // In case the status is OK, which means the pano was found, compute the
                // position of the streetview image, then calculate the heading, then get a
                // panorama from that and set the options

                var list;
                var articles;
                var fullList = '<br/><strong>Related NY Times Articles:</strong><br/>';
                var nytimeurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + marker.title +  '&sort=newest&api-key=4c3e33c2b2534f8c958d1c1e6084f75e';
                 $.getJSON(nytimeurl, function(data) {
                        articles = data.response.docs;
                        for (var i = 0; i < articles.length; i++) {
                            var article = articles[i];
                            list = '👉🏻' + '<a href="' + article.web_url + '"">' + article.headline.main + '</a><br/>';
                            fullList = fullList + list;
                        }
                        infowindow.setContent('<div' + '""' + '</div>' +'<div><div id="pano"></div>' + '<div>' + fullList + '</div>');
                        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);

                    })
                    .error(function() {
                        alert("Something went wrong! NYT articles culd not be loaded");
                    });

                function getStreetView(data, status) {
                    if (status == google.maps.StreetViewStatus.OK) {
                        var nearStreetViewLocation = data.location.latLng;
                        var heading = google.maps.geometry.spherical.computeHeading(
                            nearStreetViewLocation, marker.position);
                        // infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>' + '<div>' + "" + '</div>');
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
                // streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
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

}


function mapError() {
    alert("Map could not be loaded at this moment. Please try again");
}




var ViewModel = function() {
    var self = this;
    // for the slide out menu
    self.navIsOpen = ko.observable(false);
    self.closeNav = function() {
        self.navIsOpen(false);
    }
    self.openNav = function() {
        self.navIsOpen(true);
    }

    self.locationArray = ko.observableArray(locations);

    //for searching the locations
    self.showAll = function(variable) {
        for (var i = 0; i < self.locationArray().length; i++) {
            // self.locationArray[i].show(variable);
            if(self.locationArray()[i].marker)
            self.locationArray()[i].marker.setVisible(variable);
        }
    };

    this.inputValue = ko.observable('');
    this.filterLocations = ko.computed(function(){
      var SearchValue = self.inputValue();
      if (SearchValue.length === 0) {
            self.showAll(true);
            return self.locationArray();
          } else {
          var tempArray = [];
            for (var i = 0; i < self.locationArray().length; i++) {
                  if (self.locationArray()[i].title.toLowerCase()
                      .indexOf(SearchValue.toLowerCase()) > -1) {
                      // self.locationArray()[i].show(true);
                      self.locationArray()[i].marker.setVisible(true);
                      tempArray.push(self.locationArray()[i]);
                  } else {
                      // self.locationArray()[i].show(false);
                      self.locationArray()[i].marker.setVisible(false);

                  }
              }
              return tempArray;

          }

    })
    // this.filtersearch = function() {
    //     var SearchValue = this.inputValue();
    //     if (SearchValue.length === 0) {
    //         this.showAll(true);
    //     } else {
    //         for (var i = 0; i < self.locationArray().length; i++) {
    //             if (self.locationArray()[i].title.toLowerCase()
    //                 .indexOf(SearchValue.toLowerCase()) > -1) {
    //                 // self.locationArray()[i].show(true);
    //                 self.locationArray()[i].marker.setVisible(true);
    //             } else {
    //                 // self.locationArray()[i].show(false);
    //                 self.locationArray()[i].marker.setVisible(false);
    //             }
    //         }
    //
    //     }
    // };


    self.selectItem = function(listItem) {
        //pan down infowindow by 55px to keep whole infowindow on screen
        map.panBy(0, -55);
        console.log(listItem);
        google.maps.event.trigger(listItem.marker, 'click');
        map.setZoom(15);
    };



}





var viewModel = new ViewModel();

ko.applyBindings(viewModel);
