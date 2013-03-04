var TheJobs;
var markers = new Array();
var itemsArray = new Array;

$(document).ready(function(){
	var $dollar = $("#dollar");
	var $kilometer = $("#kilometer");
	var $calender = $("#calender");

	var $LoToHi = $("#LoToHi");
	var $HiToLo = $("#HiToLo");


	var $body = $('body');
	//alert($body.height());
	//var map = new GoogleMap();
    //map.initialize();

	initialize();
	var map;


	function initialize() {
	  var myLatlng = new google.maps.LatLng(43.47,-80.54);
	  var mapOptions = {
	    zoom: 12,
	    center: myLatlng,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  }

	  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	  // Add 5 markers to the map at random locations.
	var hardCodedJobs= '{ "success": true, "data": [ { "type":"0", "poster":"BillyRayCharles", "reviewID":"90", "name":"Tune my Guitars", "description":"I have got about 50 guitars that all need to be tuned for an event by this Thursday", "cost":"3", "payPer":"Guitar", "location":{ "lat":"43.479073", "long":"-80.525551", "readable":"316 King St N, Waterloo, ON" }, "postDate":"1358348828", "expiryDate":"1358953628", "claims": { "user": "JohnK", "user": "TomSun", "user": "MattNg", "user": "FeyiA", "user": "AftadZ" } }, { "type":"0", "poster":"AnnaHeemes", "reviewID":"96", "name":"Fix My Lawnmower", "description":"I do not know what is wrong with it. It will not start at all. It is a Craftsman 21 inch, 160cc machine", "cost":"75", "payPer":"flat", "location":{ "lat":"43.457047", "long":"80.554708", "readable":"430 Midwood Cres, Waterloo, On" }, "postDate":"1361632028", "expiryDate":"1364051228", "claims": { "user": "JohnK", "user": "MattNg" } }, { "type":"0", "poster":"JanKulinski", "reviewID":"91", "name":"Cook and deliver dinner", "description":"Looking for someone within walking distance to cook me dinner on Monday-Thursday. Nothing too spicy or fishy.", "cost":"10", "payPer":"dinner", "location":{ "lat":"43.462062", "long":"-80.541340", "readable":"271 Westcourt Pl, Waterloo, On" }, "postDate":"1362321848", "expiryDate":"1365000248", "claims": { "user": "BillyRayCharles" } }, { "type":"0", "poster":"StevenWen", "reviewID":"97", "name":"Come Play Board Games", "description":"We have got lots of games to choose from. Pandemic, Ticket to Ride, Betrayal, Anomia, Dixit, Escape, BattleStar Gallactica and lots more.", "cost":"0", "payPer":"flat", "location":{ "lat":"43.469008", "long":"-80.569890", "readable":"24 Gatestone Blvd, Waterloo, ON" }, "postDate":"1362062648", "expiryDate":"1364481848", "claims": { "user": "JohnK", "user": "TomSun", "user": "BillyRayCharles" } }, { "type":"0", "poster":"WaterlooFeds", "reviewID":"93", "name":"Volunteers Needed", "description":"Volunteers needed to assemble seating and decorations for the Snow Festival. Please come to the SLC ", "cost":"0", "payPer":"flat", "location":{ "lat":"43.471616", "long":"-80.545417", "readable":"SLC Great Hall, Ring Road, Waterloo,On" }, "postDate":"1361371448", "expiryDate":"1362581048", "claims": { "user": "JohnK", "user": "TomSun", "user": "MattNg", "user": "FeyiA", "user": "AftadZ", "user": "BillyRayCharles", "user": "BobJou", "user": "AmandaGretsky", "user": "JoshJones", "user": "JosephKevin", "user": "MorganFreeman" } }, { "type":"0", "poster":"RogerFederer", "reviewID":"98", "name":"Ball Picker", "description":"Looking for healthy and passionate youths to pick tennis balls off the court", "cost":"100", "payPer":"day", "location":{ "lat":"43.473229", "long":"-80.524335", "readable":"Co-op and Career Center, Waterloo, On" }, "postDate":"1362062648", "expiryDate":"1363358648", "claims": { "user": "JohnK", "user": "AftadZ", "user": "BillyRayCharles" } }, { "type":"0", "poster":"LoisDane", "reviewID":"93", "name":"Library Shelving", "description":"Volunteers needed for shelving books for the library", "cost":"0", "payPer":"flat", "location":{ "lat":"43.471968", "long":"-80.524056", "readable":"150 King Street West, Waterloo, On" }, "postDate":"1362235448", "expiryDate":"1364913848", "claims": { "user": "MattNg", "user": "FeyiA", "user": "AftadZ" } }, { "type":"0", "poster":"FranciscoDestinee", "reviewID":"95", "name":"Shovel the sidewalk", "description":"Looking for someone to keep my sidewalk shovelled this winter. I will give you $20 each time you have to come out.", "cost":"20", "payPer":"shovelling", "location":{ "lat":"43.469493", "long":"-80.523562", "readable":"170 King Street West, Waterloo, On" }, "postDate":"1361630648", "expiryDate":"1363272248", "claims": { "user": "TomSun", "user": "MattNg", "user": "FeyiA" } }, { "type":"0", "poster":"JamesMatador", "reviewID":"90", "name":"Access Database Setup", "description":"Need IT professional for Database setup for Microsoft Access.", "cost":"100", "payPer":"setup", "location":{ "lat":"43.473791", "long":"-80.531631", "readable":"University and Albert, Waterloo, On" }, "postDate":"1360853048", "expiryDate":"1362667448", "claims": { "user": "JohnK" } }, { "type":"0", "poster":"JustinDoaug", "reviewID":"96", "name":"SEO Expertise", "description":"Need expert on search engine optimization to work on our new website. Must have 3-5 years of experience working in SEO", "cost":"120", "payPer":"day", "location":{ "lat":"43.476158", "long":"-80.524764", "readable":"King and University, Waterloo, On" }, "postDate":"1360248248", "expiryDate":"1362494648", "claims": { "user": "JohnK", "user": "BillyRayCharles" } } ] }';
	var jobs = jQuery.parseJSON(hardCodedJobs);

	itemsArray = jobs.data;


	TheJobs = jobs;
	  for (var i = 0; i < 9; i++) {
	    var item = jobs.data[i];
        var location = new google.maps.LatLng(item.location.lat,item.location.long);
	    var marker = new google.maps.Marker({
	        position: location,
	        map: map
	    });
		markers[i]=marker;
	    var j = i + 1;
	    marker.setTitle(j.toString());
	    attachSecretMessage(marker, jobs.data[i].name, i);
	  }

	function attachSecretMessage(marker, msg, number) {
	  var infowindow = new google.maps.InfoWindow(
	      { content: msg,
	        size: new google.maps.Size(30,50)
	      });
	  google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map,marker);
	  });
	}
}

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
					console.log(a.expiryDate);
					returnValue = new Date(parseInt(a.expiryDate.substr(6))) - new Date(parseInt(b.expiryDate.substr(6)));
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

	var $shortcuts = $('#resultsScrollChild>div');

	function updateSorted(){
		$shortcuts.each(function(i){
			if ($dollar.parent().hasClass("selected")){
				$(this).html("$" + itemsArray[i].cost);
			}else if($calender.parent().hasClass("selected")){
				console.log('heh',itemsArray[i].expiryDate);
				var date = formatDate(new Date(itemsArray[i].expiryDate));
				console.log(date);
				$(this).text(date);
			}
			$(this).click(function(){
				$shortcuts.removeClass('sel');
				$(this).addClass('sel');
				$jobTitle.html(itemsArray[i].name);
				$userLink.html(itemsArray[i].poster);
				$description.html(itemsArray[i].description);
				$money.html(itemsArray[i].cost);
				$perWhat.html(itemsArray[i].payPer);
				$rating.html(itemsArray[i].reviewID);
				google.maps.event.trigger(markers[i], 'click');
			});
		});
	}
	updateSorted();

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
/*
	$searchBox.focus(function(){
		$topBar.animate({
		    height: spare60
		  }, 600, function() {
		    // Animation complete.
		  });
		$bottomBox.animate({
		    height: '0'
		  }, 600, function() {
		    // Animation complete.
		  });
	});
	$topBar.focusout(function(){
		$topBar.animate({
		    height: '60px'
		  }, 600, function() {
		    // Animation complete.
		  });
		$bottomBox.animate({
		    height: spareHeight
		  }, 600, function() {
		    // Animation complete.
		  });
	});
*/
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
	var hardCodedJobs= '{ "success": true, "data": [ { "type":"0", "poster":"BillyRayCharles", "reviewID":"12", "name":"Tune my Guitars", "description":"I have got about 50 guitars that all need to be tuned for an event by this Thursday", "cost":"3", "payPer":"Guitar", "location":{ "lat":"43.479073", "long":"-80.525551", "readable":"316 King St N, Waterloo, ON" }, "postDate":"1358348828", "expiryDate":"1358953628", "claims": { "user": "JohnK", "user": "TomSun", "user": "MattNg", "user": "FeyiA", "user": "AftadZ" } }, { "type":"0", "poster":"AnnaHeemes", "reviewID":"8", "name":"Fix My Lawnmower", "description":"I do not know what is wrong with it. It will not start at all. It is a Craftsman 21 inch, 160cc machine", "cost":"75", "payPer":"flat", "location":{ "lat":"43.457047", "long":"80.554708", "readable":"430 Midwood Cres, Waterloo, On" }, "postDate":"1361632028", "expiryDate":"1364051228", "claims": { "user": "JohnK", "user": "MattNg" } }, { "type":"0", "poster":"JanKulinski", "reviewID":"25", "name":"Cook and deliver dinner", "description":"Looking for someone within walking distance to cook me dinner on Monday-Thursday. Nothing too spicy or fishy.", "cost":"10", "payPer":"dinner", "location":{ "lat":"43.462062", "long":"-80.541340", "readable":"271 Westcourt Pl, Waterloo, On" }, "postDate":"1362321848", "expiryDate":"1365000248", "claims": { "user": "BillyRayCharles" } }, { "type":"0", "poster":"StevenWen", "reviewID":"4", "name":"Come Play Board Games", "description":"We have got lots of games to choose from. Pandemic, Ticket to Ride, Betrayal, Anomia, Dixit, Escape, BattleStar Gallactica and lots more.", "cost":"0", "payPer":"flat", "location":{ "lat":"43.469008", "long":"-80.569890", "readable":"24 Gatestone Blvd, Waterloo, ON" }, "postDate":"1362062648", "expiryDate":"1364481848", "claims": { "user": "JohnK", "user": "TomSun", "user": "BillyRayCharles" } }, { "type":"0", "poster":"WaterlooFeds", "reviewID":"76", "name":"Volunteers Needed", "description":"Volunteers needed to assemble seating and decorations for the Snow Festival. Please come to the SLC ", "cost":"0", "payPer":"flat", "location":{ "lat":"43.471616", "long":"-80.545417", "readable":"SLC Great Hall, Ring Road, Waterloo,On" }, "postDate":"1361371448", "expiryDate":"1362581048", "claims": { "user": "JohnK", "user": "TomSun", "user": "MattNg", "user": "FeyiA", "user": "AftadZ", "user": "BillyRayCharles", "user": "BobJou", "user": "AmandaGretsky", "user": "JoshJones", "user": "JosephKevin", "user": "MorganFreeman" } }, { "type":"0", "poster":"RogerFederer", "reviewID":"8", "name":"Ball Picker", "description":"Looking for healthy and passionate youths to pick tennis balls off the court", "cost":"100", "payPer":"day", "location":{ "lat":"43.473229", "long":"-80.524335", "readable":"Co-op and Career Center, Waterloo, On" }, "postDate":"1362062648", "expiryDate":"1363358648", "claims": { "user": "JohnK", "user": "AftadZ", "user": "BillyRayCharles" } }, { "type":"0", "poster":"LoisDane", "reviewID":"18", "name":"Library Shelving", "description":"Volunteers needed for shelving books for the library", "cost":"0", "payPer":"flat", "location":{ "lat":"43.471968", "long":"-80.524056", "readable":"150 King Street West, Waterloo, On" }, "postDate":"1362235448", "expiryDate":"1364913848", "claims": { "user": "MattNg", "user": "FeyiA", "user": "AftadZ" } }, { "type":"0", "poster":"FranciscoDestinee", "reviewID":"8", "name":"Shovel the sidewalk", "description":"Looking for someone to keep my sidewalk shovelled this winter. I will give you $20 each time you have to come out.", "cost":"20", "payPer":"shovelling", "location":{ "lat":"43.469493", "long":"-80.523562", "readable":"170 King Street West, Waterloo, On" }, "postDate":"1361630648", "expiryDate":"1363272248", "claims": { "user": "TomSun", "user": "MattNg", "user": "FeyiA" } }, { "type":"0", "poster":"JamesMatador", "reviewID":"8", "name":"Access Database Setup", "description":"Need IT professional for Database setup for Microsoft Access.", "cost":"100", "payPer":"setup", "location":{ "lat":"43.473791", "long":"-80.531631", "readable":"University and Albert, Waterloo, On" }, "postDate":"1360853048", "expiryDate":"1362667448", "claims": { "user": "JohnK" } }, { "type":"0", "poster":"JustinDoaug", "reviewID":"8", "name":"SEO Expertise", "description":"Need expert on search engine optimization to work on our new website. Must have 3-5 years of experience working in SEO", "cost":"120", "payPer":"day", "location":{ "lat":"43.476158", "long":"-80.524764", "readable":"King and University, Waterloo, On" }, "postDate":"1360248248", "expiryDate":"1362494648", "claims": { "user": "JohnK", "user": "BillyRayCharles" } } ] }';
	var jobs = jQuery.parseJSON(hardCodedJobs);
	TheJobs = jobs;
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
		//map.fitBounds(mapBounds);
	}
    else{
		alert(jobs.message || "could not get jobs");
	}
 }


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