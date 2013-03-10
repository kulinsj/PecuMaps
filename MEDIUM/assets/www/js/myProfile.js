//My Profile Javascript


	$().ready(function() {
		var $primaryInputs = $('div.detailitem input');
		var $secondary = $('div.pw');
		console.log($secondary);
		var $edit = $('#edit');

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