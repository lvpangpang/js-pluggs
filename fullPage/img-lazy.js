;(function(win, doc) {
	function lazyImg(options) {
		this.init(options);
	}
	lazyImg.prototype = {
		init : function(options) {
			var optionDefault = {
				realSrcAtr : 'data-src',
				extendHeight : 0,
			},
			options = options || {},
			oThis = this;
			this.extend(options, optionDefault);
			this.addEvent.call(window, 'load', function() {
				oThis.throttle(oThis.lazyLoadImg, ['data-src', options.extendHeight], oThis);
			});
			this.addEvent.call(window, 'size', function() {
				oThis.throttle(oThis.lazyLoadImg, ['data-src', options.extendHeight], oThis);
			});
			this.addEvent.call(window, 'scroll', function() {
				oThis.throttle(oThis.lazyLoadImg, ['data-src', options.extendHeight], oThis);
			});
		},
		getImgTop : function(imgDom, extendHeight) {
        	var offsetTop = imgDom.getBoundingClientRect().top,
        		winHeight = document.documentElement.clientHeight || document.body.clientHeight;
	        if( offsetTop < winHeight+extendHeight ) {
	            return true;
	        }
	    },
	    lazyLoadImg : function(realSrcAtr, extendHeight) {
	        var allLazyImg = document.querySelectorAll("["+ realSrcAtr +"]");
	        console.log(allLazyImg);
	        for (var i=0, length=allLazyImg.length; i<length; i++) {
	            if ( allLazyImg[i].getAttribute(realSrcAtr) ) {
	                allLazyImg[i].style.opacity = 0;
	                allLazyImg[i].style.filter = "alpha(opacity = " + 0 + ")";
	                if( this.getImgTop(allLazyImg[i], extendHeight) ) {
	                    allLazyImg[i].src = allLazyImg[i].getAttribute(realSrcAtr);
	                    allLazyImg[i].removeAttribute(realSrcAtr);
	                   	allLazyImg[i].style.webkitTransition = 'opacity 1s';
	                    allLazyImg[i].style.opacity = 1;
	                    allLazyImg[i].style.filter = "alpha(opacity = " + 100 + ")";
	                }
	            }
	        }
	    },
	    throttle : function(method, parma, context) { 
	        clearTimeout(method.tId);  
	        method.tId = setTimeout(function(){ 
	        	console.log(1);  
	            method.apply(context, parma); 
	        }, 200);  
	    },
	    extend : function(options, tag) {
		   for(var i in tag) {
			   	if( !(i in options) ) {
			   		options[i] = tag[i];
			   	}
		   }
		   return this;
		},
		addEvent : function(event , fn) {
			if(win.addEventLinister ) {
				this.addEventLinister(event, fn, false);
			} else if ( win.attachEvent ) {
				this.attachEvent('on' + event, fn);
			} else {
				this['on' + event] = fn;
			}
		}
	};
	win.lazyImg = lazyImg;
})(window, document);
