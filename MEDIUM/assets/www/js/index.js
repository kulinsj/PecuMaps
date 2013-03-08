function hideLoadingPage(){
    document.getElementById('loadingpage').style.display="none";
    document.getElementById('loginpage').style.display="block";
}

function delayedHideLoadingPage(){
    window.setTimeout(function() {
	    hideLoadingPage();
	}, 1700);
}

function activateLoginButton(){
    document.getElementById("loginbutton").style.background='-webkit-gradient(linear, left top, left bottom, color-stop(0, #68AFDE), color-stop(1, #8DCCF5))'
	document.getElementById("signupbutton").style.background='-webkit-gradient(linear, left top, left bottom, color-stop(0, #A7D6F4), color-stop(1, #85C7F2))'
	document.getElementById("confirmpassword").style.display='none'
	}

function activateSignupButton(){
    document.getElementById("signupbutton").style.background='-webkit-gradient(linear, left top, left bottom, color-stop(0, #68AFDE), color-stop(1, #8DCCF5))'
	document.getElementById("loginbutton").style.background='-webkit-gradient(linear, left top, left bottom, color-stop(0, #A7D6F4), color-stop(1, #85C7F2))'
	document.getElementById("confirmpassword").style.display='block'
	}