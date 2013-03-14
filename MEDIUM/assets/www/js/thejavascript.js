var LOCAL = '';
var REMOTE = 'http://jademap.herokuapp.com';
var BASE_URL = LOCAL;

/*---------------------------------------*/
/*        MAJOR VARIABLES STUFF          */
/*---------------------------------------*/
/*
	"UserData" is user data. JSON Object
	"JobsArray" is current Jobs JSON Object
	"UserPosts" is array of JSON Objects
	currentScreenLevel is current level of screens stacked
	in view slider. Main Screen is = 0
 */
var UserData;
var UserPosts;
var JobsArray;



var $viewPort = $('#viewPort');
var $loadingOverlay = $('div.loading');
var $openCloser = $("div.openCloser");
var $shifters = $("div.leftMenu, div.mapCanvas, div.openCloser");
var $shortCutsContainer = $("#shortCutsContainer");
var theMap;
var $logos = $('nav div.logo');
var $openSubmenu = $('div.openSubmenu');
var $submenu = $('div.submenu');
var $myPosts = $('#myposts ul');
var $topBarStuffs = $("div.navCont, div.logo");
var $MenuClosers = $('div.topLeftCloser');

var $PostAnItemScreen = $('#PostScreenContainer');
var $myPostsScreen = $('#MyPostsScreenContainer');
var $myClaimsScreen = $('#MyClaimsScreenContainer');
var $myProfileScreen = $('#MyProfileScreenContainer');
var $backButtons = $('div.backBtn');
var $refreshButtons = $('div.refreshBtn');

var screenLevel = 0;
var $currentScreen;
var $screenStack = [];
var $mainScreen = $('#MainScreenContainer');
var $secondaryScreens = $('#slideContainer div.sec');
var $screenSlider = $('div.screenSlider');

