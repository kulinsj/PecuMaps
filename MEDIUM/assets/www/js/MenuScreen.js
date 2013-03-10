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