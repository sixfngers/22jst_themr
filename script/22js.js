
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
    $('#header-nav-dummy').height($('#nav-wrapper').height());
    $('.nav-height-dummy').height($('#nav-wrapper').height());
};


$(window).resize(function () {
   detectViewPort();
});

$(document).ready(function(){
	detectViewPort();
	setupNav();
	 
});

function setupNav()
{
	$('#nav ul li .about').on('click', function(){
		$('html,body').animate({scrollTop: $(this).offset().top}, 500);
		showSiteSection($("#about-section"), $("#about-section-wrapper")));
    });

    $('#about-section .section-header .close-button').on('click', function(){
		hideSiteSection($("#about-section"), $("#about-section-wrapper")));
    }); 
}

function showSiteSection(div, divWrapper)
{
	div.show();
	divWrapper.addClass("section-padding");
}

function closeSiteSection(div, divWrapper)
{
	div.hide();
	divWrapper.removeClass("section-padding");
}