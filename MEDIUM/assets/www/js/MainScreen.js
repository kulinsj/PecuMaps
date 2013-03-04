$(document).ready(function(){
	var map = new GoogleMap();
    map.initialize();
});

function GoogleMap(){

this.initialize = function(){
var map = showMap();
}

 var showMap = function(){
var mapOptions = {
zoom: 12,
center: new google.maps.LatLng(43.47,-80.54),
mapTypeId: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

return map;
}
}