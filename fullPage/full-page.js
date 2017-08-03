;(function($) {
	$.fn.fullPage = function(options) {
		var oThis = $(this),
			flag = 0, 
			index = 0,
	 		mousewheel = 'mousewheel',
	 		wheel = null,
			winHeight = parseFloat($(window).height()),
			timer = false,
			fullSidebar = $(document).find('#fullSidebar'),
			fullItemNum = $(this).length,
			winDom = $('body');
		var methodObject = {
			init : function() {
				var oThis = this;
				navigator.userAgent.indexOf('MSIE') > 0 ? winDom = $('html'):'';
				navigator.userAgent.indexOf("Firefox") > 0 ? ( mousewheel = 'DOMMouseScroll' , winDom = $('html , body') ) : '';
				fullSidebar.find('li').eq(0).children('.sidebar-normal').addClass('active');
				$(window).ready(function() {
					index = 0;
					oThis.resize(winDom);
					winDom.animate({scrollTop:0}, 500, function() {
						flag = 0;
					});
				}).resize(function() {
					oThis.resize(winDom);
					winDom.animate({scrollTop:0}, 500, function() {
						flag = 0;
					});
				});
			},
			resize : function(winDom) {
				winHeight = parseFloat($(window).height());
				winDom.height(winHeight);
				oThis.height(winHeight);
			},
			scrollEvent : function(oThis) {
				var oThis = $(oThis);
				if ( timer ) {
					clearTimeout(timer);
				}
				timer = setTimeout(function() {
					index = Math.floor( oThis.scrollTop()/winHeight ) ;
					if ( $(this).scrollTop()%winHeight >= winHeight/2 ) {
						index++;
					} 
					fullSidebar.find('a').removeClass('active');
					fullSidebar.children('li').eq(index).find('.sidebar-normal').addClass('active');
				},200);
			},
			wheelEvent : function(event) {
				var event = event || window.event,
					wheel,
					time = 500;
				event.preventDefault();
				navigator.userAgent.indexOf("Firefox") > 0 ?  wheel = event.originalEvent.detail : wheel = event.originalEvent.wheelDelta;
				if ( (wheel === 3 || wheel === -120)  && flag === 0) {
					flag = 1;
					index++;
					index > (fullItemNum - 1) ? index = (fullItemNum - 1) : index = index;
					winDom.animate({scrollTop:winDom.scrollTop() - winDom.scrollTop() % winHeight + winHeight},time, function() {
						flag = 0;
					});
				} else if ( (wheel === -3 || wheel === 120) && flag === 0 ) {
					flag = 1;
					index --;
					index === -1 ? index = 0:'';
					winDom.animate({scrollTop:winDom.scrollTop() - winDom.scrollTop() % winHeight - winHeight},time, function() {
						flag = 0;
					});
				}
				fullSidebar.find('a').removeClass('active');
				fullSidebar.children('li').eq(index).find('.sidebar-normal').addClass('active');
			},
			sidebarEvent : function(oThis) {
				var oThis = $(oThis);
				fullSidebar.find('span').removeClass('active');
				oThis.find('span').eq(0).addClass('active');
				index = oThis.parent().index();
				winDom.animate({scrollTop: index * winHeight},500);
			}
		};
		methodObject.init();
		$(window).scroll(function() {
			methodObject.scrollEvent(this);
		});
		$(document).on(mousewheel , function(event) {
			methodObject.wheelEvent(event);
		});
		fullSidebar.find('a').on('click' ,function() {
			methodObject.sidebarEvent(this);
		});
	}
})(jQuery);