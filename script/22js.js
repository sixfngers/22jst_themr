
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

var photosetLayouts = [];

function adjustIFrames() {   
  var iFrames = $('.html_photoset iframe');

  function loopIFrames() {
    // Iterate through all iframes in the page.
    for (var i = 0, j = iFrames.length; i < j; i++) {
      var iFrame = $(iFrames[i]);
      adjustIFrame(iFrame);
    }
  }

  // Check if browser is Safari or Opera.
  if ($.browser.safari || $.browser.opera) {
    // Start timer when loaded.
    $('.html_photoset iframe').load(function() {
      setTimeout(loopIFrames, 0);
    });

    // Safari and Opera need something to force a load.
    for (var i = 0, j = iFrames.length; i < j; i++) {
      var iFrame = $(iFrames[i]);
      var iSource = iFrame.attr('src');
      iFrame.attr('src', '');
      iFrame.attr('src', iSource);
    }
  } else {
    // For other good browsers.
    $('.html_photoset iframe').load(function() {
      adjustIFrame(this);
    });
  }
}

function adjustIFrame(iframe) {
  var layout = $.parseJSON($(iframe).closest('.photoset-wrapper').attr('rel'));
  var gutter = 0;
  var marginHeight = 10;
  
  $(iframe).contents().find('.photoset_row').width("100%");
  var width = $(iframe).contents().find('.photoset_row').width();
  var newiFrameHeight = 0;
  for (i = 0; i < layout.length; i++) {
    var $img = $(iframe).contents().find('.photoset_row').eq(i).children('a').children('img');
    var numPics = layout[i];
    var newWidth = Math.floor((width - ((numPics - 1) * gutter)) / numPics);
    var newHeight = $img.closest('.photoset_row').height() * (newWidth / $img.width());
    newiFrameHeight += newHeight;
    
    // adjust so the margin between the photos is taken into account
    // only relevent on the photos that are not the top rows
    if(i > 0)
      newiFrameHeight += marginHeight;
    
    $img.closest('.photoset_row').height(newHeight+'px');
    $img.width(newWidth+'px');
  }
  $(iframe).height(newiFrameHeight);

  // Replace with high res if available and needed
  var $images = $(iframe).contents().find('.photoset_row').children('a').children('img');
  for (j = 0; j < $images.length; j++) {
    var $curImage = $($images[j]);
    var newSrc = $curImage.parent('a').attr('href');
    if (newSrc != undefined && newSrc != '') $curImage.attr('src', newSrc);
  }
}


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
	
	$(".html_photoset").each(function(i) {
	    var photoset_id = $(this).attr('id').substr(9);
	    
	    $(this).width("100%").children('iframe').width("100%");
	  });

	  adjustIFrames();
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