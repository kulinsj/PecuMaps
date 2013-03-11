var data = localStorage.getItem("postedData");

var $title = $('#title');
var $payValue = $('#payValue');
var $perWrap = $('#perWrap');
var $perWhat = $('#perWhat');
var $timeLeftSpan = $('#timeLeftSpan');
var $location = $('#location');
var $description = $('#description');
var $claimsActualNum = $('#claimsActualNum');
var $claimsUsersWrap = $('#claimsUsersWrap');
/*var $ = $('#');*/


function convertUnixTimeLeft(futureTime){
	var now = new Date().getTime();
	var seconds = futureTime-now;
	var numdays = Math.floor((seconds % 31536000) / 86400);
	if (numdays == 1)
		return "1 day left";
	return numdays+" days left";
}

if(data){
	localStorage.removeItem("postedData");
	data = JSON.parse(data);
	console.log(data.screenName);
	$title.html(data.title);
	$payValue.html(data.cost);
	if(data.costPer){
		$perWhat.html(data.costPer);
		$perWrap.show();
	}
	$timeLeftSpan.html(convertUnixTimeLeft(parseInt(data.expiryDate)));
	$location.html(data.address);
	$description.html(data.description);

}
else{
	alert('no passed data found');
}