var myProfileAt = 0;
var myClaimsAt = 0;
var myPostsAt = 0;
var postAPostAt = 0;
function openScreen(screen){
	/*goes to the entered screen, valid inputs are
	"Main"
	"Post"
	"UserProfile"
	"MyPosts"
	"MyProfile"
	"MyClaims"
	"ReviewUser"
	 */
	$submenu.removeClass("open");
	$MenuClosers.removeClass("open");
	if(screen=="Main"){
		//Go back to Main Screen
		$secondaryScreens.hide();
		$screenSlider.css('margin-left','0');
	}
	switch(screen){
		case "Main":
			break;
		case "Post":
			if(!postAPostAt){
				screenLevel += 1;
				postAPostAt = $screenStack.length;
				$screenStack[$screenStack.length] = $PostAnItemScreen;
				var margin = 360*screenLevel;
				var posLeft	=  margin.toString()+"px";
				var negLeft = "-" + posLeft;
				$screenSlider.css('margin-left', negLeft);
				$PostAnItemScreen.css('margin-left',posLeft);
				$PostAnItemScreen.show();
			}
			else{
				backToScreen(postAPostAt);
			}
			break;
		case "UserProfile":
				///////////////////////////
				///TODO////////////////
				///////////////////////////
			break;
		// GO TO MY POSTS SCREEN
		case "MyPosts":
			if(!myPostsAt){
				screenLevel += 1;
				myPostsAt = $screenStack.length;
				$screenStack[$screenStack.length] = $myPostsScreen;
				var margin = 360*screenLevel;
				var posLeft	=  margin.toString()+"px";
				var negLeft = "-" + posLeft;
				$screenSlider.css('margin-left', negLeft);
				$myPostsScreen.css('margin-left',posLeft);
				$myPostsScreen.show();
			}
			else{
				backToScreen(myPostsAt);
			}
			break;
		case "MyProfile":
			if(!myProfileAt){
				screenLevel += 1;
				myProfileAt = $screenStack.length;
				$screenStack[$screenStack.length] = $myProfileScreen;
				var margin = 360*screenLevel;
				var posLeft	=  margin.toString()+"px";
				var negLeft = "-" + posLeft;
				$screenSlider.css('margin-left', negLeft);
				$myProfileScreen.css('margin-left',posLeft);
				$myProfileScreen.show();
			}
			else{
				backToScreen(myProfileAt);
			}
			break;
		case "MyClaims":
			if(!myClaimsAt){
				screenLevel += 1;
				myClaimsAt = $screenStack.length;
				$screenStack[$screenStack.length] = $myClaimsScreen;
				var margin = 360*screenLevel;
				var posLeft	=  margin.toString()+"px";
				var negLeft = "-" + posLeft;
				$screenSlider.css('margin-left', negLeft);
				$myClaimsScreen.css('margin-left',posLeft);
				$myClaimsScreen.show();
			}
			else{
				backToScreen(myClaimsAt);
			}
			break;
		case "Review User":
			break;
	}
}
function backAScreen(){
	screenLevel -= 1;
	var margin = 360*screenLevel;
	var negLeft = "-" + margin.toString()+"px";
	$screenSlider.css('margin-left', negLeft);
	var timeoutClear = setInterval(function(){
		clearInterval(timeoutClear);
		$screenStack[$screenStack.length-1].hide();
		$screenStack.pop();
	},600);
}
function backToScreen(index){
	var toKill = screenLevel - index -1;

	var currentScreen = $screenStack[screenLevel];
	var B = $screenStack.splice(index+1, toKill);
	var A = $screenStack.splice(0,index+1);

	var timeoutC = setInterval(function(){
		killSpecificScreens(currentScreen);
		$loadingOverlay.addClass("hide");
		clearInterval(timeoutC);
	},600);
	if(B.length > 0){
		for(var j=0; j<B.length; j++){
			killSpecificScreens(B[j]);
		}
	}
	screenLevel -=(B.length +1);
	var posLeft	=  (360*screenLevel).toString()+"px";
	var negLeft = "-" + posLeft;
	$screenSlider.css({'transition': 'margin-left 0.5s', '-webkit-transition': 'margin-left 0.5s', '-moz-transition': 'margin-left 0.5s'});
	$screenSlider.css('margin-left', negLeft);
	$screenStack = A;
}
function killSpecificScreens(screen){
	switch(screen.attr('id')){
		case "PostScreenContainer":
			postAPostAt = 0;
			screen.hide();
			break;
		case "MyPostsScreenContainer":
			myPostsAt = 0;
			screen.hide();
			break;
		case "MyProfileScreenContainer":
			myProfileAt = 0;
			screen.hide();
			break;
		case "MyClaimsScreenContainer":
			myClaimsAt = 0;
			screen.hide();
			break;
		default:
			screen.addClass('dying');
			screen.parent().remove('div.dying');
	}
}

//SERVICE COMMUNICATION STUFF

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

function getUsersPosts(screenName, callback){
	get(BASE_URL+"/posts/user/"+screenName, callback);
}

function refreshEverything(){
	getUsersPosts(UserData.screenName, function(response){
        if(response.success){
	        var toAppend ='';
            for(var i = 0; i<response.data.length; i++){
                var post = response.data[i];
			    usersPosts[post.title]=post;
                var numClaims = post.claimers.length;
                var s ='';
                if(numClaims==1){
                    s='s';
                }
                var appendable = '<li class="feed_item">\
                                        <article class="posts_article">\
                                            <span class="title">'+post.title+'</span>\
                                            <p class="description">'+post.description+'</p>\
                                            <span class="time_left">'+daysLeft(post.expiryDate, "Ends")+'</span>\
                                            <span class="claims">'+numClaims+' claim'+s+'</span>\
                                        </article>\
                                    </li>';
	            toAppend+=appendable;
            }
	        $myPosts.html(toAppend);
        }
        else{
            alert(response.message||"failed to retrieve user's posts");
        }
    });
}


