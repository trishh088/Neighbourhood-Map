var starter_places [

    ['NewYork1', 40.784513, -73.976630, 4],
   ['NewYork2', 40.707522, -74.037055, 4]
]

var ViewModel = function() {
  //closing the nav bar
  this.closeNav = function() {
    closeNav: ko.observable(document.getElementById("main").style.marginLeft = "0px"),
    ko.observable(document.getElementById("mySidenav").style.width = "0"),
    ko.observable(document.getElementById("map").style.marginLeft = "0"),
    ko.observable(document.body.style.backgroundColor = "#1F2C40")
  }
  //opening the nav bar
  this.openNav = function() {
    openNav: ko.observable(document.getElementById("main").style.marginLeft = "220px"),
    ko.observable(document.getElementById("mySidenav").style.width = "220px"),
    ko.observable(document.getElementById("map").style.marginLeft = "220px"),
    ko.observable(document.body.style.backgroundColor = "rgba(0,0,0,0.4)")
  }

  //for taking the city input
  this.city = function() {
    //linking input to google map
    ko.observable(new google.maps.places.SearchBox(input));
  }
  //for area and cuisine input
  this.area = ko.observable("");
  this.cuisine = ko.observable("");

  // var NameLatLong = ko.observableArray([
  //   {
  //     name: ,
  //     latitude:,
  //     longitude:
  //   }
  // ]);
}
ko.applyBindings(new ViewModel());
