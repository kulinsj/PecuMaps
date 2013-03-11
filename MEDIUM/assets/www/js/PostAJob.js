$(document).ready(function(){
	//login('a@a.aaa', '123456');
	$("#flatCheck").change(function(){
	    $('#flatVanisher').toggle(!this.checked);
	    $("#payPer").prop("disabled", this.checked)
	});
	var $jobTitle = $('#jobTitle');
	var $jobLocation = $('#jobLocation');
	var $jobDescription = $('#jobDescription');
	var $jobPay = $('#jobPay');
	var $jobPayPer = $('#payPer');
	var $jobFlatCheck = $('#flatCheck');
	var $cancel = $('#cancelButton');
	var $postButton = $('#postButton');
	var $jobDateNum = $('#dateNum');
	var $jobDateType = $('#dateType');
	//geocoder = new google.maps.Geocoder();
	var $vanisher = $('#flatVanisher');
	$jobFlatCheck.change(function(){
		if(this.checked) {
			$vanisher.hide();
		}
		else{
			$vanisher.show();
		}
	});
	$jobFlatCheck.change();

	$cancel.click(function(){
		goBack();
	});

	var $submitForm=$('#postForm');
	$postButton.click(function(){
		console.log('ye');
		$submitForm.submit();
	});
	$submitForm.submit(function(e){
	    var data = e.formData;
		var start = new Date().getTime();
		var timeUnit = $jobDateType.val();
		var timeMultiple;
		var timeNumber = parseInt($jobDateNum.val());
		switch(timeUnit){
			case "weeks":
				timeMultiple = 604800000;
				break;
			case "days":
				timeMultiple = 86400000;
				break;
			case "months":
				timeMultiple = 2600000000;
				break;
		}
		var expiry = start+timeMultiple*timeNumber;
		data.expiryDate = expiry;
	    getLocation(data.address, function(loc){
	        $("#post-address").toggleClass('invalid', !loc);
	        if (loc) {
	            data.longitude = loc.longitude;
	            data.latitude = loc.latitude;
	            data.address = loc.address;
	            post(BASE_URL+"/posts/" + data.title, data, function(response){
	                if (response.success) {
	                    alert("Job is posted");
		                goTo("MyPostDetails.html",data);
	                } else {
	                    alert(response.message || "Unable to login at this time.");
	                }
	            });
	        }
	    });
	    return false;
	});
	navigator.geocoder = new google.maps.Geocoder();
	function codeAddress(address) {
	    geocoder.geocode( { 'address': address}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
		      return results[0].geometry.location;
	      } else {
	        alert("Geocode was not successful for the following reason: " + status);
		    return null;
	      }
	    });
	  }
	function getLocation(address, callback) {
	    navigator.geocoder.geocode( { 'address': address}, function(results, status) {
	        if (status == google.maps.GeocoderStatus.OK) {
	            var geo = results[0].geometry.location;
	            callback({
	                address: results[0].formatted_address,
	                latitude: geo.ib,
	                longitude: geo.jb
	            });
	        } else {
	            alert("Cannot find location, please provide a valid address");
	            callback(null);
	        }
	    });
	}

	function getCurrentLocation(callback) {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(pos){
	            var coords = {
	                latitude: pos.coords.latitude,
	                longitude: pos.coords.longitude
	            };
	            if (localStorage) {
	                localStorage.setItem("latitude", coords.latitude);
	                localStorage.setItem("longitude", coords.longitude);
	            }
	            window.coords = coords;
	            if (callback) {
	                callback(coords);
	            }
	        });
	    } else {
	        alert("Geolocation is not support on your browser, update it");
	        if(callback) callback(null);
	    }
	}
});