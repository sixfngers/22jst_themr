
var log = function( msg, obj ){
	if(typeof window.console != 'undefined' && typeof window.console.log != 'undefined') {
		if (typeof obj !== 'undefined'){
			console.log("LOG :: "+msg, obj);
		} else {
			console.log("LOG :: ", msg);			
		}
	}
},

log = ( window.location.href.indexOf('22new.tumblr') > -1 || window.location.href.indexOf('dev.') > -1 || window.location.href.indexOf('localhost') > -1 ) ?
	log : 
	function(){};

log('debug dev events');


var detectViewPort = function()
{
	log($('nav-wrapper'));
    log($('nav-wrapper').height);
    log($('header-nav-dummy').height);

    $(header-nav-dummy).css('height') = $('#nav-wrapper').css('height');
};


$(window).resize(function () {
   detectViewPort();
});

$(document).ready(function(){
	detectViewPort();
});