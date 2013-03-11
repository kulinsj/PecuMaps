$(document).ready(function(){
	var $back = $('.backBtn');
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

String.prototype.isEmail = function() {
    var r = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return r.test(this);
}

function ajax(method, url, data, success, error) {
    var func = function(){};
    $.ajax({
        type: method.toUpperCase(),
        datatype:'json',
        url:url,
        data: data,
        success: success,
        error: error || func
    });
}

function post(url, data, success, error) {
    ajax("POST", url, data, success, error);
}

function put(url, data, success, error) {
    ajax("PUT", url, data, success, error);
}

function remove(url, data, success, error) {
    ajax("DELETE", url, data, success, error);
}
var get = $.get;

function login(email, pass){
	var data = {email:email, password:pass};
    if (window.coords && window.coords.latitude) {
        data.latitude = window.coords.latitude;
        data.longitude = window.coords.longitude;
    }

    post("http://jademap.herokuapp.com/login/", data, function(response){

        if (response.success) {
	        console.log('Logged in success');
	        alert('succeeeeed at login')
        } else {
            alert(response.message || "Unable to login at this time.");
        }
    });
}