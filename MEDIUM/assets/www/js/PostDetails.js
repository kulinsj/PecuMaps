$(document).ready(function(){

	var data = window.postedData;

	var $title = $('#title');
	var $profileImage = $('#profileImage');
	var $posterName = $('#posterName');
	var $ratingValue = $('#ratingValue');
	var $timeLeftSpan = $('#timeLeftSpan');
	var $payValue = $('#payValue');
	var $perWrap = $('#perWrap');
	var $perWhat = $('#perWhat');
	var $description = $('#description');
	var $claimsActualNum = $('#claimsActualNum');

	function convertUnixTimeLeft(futureTime){
		var now = new Date().getTime();
		var seconds = futureTime-now;
		var numdays = Math.floor((seconds % 31536000) / 86400);
		if (numdays == 1)
			return "1 day left";
		return numdays+" days left";
	}

	if(data){

		data = JSON.parse(data);
		console.log(data.screenName);
		$title.text(data.title);
		$profileImage.html();
		$posterName.text();
		$ratingValue.text();
		$timeLeftSpan.text(convertUnixTimeLeft(parseInt(data.expiryDate)));
		$payValue.html(data.cost);
		if(data.costPer){
			$perWhat.text(data.costPer);
			$perWrap.show();
		}
		$description.text(data.description);
	}
});