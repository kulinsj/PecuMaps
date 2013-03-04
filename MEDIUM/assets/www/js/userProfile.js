
$(document).ready(function(){
	var rating;
	var name;
	name = window.location.hash;
	name = name.substr(1);
	switch(name)
	{
	case 'BillyRayCharles':
	  rating = 90;
	  break;

	case 'AnnaHeemes':
	  rating = 96;
	  break;

	case 'JanKulinski':
	  rating = 91;
	  break;

	case 'StevenWen':
	  rating = 97;
	  break;

	case 'WaterlooFeds':
	  rating = 93;
	  break;
	  
	case 'RogerFederer':
	  rating = 98;
	  break;
	  
	case 'LoisDane':
	  rating = 93;
	  break;
	 
	case 'FranciscoDestinee':
	  rating = 95;
	  break;
	 
	case 'JamesMatador':
	  rating = 90;
	  break;

	case 'JustinDoaug':
	  rating = 96;
	  break;
	}
	var $nameText = $('div.username');
	var $ratingtext = $('div.percentage');
	$nameText.html(name);
	$ratingtext.html(rating);
});