function daysLeft(date, notEndPrefix) {
    var then = new Date(date),
        thatTime = then.getTime(),
        now = Date.now(),
        diff = Math.round((thatTime - now) / 1000);
    if (thatTime === 0) {           // No expiry
        return "";
    } else if (diff < 0) {      // Already expired
        return "Already finished.";
    } else {                    // Time left
        if (diff < 60) {
            var left = diff%60;
            return notEndPrefix + " in about " + left + " second" + (left==1?"":"s");
        } else if (diff < 60 * 60) {
            var left = Math.floor((diff/60)%(60 * 60));
            return notEndPrefix + " in about " + left + " minute" + (left==1?"":"s");
        } else if (diff < 60 * 60 * 24) {
            var left = Math.floor((diff/(60*60))%(60 * 60 * 24));
            return notEndPrefix + " in about " + left + " hour" + (left==1?"":"s");
        } else if (diff < 60 * 60 * 24 * 7) {
            var left = Math.floor((diff/(60*60*24))%(60 * 60 * 24 * 7));
            return notEndPrefix + " in about " + left + " day" + (left==1?"":"s");
        } else {
            var m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            return notEndPrefix + " on " + m[then.getMonth()] + " " + then.getDate() + ", " + then.getFullYear();
        }
    }
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
//var mapT = new GoogleMap();
//	mapT.initialize();

var mapOptions = {
	zoom: 12,
	center: new google.maps.LatLng(43.47,-80.54),
	mapTypeId: google.maps.MapTypeId.ROADMAP
}
theMap = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

//var data = {email:"bro@mobile.com", password:"55555"};
var data = {email:"a@a.aaa", password:"123456"};
var setupSuccess = false;
if (window.coords && window.coords.latitude) {
    data.latitude = window.coords.latitude;
    data.longitude = window.coords.longitude;
}
var usersPosts = {};

post(BASE_URL+"/login/", data, function(response){
    if (response.success) {
	    UserData =response.data;
	    getAllPosts(function(jobResponse){
		    if (jobResponse.success) {
			    JobsArray = jobResponse.data;
			    setupSuccess = true;
		    }else {
	            alert(jobResponse.message || "Unable to  retrieve posts.");
	            setupSuccess = false;
	        }
	    });
	    getUsersPosts(UserData.screenName, function(response){
	    	if(response.success){
	    		for(var i = 0; i<response.data.length; i++){
	    			var post = response.data[i];
				    usersPosts[post.title]=post;
	    			var numClaims = post.claimers.length;
	    			var s ='';
	    			if(numClaims==1){
	    				s='s';
	    			}
	    			var appendable = '<li class="feed_item">\
	    									<article class="posts_article">\
	    										<span class="title">'+post.title+'</span>\
	    										<p class="description">'+post.description+'</p>\
	    										<span class="time_left">'+daysLeft(post.expiryDate, "Ends")+'</span>\
	    										<span class="claims">'+numClaims+' claim'+s+'</span>\
	    									</article>\
	    								</li>';
	    			$myPosts.append(appendable);
	    		}
	    	}
	    	else{
	    		alert(response.message||"failed to retrieve user's posts");
	    	}
	    });
    } else {
        alert(response.message || "Unable to login at this time.");
	    setupSuccess = false;
    }
});
var timeout = setInterval(function(){
	if(setupSuccess){
		$loadingOverlay.addClass("hide");
		clearInterval(timeout);
		populateMap();
	}
},750);
var $PostsUL = $('#myposts ul');
$PostsUL.delegate('li', "click", function(){
	var key = $(this).find('span.title').html();
	var data = items[key];
	//goTo("MyPostDetails.html", data);
});

//start the screen stack
$screenStack[0] = $mainScreen;



//END OF INITIAL SETUP

//Open/Close the left side menu on the Main Screen
$openCloser.click(function(){
	$shifters.toggleClass("leftOpen");
});

//slide the search bar down and slide the top part in/out
$logos.click(function(){
	/*var $topAnmins=$(this).parent().find("div.navCont, div.logo");
	$topAnmins.toggleClass('down');*/
	$topBarStuffs.toggleClass('down');
});

//toggle top left menu sliding up/down
$openSubmenu.click(function(){
	var nowNav =$(this).parent().parent().parent().parent();
	nowNav.siblings('div.submenu').toggleClass('open');
	nowNav.siblings('div.topLeftCloser').toggleClass('open');

});
$MenuClosers.click(function(){
	$(this).siblings('.open').removeClass('open');
	$(this).removeClass('open');
});

//set up all back buttons
$backButtons.click(function(){
	backAScreen();
});

$refreshButtons.click(function(){
	refreshEverything();
});


/* ---------------------------------------- */
/*      SECONDARY SETUP                     */
/* ---------------------------------------- */
