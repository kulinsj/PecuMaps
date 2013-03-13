function login(email, pass){
	var data = {email:email, password:pass};
    if (window.coords && window.coords.latitude) {
        data.latitude = window.coords.latitude;
        data.longitude = window.coords.longitude;
    }

    post(BASE_URL+"/login/", data, function(response){
        if (response.success) {
	        alert('Log in succeeded');
        } else {
            alert(response.message || "Unable to login at this time.");
        }
    });
}

/*
 *  PreValidate all submitted forms and pass the data in
 *  Override jQuery submit
 */
(function(){
    function validateAndGetFields($form) {
        var invalid = false, d = {};
        $form.find("select, input, textarea").each(function(){
            var $field = $(this);
            if (!$field.attr("disabled")) {
                var value = $field.val(),
                    name = $field.attr("name"),
                    type = $field.attr("type"),
                    isRequired = $field.attr("required"),
                    fieldInvalid = false;
                if (name && (value.trim() !== "" || isRequired && value.trim() === "")) {
                    switch(type) {
                        case 'text':
                        case 'password':
                            if (value.trim() === "") fieldInvalid = true; break;
                        case 'number':
                            if (value === "" || isNaN(value)) fieldInvalid = true;
                            else value = parseFloat(value);
                            break;
                        case 'email':
                            if (!value.isEmail()) fieldInvalid = true; break;
                        case 'checkbox':
                            value = $field.is(":checked"); break;
                    }
                    if (name && value !== "") d[name] = value;
                    invalid = fieldInvalid;
                }
                $field.toggleClass("invalid", fieldInvalid);
            }
        });
        if (invalid) {
            return null;
        }
        return d;
    }

    var oldSubmit = $.fn.submit;
    $.fn.submit = function(){
        if (arguments.length == 1 && arguments[0].call) {
            // Attach the enter event to validate
            this.find("select, input").keyup(function(e){
                if (e.which==13) validateAndGetFields($(this).parents("form"));
            });

            // Hijack the submit and do validation and get form data
            var fn = arguments[0];
            arguments[0] = function(){
                var evt = arguments[0];
                if (evt.currentTarget) {  // Check if event
                    var $target = $(evt.currentTarget);
                    evt.formData = validateAndGetFields($target);
                    if (!(evt.formData)) return false;
                }
                return fn.apply(this, arguments);
            }
        }
        oldSubmit.apply(this, arguments);
    }
})();