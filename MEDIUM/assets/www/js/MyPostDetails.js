console.log('2');

/*window.data = localStorage.getItem("postedData");
localStorage.removeItem("postedData");*/
var $title = $('#title');
var $payValue = $('#payValue');
var $perWrap = $('#perWrap');
var $perWhat = $('#perWhat');
var $timeLeftSpan = $('#timeLeftSpan');
var $location = $('#location');
var $description = $('#description');
var $claimsActualNum = $('#claimsActualNum');
var $claimsUsersWrap = $('#claimsUsersWrap');

var data;
if(window.postedData){
	//localStorage.removeItem("postedData");
	console.log(window.postedData);
	data = window.postedData;
	$title.html(data.title);
	$payValue.html(data.cost);
	if(data.costPer){
		$perWhat.html(data.costPer);
		$perWrap.show();
	}
	$timeLeftSpan.html(daysLeft(data.expiryDate, 'Ends'));
	$location.html(data.address);
	$description.html(data.description);
	//TODO CLAIMS
}
else{
	alert('no passed data found');
}
