$(document).ready(function(){
    smoothScroll(350);
    nodeJump();
    nodeRetract();
    
});

function smoothScroll(duration){
	$('a[href^="#"]').on('click', function(event){
        
        var $this = $(this),
            $target = $($this.attr('href')),
            $html = $('html, body');
        

	    if ($target.length > 0) {
	        event.preventDefault();
	        $html.animate({
	            scrollTop: $target.parent().offset().top
	        }, duration);
	    }
	});
}

function nodeJump(){
    $('body').on('mouseenter', '.outer-node, .return-node', 
        function(){
            $(this).removeClass('out').addClass('in');
        }
    );
    
    $('body').on('mouseleave', '.outer-node, .return-node', 
        function(){
            $(this).removeClass('in').addClass('out');
        }
    );
}

function contentLoad($passedThis){

    $.ajaxSetup({ cache: false });
    
    var $newFolder = $passedThis.data('folder'),
        $newFile = $newFolder + '/' + $passedThis.data('file');
    
    function nodeExpand(){
        $('.outer-node, .top-nodes-wrap, .bottom-node-wrap, .top-connectors-wrap, .top-connector, .bottom-connector').removeClass('retracted');
    }
        
    $('.work-wrap').load($newFile);
    $( document ).ajaxSuccess(function(){
        setTimeout(function(){nodeExpand()}, 500);
    });
}

function nodeRetract(){
    $('body').on('click', '.outer-node, .return-node', function(){
        
        var $this = $(this),
            $outerNode = $('.outer-node'),
            $returnNode = $('.return-node'),
            $wrapsAndConnectors = $('.top-nodes-wrap, .bottom-node-wrap, .top-connectors-wrap, .top-connector, .bottom-connector'),
            $allNodes = $('.outer-node, .return-node');
        
        $outerNode.toggleClass('retracted');
        $wrapsAndConnectors.toggleClass('retracted');
        $allNodes.removeClass('selected-node');
        $this.addClass('selected-node');
        
        setTimeout(function(){contentLoad($this)}, 500);
    });
}

//==================================================================================================================================//

/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );