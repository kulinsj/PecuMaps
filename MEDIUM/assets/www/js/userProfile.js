$(document).ready(function(){
	var $loadingOverlay = $('#loadingOverlay');
	var $user_name = $('span.user_name');
	var $score =


	$ul = $('#feeds ul');
	$ul.delegate("li","click",function(){
		console.log($(this));
	});
	$('img.user_avatar').click(function(){
		getUser("theboss", function(){});
		console.log($loadingOverlay);
		$loadingOverlay.show();
	});

	var data = window.postedData;
	if(data){
		get(BASE_URL+"/posts/user/"+data.screenName,function(response){
			if(response.success){
				for(var i=0; i<response.data.length; i++){
					var item = response.data[i];
					var title = item.title;
					var description = item.description;
					var numClaims = item.claimers.length;
					var pay = item.cost;
					var payper = '';
					if(item.costPer){
						payper = '<span class="per">per '+item.costPer+'</span>';
					}

					var appendable = '<li class="feeditem">\
								<article class="feedarticle">\
									<span class="title">'+title+'</span>\
									<span class="description">'+description+'</span>\
									<span class="claims">'+numClaims+' claims</span>\
									<span class="timeleft">'+daysLeft(item.expiryDate,"Ends")+'</span>\
									<span class="price">$'+pay+'</span>\
									'+payper+'\
								</article>\
							</li>';
					$ul.append(appendable);
				}
			}
			else{
				alert(response.message||'Failed to retrieve postings. Please check your network connection and try again');
			}
		});
	}
});