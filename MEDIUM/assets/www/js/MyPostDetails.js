var data = localStorage.getItem("postedData");
if(data){
	localStorage.removeItem("postedData");
	data = JSON.parse(data);
	console.log(data.screenName);
}
else{
	//failed to get data
}
