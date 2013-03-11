var LOCAL = '';
var REMOTE = 'http://jademap.herokuapp.com';
var BASE_URL = LOCAL;

$(document).ready(function(){

	var $back = $('.backBtn');
	$back.click(function(){
		goBack();
	});
	var $userLink = $(".userLink");
	$userLink.click(function(){
		//TO DO

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

    post(BASE_URL+"/login/", data, function(response){
        if (response.success) {
	        alert('Log in succeeded');
        } else {
            alert(response.message || "Unable to login at this time.");
        }
    });
}

function goTo(url, object){
	if(object){
		localStorage.setItem("postedData", JSON.stringify(object));
	}
	window.location = url;
	$('#loadingOverlay').hide();
}

(function(){
	var data = localStorage.getItem("postedData");
	if(data){
		data = JSON.parse(data);
		window.postedData = data;
		localStorage.removeItem("postedData");
	}
})();

function getUser(screenName, callback){
	get(BASE_URL+"/users/"+screenName,function(response,a,b){
		if(response.success){
			goTo("UserProfile.html",response.data);
		}
		else{
			alert(response.message||"Failed");
		}
	});
}

function daysLeft(date, notEndPrefix) {
    var then = new Date(date),
        thatTime = then.getTime(),
        now = Date.now(),
        diff = Math.round((thatTime - now) / 1000);
    if (thatTime === 0) {           // No expiry
        return "";
    } else if (diff < 0) {      // Already expired
        return "Already finished.";
    } else {                    // Time left
        if (diff < 60) {
            var left = diff%60;
            return notEndPrefix + " in about " + left + " second" + (left==1?"":"s");
        } else if (diff < 60 * 60) {
            var left = Math.floor((diff/60)%(60 * 60));
            return notEndPrefix + " in about " + left + " minute" + (left==1?"":"s");
        } else if (diff < 60 * 60 * 24) {
            var left = Math.floor((diff/(60*60))%(60 * 60 * 24));
            return notEndPrefix + " in about " + left + " hour" + (left==1?"":"s");
        } else if (diff < 60 * 60 * 24 * 7) {
            var left = Math.floor((diff/(60*60*24))%(60 * 60 * 24 * 7));
            return notEndPrefix + " in about " + left + " day" + (left==1?"":"s");
        } else {
            var m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            return notEndPrefix + " on " + m[then.getMonth()] + " " + then.getDate() + ", " + then.getFullYear();
        }
    }
}

function formatDate(date){
	console.log(date);
	var m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	return m[date.getMonth()]+" "+date.getDate();
}