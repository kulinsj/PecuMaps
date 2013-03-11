function hideLoadingPage(){
    document.getElementById('loadingpage').style.display="none";
    document.getElementById('loginpage').style.display="block";
}

function delayedHideLoadingPage(){
    window.setTimeout(function() {
	    hideLoadingPage();
	}, 1700);
}


$().ready(function(){
	var $loginbutton = $("#loginbutton");
	var $signupbutton = $("#signupbutton");
	var $confirmpassword = $("#confirmpassword");
	var $goBtn = $("#goBtn");
	var $goLink = $("#goLink");

	$loginbutton.click(function(){
		$loginbutton.addClass('selected');
		$signupbutton.removeClass('selected');
		$confirmpassword.css("display", "none");
	});

	$signupbutton.click(function(){
		$signupbutton.addClass('selected');
		$loginbutton.removeClass('selected');
		$confirmpassword.css("display", "block");
	});

	$goBtn.click(function(){
		if ($loginbutton.hasClass('selected')){
			$goLink.attr("href", "MainScreen.html");
		}else{
			$goLink.attr("href", "UserDetail.html");
		}
	});

});