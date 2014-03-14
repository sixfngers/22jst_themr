
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

	// $('#nav ul li #about-link').on('click', function(){
	$("a[href='#about']").click(function(e) {
		$('html,body').animate({scrollTop: $(this).offset().top}, 500);
		showSiteSection($("#about-section-inner-wrapper"), null);
		e.preventDefault();
    });

    

    $('#about-section .section-header .close-button').on('click', function(){
		closeSiteSection($("#about-section-inner-wrapper"), null);
    }); 


    $( '.index-post-controls-wrapper' ).mouseenter(function() {
    	$(this).addClass("mouseenterpost");
  	})

  	$( '.index-post-controls-wrapper' ).mouseleave(function() {
    	$(this).removeClass("mouseenterpost");
  	});
}

function showSiteSection(div, divWrapper)
{
	
	div.show();
	//divWrapper.addClass("section-padding");
	scrollToTop("fast");
}

function closeSiteSection(div, divWrapper)
{
	div.hide();
	//divWrapper.removeClass("section-padding");
}

function scrollToTop(time)
{
	$("html, body").animate({ scrollTop: 0 }, time, 'linear');
}