var $searchBox = $('#topBar input');
var $map = $('#map_canvas > div');
var $searchToolsBox = $('#searchTools');
var $bottomBox = $('#bottomBar');
var spareHeight = $bottomBox.height().toString() +'px';
var spare60 = ($bottomBox.height()+60).toString() +'px';
var $topBar = $('#topBar');

var $jobTitle = $('#bottomBar #title');
var $userLink = $('#userLink');
var $description = $('#description');
var $money = $('#money');
var $perWhat = $('#perWhat');
var $rating = $('#rating');
var $dollar = $("#dollar");
var $kilometer = $("#kilometer");
var $calender = $("#calender");

var $LoToHi = $("#LoToHi");
var $HiToLo = $("#HiToLo");
var infos = new Array();

var $body = $('body');
var markers = new Array();
var itemsArray = new Array();
var activeItem;
var theStuff;
var rawResponse;

function hideSortTools() {
 	document.getElementById("sort_tools").style.display='none';
	document.getElementById("settingsButton").style.display='block';
	document.getElementById("bottom_icon").style.display='none';
 }

 function showSortTools() {
 	document.getElementById("sort_tools").style.display='block';
	document.getElementById("settingsButton").style.display='none';
	document.getElementById("bottom_icon").style.display='block';
	searchRetract();

 }

function searchDropDown(){
		document.getElementById('searchWindow').style.visibility="visible";
		hideSortTools();
	}

function searchRetract(){
	document.getElementById('searchWindow').style.visibility="hidden";
}

function attachSecretMessage(marker, msg, number) {
	var infowindow = new google.maps.InfoWindow(
      { content: msg,
        size: new google.maps.Size(30,50)
      });
	google.maps.event.addListener(marker, 'click', function(){
		infowindow.open(map,marker);
		infos.push(infowindow);
	})
}
function closeInfoWindows(){
			if (infos){
				for (var i in infos){
					infos[i].close();
				}
		}
	}

function getAllPosts(callback){
	get(BASE_URL+"/posts/",callback);
}
function clearMarkers(){

		for (var i = 0; i < 6; i++) {
		    var item = itemsArray[i];
	        var location = new google.maps.LatLng(item.latitude,item.longitude);
		    var marker = new google.maps.Marker({
		        position: location,
		        map: map
		    });
			markers[i]=marker;
		    var j = i + 1;
		    marker.setTitle(j.toString());
			var msg = '<h3>'+itemsArray[i].title+'</h3><p>'+itemsArray[i].description+'</p>';
		    attachSecretMessage(marker,msg , i);
		  }
	}
function initialize() {
	  var myLatlng = new google.maps.LatLng(43.47,-80.54);
	  var mapOptions = {
	    zoom: 12,
	    center: myLatlng,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  }

	  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	  // Add 5 markers to the map at random locations.

	itemsArray = theStuff;
	  for (var i = 0; i < itemsArray.length; i++) {
	    var item = itemsArray[i];
        var location = new google.maps.LatLng(item.latitude,item.longitude);
	    var marker = new google.maps.Marker({
	        position: location,
	        map: map
	    });
		markers[i]=marker;
	    var j = i + 1;
	    marker.setTitle(j.toString());
		  var msg = '<h3>'+itemsArray[i].title+'</h3><p>'+itemsArray[i].description+'</p>';
	    attachSecretMessage(marker, msg, i);
	  }
	activeItem = itemsArray[0];
}
var $shortcuts = $('#resultsScrollChild>div');
function updateSorted(){
	$shortcuts.each(function(i){
		if ($dollar.parent().hasClass("selected")){
			$(this).text("$" + itemsArray[i].cost);
		}else if($calender.parent().hasClass("selected")){
		var date =new Date(itemsArray[i].expiryDate);

			$(this).text(formatDate(date));
		}
		$(this).click(function(){
			clearMarkers();
			closeInfoWindows();
			var msg = '<h3>'+itemsArray[i].title+'</h3><p>'+itemsArray[i].description+'</p>';
			attachSecretMessage(markers[i], msg, i);
			$shortcuts.removeClass('sel');
			$(this).addClass('sel');
			$jobTitle.html(itemsArray[i].title);
			$userLink.html(itemsArray[i].poster);
			$description.html(itemsArray[i].description);
			$money.html(itemsArray[i].cost);
			$perWhat.html(itemsArray[i].payPer);
			$rating.html(itemsArray[i].reviewID);
			google.maps.event.trigger(markers[i], 'click');
			//console.log("fired",itemsArray[i]);
			activeItem = itemsArray[i];
		});
	});
}


