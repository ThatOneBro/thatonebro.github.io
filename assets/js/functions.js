var scrollSpeed = 0.25; 

/*------------------------------
          Mobile Nav
------------------------------*/

(function( $ ){
	$(document).ready(function(){
		var $mobileNav = $('.mobile-nav-home');
		
		$('.mobile-nav-toggle').on('click', function(){
			$mobileNav.toggleClass('active');
		});
	});
})( jQuery );

//====================================================================================================================//

/*------------------------------
       Smooth Scrolling
------------------------------*/

(function( $ ){
	$(document).ready(function(){
		$('a[href^="#"]').on('click', function(event){
			
			var $this = $(this),
				$target = $($this.attr('href')),
				$html = $('html, body'),
				
				$scrollTop = $(window).scrollTop(),
				sectionOffset = $target.parent().offset().top,
				
				distance = sectionOffset - $scrollTop,
				duration = distance * scrollSpeed;
			

			if ($target.length > 0) {
				event.preventDefault();
				$html.animate({
					scrollTop: sectionOffset
				}, duration);
			}
		});
	});
})( jQuery );

//====================================================================================================================//

/*------------------------------
    Node Pop-In and Pop-Out
------------------------------*/

(function( $ ){
	$(document).ready(function(){
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
	});
})( jQuery );

//====================================================================================================================//

/*------------------------------
        Node Retraction
------------------------------*/
(function( $ ){
	$(document).ready(function(){
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
	
	});
})( jQuery );