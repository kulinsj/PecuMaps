//My Profile Javascript


	$().ready(function() {
		var $primaryInputs = $('div.detailitem input');
		var $secondary = $('div.pw');
		var $edit = $('#edit');

		var $userName = $('#username');
		var $ratingValue = $('#ratingvalue');
		var $firstName = $('#fName');
		var $lastName = $('#lName');
		var $phone = $('#phone');
		var $email = $('#email');
		var $password = $('#pwd');
		var $newPassword = $('#newPwd');
		var $confirm = $('#confirm');

		var userData = localStorage.getItem("myInfo");
		userData = JSON.parse(userData);
		console.log(userData);
		console.log(userData.screenName);
		$userName.text(userData.screenName); //why .html?
		$firstName.val(userData.firstName);
		$lastName.val(userData.lastName);
		$phone.val(userData.phone);
		$email.val(userData.email);
		$password.val(userData.password);
		$newPassword.val(userData.newPassword);
		$confirm.val(userData.confirm);

		var editting = false;
	    $edit.click(function() {
	    	if(!editting){
	    		$primaryInputs.removeAttr('disabled');
	    		$primaryInputs.addClass('enabled');
	    		$secondary.show();
	    		$edit.html('Save');
	    		editting = true;
	    	}
	    	else{
	    		$primaryInputs.attr('disabled');
	    		$primaryInputs.removeClass('enabled');
	    		$secondary.hide();
	    		$edit.html('Edit');
	    		editting=false;
	    	}
	    });
	});