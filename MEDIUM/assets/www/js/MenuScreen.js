function activateNotifications() {
	document.getElementById("notifications_tab").style.background='#efefef'
	document.getElementById("myposts_tab").style.background='-webkit-linear-gradient(top, #efefef, #dcdcdc)'
	document.getElementById("myclaims_tab").style.background='-webkit-linear-gradient(top, #efefef, #dcdcdc)'
	document.getElementById("notifications").style.display='block'
	document.getElementById("myposts").style.display='none'
	document.getElementById("myclaims").style.display='none'
}

function activateMyPosts() {
	document.getElementById("notifications_tab").style.background='-webkit-linear-gradient(top, #efefef, #dcdcdc)'
	document.getElementById("myposts_tab").style.background='#efefef'
	document.getElementById("myclaims_tab").style.background='-webkit-linear-gradient(top, #efefef, #dcdcdc)'
	document.getElementById("notifications").style.display='none'
	document.getElementById("myposts").style.display='block'
	document.getElementById("myclaims").style.display='none'
}

function activateMyClaims() {
	document.getElementById("notifications_tab").style.background='-webkit-linear-gradient(top, #efefef, #dcdcdc)'
	document.getElementById("myposts_tab").style.background=' -webkit-linear-gradient(top, #efefef, #dcdcdc)'
	document.getElementById("myclaims_tab").style.background='#efefef'
	document.getElementById("notifications").style.display='none'
	document.getElementById("myposts").style.display='none'
	document.getElementById("myclaims").style.display='block'
}
var items = {};

$().ready(function(){
	var $myPosts = $('#myposts ul');
	$loadingOverlay = $('#loadingOverlay');
	var userData= localStorage.getItem("myInfo");
	var data = JSON.parse(userData);
	console.log(data);
	getUsersPosts(data.screenName, function(response){
		if(response.success){
			for(var i = 0; i<response.data.length; i++){
				var post = response.data[i];
				console.log(post);
				items[post.title]=post;
				var numClaims = post.claimers.length;
				var s ='';
				if(numClaims==1){
					s='s';
				}
				var appendable = '<li class="feed_item">\
										<article class="posts_article">\
											<span class="title">'+post.title+'</span>\
											<span class="description">'+post.description+'</span>\
											<span class="time_left">'+daysLeft(post.expiryDate, "Ends")+'</span>\
											<span class="claims">'+numClaims+' claim'+s+'</span>\
										</article>\
									</li>';
				$myPosts.append(appendable);
			}
		}
		else{
			alert(response.message||"failed to retrieve posts");
		}
	});

	var $PostsUL = $('#myposts ul');
	$PostsUL.delegate('li', "click", function(){
		var key = $(this).find('span.title').html();
		var data = items[key];
		goTo("MyPostDetails.html", data);
	});
});