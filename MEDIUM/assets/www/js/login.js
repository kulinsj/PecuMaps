(function(){

var URL = {
    LOGIN: "/login/",
    LOGOUT: "/logout/",
    REGISTER: "/register/",
    POST: "/posts/"
};

// Register
$("#page form.register").submit(function(e){
    var data = e.formData;
    if (data.password === data['confirm-password']) {
        $("#register-password, #register-confirm-password").removeClass("invalid");
        post(URL.REGISTER, e.formData, function(response){ 
            if (response.success) {
                $("#page").addClass("loggedIn");
                hideDropForms();
            } else {
                alert(response.message || "Unable to register at this time.");
            }
        });
    } else {
        alert("Passwords do not match");
        $("#register-password, #register-confirm-password").addClass("invalid");
    }
    return false;
});

// Sign out
$("#page .user-controls .signout").click(function(){
    $.get(URL.LOGOUT, function(response){
        if (response.success) {
            $("#page").removeClass("loggedIn");
            $("#email").val("");
            $("#pwd").val("");
            if (typeof(hideDropForms) != 'undefined') hideDropForms();
        } else {
            alert("Failed to logout");
        }
    });
});

// Sign in
$("#page form.sign-in").submit(function(e){
    var data = e.formData;
    if (window.coords && window.coords.latitude) {
        data.latitude = window.coords.latitude;
        data.longitude = window.coords.longitude;
    }
    post(URL.LOGIN, data, function(response){ 
        if (response.success) {
            $("#page").addClass("loggedIn");
            hideDropForms();
        } else {
            alert(response.message || "Unable to login at this time.");
        }
    });
    return false;
});

// Posting
$("#page form.post").submit(function(e){
    var data = e.formData;
    getLocation(data.address, function(loc){
        $("#post-address").toggleClass('invalid', !loc);
        if (loc) {
            data.longitude = loc.longitude;
            data.latitude = loc.latitude;
            data.address = loc.address;
            post(URL.POST + data.title, data, function(response){ 
                if (response.success) {
                    alert("Job is posted");
                    hideDropForms();
                } else {
                    alert(response.message || "Unable to login at this time.");
                }
            });
        }
    });
    return false;
});

})();
