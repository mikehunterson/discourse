import { registerUnbound } from 'discourse/lib/helpers';

registerUnbound('topic-link', function(topic) {
  var title = topic.get('fancyTitle');
  var url = topic.linked_post_number ? topic.urlForPostNumber(topic.linked_post_number) : topic.get('lastUnreadUrl');

  var extraClass = topic.get('last_read_post_number') === topic.get('highest_post_number') ? " visited" : "";
  //var string = "<a id='" + topic.get('slug') + "' class='title" + extraClass + " etusivuntopikit'>" + title + "</a>";

	var stringsearch = "/";
	var count = 0;
	for(var i=0; i<url.length; count+=+(stringsearch===url[i++]));
	if (count == 4) {
	    if (topic.id == undefined) { 
	      url = url.substring(0, url.length - 12); 
	    }
  		var string = "<a href='" + url + "' class='title" + extraClass + "'>";
	} else {
	    if (topic.id == undefined) { url = url.substring(0, url.length - 10); }
		  var string = "<a href='" + url + "' class='title" + extraClass + "'>";
	}

	
  //var string = "<a>" + title + "</a>";
  if (topic.category_id == 5){
  	var logo = title;
	if (logo == 'SekaBet (PokerDom)') {
		logo = '<div id="pokerdom"></div>';
		
	} else if ( logo == 'Full Flush Poker' ) {
		logo = '<div id="fullflush"></div>';
		
	} else if ( logo == 'Bwin' ) {
		logo = '<div id="bwin"></div>';

	} else if ( logo == 'SekaBet (Klas)' ) {
		logo = '<div id="sekabet"></div>';
		
	} else if ( logo == 'PokerStars' ) {
		logo = '<div id="pokerstars"></div>';
		
	} else if ( logo == 'BetOnline' ) {
		logo = '<div id="betonline"></div>';
		
	} else if ( logo == '5Dimes' ) {
		logo = '<div id="bookmaker"></div>';
		
	} else if ( logo == 'Betcoin Poker' ) {
		logo = '<div id="betcoin"></div>';
		
	} else if ( logo == 'PKR Gaming' ) {
		logo = '<div id="pkr"></div>';
		
	} else if ( logo == 'Wwin' ) {
		logo = '<div id="wwin"></div>';
		
	} else if ( logo == 'SwC Poker' ) {
		logo = '<div id="swcpoker"></div>';
		
	} else if ( logo == 'PokerMIRA' ) {
		logo = '<div id="pokermira"></div>';
		
	} else if ( logo == 'The Hive' ) {
		logo = '<div id="planetkolme"></div>';
		
	} else if ( logo == 'Intertops' ) {
		logo = '<div id="intertops"></div>';
		
	} else if ( logo == 'Europe-Bet' ) {
		logo = '<div id="europebet"></div>';
		
	} else if ( logo == 'SekaBet (Dollaro)' ) {
		logo = '<div id="dbgpoker"></div>';
		
	} else if ( logo == '888poker' ) {
		logo = '<div id="kasipoker"></div>';
		
	} else if ( logo == 'Unibet' ) {
		logo = '<div id="unibet"></div>';
		
	} else if ( logo == 'Full Tilt Poker' ) {
		logo = '<div id="fulltilt"></div>';
		
	} else if ( logo == 'SekaBet (Enet)' ) {
		logo = '<div id="lsbet"></div>';
		
	} else if ( logo == 'BetKings' ) {
		logo = '<div id="betsafe"></div>';
		
	} else if ( logo == 'Betsafe' ) {
		logo = '<div id="dhoze"></div>';
		
	} else if ( logo == 'Expekt' ) {
		logo = '<div id="expekt"></div>';
		
	} else {
		logo = '';
	}
	string = string + logo + title +"</a";
	return new Handlebars.SafeString(string);
  } else {
  string += title +"</a";  
	return new Handlebars.SafeString(string);
  }
});
