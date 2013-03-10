$(document).ready(function(){
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
		//Cancel Button Click Function
	});

	$postButton.click(function(){
		var title = $jobTitle.val();
		var location = $jobLocation.val();
		var desc = $jobDescription.val();
		var pay = $jobPay.val();
		var payPer;
		if(!$jobFlatCheck[0].checked)
			payPer = $jobPayPer.val();
		var timeNum = parseInt($jobDateNum.val());
		var timeType = $jobDateType.val();

		var valid = true;
		if(title==""){
			valid=false;
			$jobTitle.addClass('invalid');
		}
		if(location==""){
			valid=false;
			$jobLocation.addClass('invalid');
		}
		if(desc==""){
			valid=false;
			$jobDescription.addClass('invalid');
		}
		if(pay==""){
			valid=false;
			$jobPay.addClass('invalid');
		}
		if(!$jobFlatCheck[0].checked && payPer==""){
			valid=false;
			$jobPayPer.addClass('invalid');
		}
		if(valid){
			$('.invalid').removeClass('invalid');

			var latLong = codeAddress(location);
			if(latLong != null){
				var lat = latLong.hb;
				var longi = latLong.ib;
				var seconds = new Date().getTime();
				var timeUnit;
				switch(timeType){
					case 'days':
						timeUnit= 86400000;
						break;
					case 'weeks':
						timeUnit= 604800000;
						break;
					case 'months':
						timeUnit= 2629740000;
						break;
				}
				var expiryDate = seconds + (timeNum*timeUnit);

				/*HERE WE POST NOW THAT ALL DATA IS HAD AND VALID*/
				var myJSONObject = {
					"name": title,
					"location": location,
					"lat": lat,
					"long": longi,
					"description":desc,
					"pay":pay,
					"expiry":expiryDate
				}
			}
		}
		else{
			alert("Some fields have been left blank, fill them in and try again");
		}
	});

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
});