$(document).ready(function(){

	//alert($body.height());
	var map = new GoogleMap();
    map.initialize();

	//Get the posts



	var map;

	//Claim a post
	$('#claimWrap div').click(function(){
		put(BASE_URL+"/claimer/"+activeItem.id, null, function(response){
			if(response.success){

			}
			else{
				alert(response.message||"Failed to claim job");
			}
		});
	});



	//set up the maps

	function sort(array, key, ascend){
		if (ascend == null){
			ascend = true;
		}
		array.sort(function(a,b){
			var returnValue = 0;
			switch(key){
				case "cost":
					returnValue = parseFloat(a.cost) - parseFloat(b.cost);
					break;
				case "date":
					//console.log(a.expiryDate);
					returnValue = new Date(a.expiryDate) - new Date(b.expiryDate);
					break;
				/* TODO sort by distance
				case "distance":
					returnValue = abs(parseFloat(a.location.lat) - parseFloat(b.location.lat))
				*/
				default:
					return 0;
			}
			if(!ascend){
				returnValue *= -1;
			}
			return returnValue;
		});
	}


	function toSort(){
		if ($LoToHi.parent().hasClass("selected")){
			if ($dollar.parent().hasClass("selected")){
				sort(itemsArray, "cost");
			}else if ($calender.parent().hasClass("selected")){
				sort(itemsArray, "date");
			}
		}else if($HiToLo.parent().hasClass("selected")){
			if ($dollar.parent().hasClass("selected")){
				sort(itemsArray, "cost", false);
			}else if ($calender.parent().hasClass("selected")){
				sort(itemsArray, "date", false);

			/*for (var i=0; i<itemsArray.length; i++){
				console.log(itemsArray[i].cost);
				console.log(Date(itemsArray[i].expiryDate));
			}*/
		}
	}
}





	





	$dollar.click(function(){
		$dollar.parent().addClass("selected");
		$kilometer.parent().removeClass("selected");
		$calender.parent().removeClass("selected");
		$("#sortParameter").html("Sort by Cost");
		toSort();
		updateSorted();
	});

	$kilometer.click(function(){
		$dollar.parent().removeClass("selected");
		$kilometer.parent().addClass("selected");
		$calender.parent().removeClass("selected");
	});

	$calender.click(function(){
		$dollar.parent().removeClass("selected");
		$kilometer.parent().removeClass("selected");
		$calender.parent().addClass("selected");
		$("#sortParameter").html("Sort by Date");
		toSort();
		updateSorted()
	});

	$LoToHi.click(function(){
		$LoToHi.parent().addClass("selected");
		$HiToLo.parent().removeClass("selected");
		$("#sortHiLo").html("Low to High");
		toSort();
		updateSorted()
	});

	$HiToLo.click(function(){
		$LoToHi.parent().removeClass("selected");
		$HiToLo.parent().addClass("selected");
		$("#sortHiLo").html("High to Low");
		toSort();
		updateSorted()
	});

	$($shortcuts[0]).click();
});

function GoogleMap(){
	this.initialize = function(){
	var map = showMap();
	addMarkersToMap(map);
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

var addMarkersToMap = function(map){
	var mapBounds = new google.maps.LatLngBounds();

	var jobs = rawResponse;
	if(jobs.success){
		for(var i=0; i< jobs.data.length; i++){
			var item = jobs.data[i];
			var latLong = new google.maps.LatLng(item.location.lat,item.location.long);
			var marker = new google.maps.Marker({
			position: latLong,
			map: map
			});
			markers[i]=marker;
		}
	}
    else{
		alert(jobs.message || "could not get jobs");
	}
 }


