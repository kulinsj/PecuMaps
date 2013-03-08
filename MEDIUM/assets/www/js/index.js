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
    document.getElementById("loginbutton").style.background='#02d238'
	document.getElementById("signupbutton").style.background='-webkit-gradient(linear, left top, left bottom, color-stop(0, #02d238), color-stop(1, #67f18b))'
	document.getElementById("confirmpassword").style.display='none'
	}

function activateSignupButton(){
    document.getElementById("signupbutton").style.background='#02d238'
	document.getElementById("loginbutton").style.background='-webkit-gradient(linear, left top, left bottom, color-stop(0, #02d238), color-stop(1, #67f18b))'
	document.getElementById("confirmpassword").style.display='block'
	}