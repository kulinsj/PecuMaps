/*function hideLoadingPage(){
    document.getElementById('loadingpage').style.display="none";
    document.getElementById('loginpage').style.display="block";
}

function delayedHideLoadingPage(){
    window.setTimeout(function() {
	    hideLoadingPage();
	}, 0);
}

function activateLoginButton(){
    document.getElementById("loginbutton").style.background='#02d238'
	document.getElementById("signupbutton").style.background='-moz-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(239,239,239,1) 60%,rgba(225,223,226,1) 100%);'
	document.getElementById("confirmpassword").style.display='none'
	}

function activateSignupButton(){
    document.getElementById("signupbutton").style.background='#02d238'
	document.getElementById("loginbutton").style.background='-moz-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(239,239,239,1) 60%,rgba(225,223,226,1) 100%);'
	document.getElementById("confirmpassword").style.display='block'
	}
*/
$().ready(function(){
	var $loginbutton = $("#loginbutton");
	var $signupbutton = $("#signupbutton");
	var $confirmpassword = $("#confirmpassword");

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
});