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
	var $loginbutton = $("#loginBtn");
	var $signupbutton = $("#signupBtn");
	var $confirmpassword = $("#confirmpassword");
	var $goBtn = $("#goBtn");
	var $goLink = $("#goLink");
	$confirmpassword.prop("disabled", true);
	$loginbutton.click(function(){

		$loginbutton.addClass('selected');
		$signupbutton.removeClass('selected');
		$confirmpassword.css("display", "none");
		$confirmpassword.prop("disabled", true);
	});

	$signupbutton.click(function(){
		$signupbutton.addClass('selected');
		$loginbutton.removeClass('selected');
		$confirmpassword.css("display", "block");
		$confirmpassword.prop("disabled", false);
	});

	$goBtn.click(function(){
		//window.location = "MainScreen.html";
		$('#credentialForm').submit();
		console.log(3);
	});
	$('#credentialForm').submit(function(event){
		console.log(1);
		var data = event.formData;
		post(BASE_URL+"/login/", data, function(response){
			console.log(2);
			if (response.success){
				if ($loginbutton.hasClass('selected')){
					localStorage.setItem("myInfo", JSON.stringify(response.data));
					console.log(1);
					window.location="MainScreen.html";
				}else{
					$goLink.attr("href", "UserDetail.html");
				}
			}else{
				alert(response.message || "Cannot Log in");
			}
		});
	})

});