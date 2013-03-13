var LOCAL = '';
var REMOTE = 'http://jademap.herokuapp.com';
var BASE_URL = LOCAL;

/*---------------------------------------*/
/*        MAJOR VARIABLES STUFF          */
/*---------------------------------------*/
/*
	"UserData" is user data. JSON Object
	"JobsArray" is current Jobs JSON Object
	currentScreenLevel is current level of screens stacked
	in view slider. Main Screen is = 1
 */
var UserData;
var JobsArray;
var screenLevel = 1;
var $screenStack = [];
var $currentScreen;

var $viewPort = $('#viewPort');
var $loadingOverlay = $('div.loading');
var $openCloser = $("div.openCloser");
var $shifters = $("div.leftMenu, div.mapCanvas");
var $shortCutsContainer = $("#shortCutsContainer");
var theMap;
var $logos = $('nav div.logo');
var $openSubmenu = $('#openSubmenu');
var $submenu = $('div.submenu');




var $mainScreen = $('#MainScreenContainer');
var $secondaryScreens = $('#slideContainer div.sec');
var $screenSlider = $('div.screenSlider');
function openScreen(screen){
	console.log(screen);
	/*goes to the entered screen, valid inputs are
	"Main"
	"Post"
	"UserProfile"
	"MyPosts"
	"MyProfile"
	"MyClaims"
	"ReviewUser"
	 */
	if(screen=="Main"){
		//Go back to Main Screen
		$secondaryScreens.hide();

	}
	var w = $screenSlider.css('width');
	console.log(w);
	w += 360;
	var w = w.toString()+"px";
	console.log(w);
	$screenSlider.css('width',w);
	var newScreenID = "#"+screen+"ScreenContainer"
	$newScreen = $(newScreenID);
	$newScreen.css('display','inline-block');
	$currentScreen = $newScreen;
	var LeftMargin = screenLevel*(-360);
	screenLevel += 1;
	var left = LeftMargin.toString() + "px";
	$screenSlider.css('margin-left',left);
}
function ajax(method, url, data, success, error) {
    var func = function(){};
    $.ajax({
        type: method.toUpperCase(),
        datatype:'json',
        url:url,
        data: data,
        success: success,
        error: error || func
    });
}


function post(url, data, success, error) {
    ajax("POST", url, data, success, error);
}

function put(url, data, success, error) {
    ajax("PUT", url, data, success, error);
}

function remove(url, data, success, error) {
    ajax("DELETE", url, data, success, error);
}
var get = $.get;
function getAllPosts(callback){
	get(BASE_URL+"/posts/",callback);
}


//  GOOGLE MAPS STUFF
function GoogleMap(){
	this.initialize = function(){
		var map = showMap();
		//addMarkersToMap(map);
	}
	var showMap = function(){
		var mapOptions = {
			zoom: 12,
			center: new google.maps.LatLng(43.47,-80.54),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var theMap = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		return theMap;
	}
}
var infowindow = null;
var closeable;
var markers = [];
function populateMap(){
	var l = JobsArray.length;
	var htmlToAdd ='';
	var contentString=[];
	for(var i=0; i<l; i++){
		var thisPost = JobsArray[i];
		var location = new google.maps.LatLng(thisPost.latitude,thisPost.longitude);
	    var marker = new google.maps.Marker({
	        position: location,
	        map: theMap
	    });
		markers[i]=marker;
		contentString[i]= '<strong>'+thisPost.title+'</strong>';
		htmlToAdd += '<div class="shortcut '+i+'"onclick="google.maps.event.trigger(markers['+i+'], \'click\')";" >$'+thisPost.cost+'</div>';
		$shortCutsContainer.html(htmlToAdd);
	}
	for (var j = 0; j < markers.length; j++) {
	    markers[j].j = j;
	    	    google.maps.event.addListener(markers[j], 'click', function() {
		     if(closeable){
			     closeable.close();
		     }
	         this.myinfowindow = new google.maps.InfoWindow({content: contentString[this.j] });
	         this.myinfowindow.open(theMap, this);
		     closeable=this.myinfowindow;
	    });
	}
}



/* ----------------------------------------------------------------- */
/* OFFICIAL START OF CODE TO EXECTUE
/* ----------------------------------------------------------------- */

//LOG IN
//var data = {email:"bro@mobile.com", password:"55555"};
//var mapT = new GoogleMap();
//	mapT.initialize();

var mapOptions = {
	zoom: 12,
	center: new google.maps.LatLng(43.47,-80.54),
	mapTypeId: google.maps.MapTypeId.ROADMAP
}
theMap = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);


var data = {email:"a@a.aaa", password:"123456"};
var setupSuccess = false;
if (window.coords && window.coords.latitude) {
    data.latitude = window.coords.latitude;
    data.longitude = window.coords.longitude;
}
post(BASE_URL+"/login/", data, function(response){
    if (response.success) {
	    UserData =response.data;
	    getAllPosts(function(jobResponse){
		    if (jobResponse.success) {
			    JobsArray = jobResponse.data;
			    setupSuccess = true;
			    console.log(2);
		    }else {
	            alert(jobResponse.message || "Unable to  retrieve posts.");
	            setupSuccess = false;
	        }
	    });
    } else {
        alert(response.message || "Unable to login at this time.");
	    setupSuccess = false;
    }
});
var timeout = setInterval(function(){
	if(setupSuccess){
		console.log($loadingOverlay);
		$loadingOverlay.addClass("hide");
		clearInterval(timeout);
		populateMap();
	}
},750);

//Open/Close the left side menu on the Main Screen
$openCloser.click(function(){
	$shifters.toggleClass("leftOpen");
	console.log($shifters);
});

//slide the search bar down and slide the top part in/out
$logos.click(function(){
	console.log($logos);
	var $topAnmins=$(this).parent().find("div.navCont, div.logo");
	console.log($topAnmins);
	//$(this).to
	console.log($topAnmins);

	$topAnmins.toggleClass('down');
});

//toggle top left menu sliding up/down
$openSubmenu.click(function(){
	$submenu.toggleClass('open');
	console.log($submenu);
});