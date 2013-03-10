$(document).ready(function(){
	var $back = $('div.topBarLink');
	$back.click(function(){
		goBack();
	});
});

function goBack(){
    if (typeof (navigator.app) !== "undefined") {
        navigator.app.backHistory();
    } else {
        window.history.back();
    }
}