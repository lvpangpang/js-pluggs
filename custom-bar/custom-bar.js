;(function(win, doc) {
	function CustomBar(obj, options) {
		this.barWrap = obj;
		this.contenSubject = obj.querySelector('.content-subject');
		this.scrollBoxX = obj.querySelector('.scroll-box-x');
		this.scrollBarX = obj.querySelector('.scroll-bar-x');
		this.scrollBoxY = obj.querySelector('.scroll-box-y');
		this.scrollBarY = obj.querySelector('.scroll-bar-y');
		this.scaleX = 1;
		this.scaleY = 1;
		this.width = null;
		this.height = null;
		this.left = 0;
		this.top = 0;
		this.maxTop = 0;
		this.maxLeft = 0;
		options = options || {};
		this.init(options);
	}
	CustomBar.prototype = {
		constructor: CustomBar,
		init : function(options) {
			this.scaleX = this.barWrap.clientWidth / this.contenSubject.scrollWidth;
			this.scaleY = this.barWrap.clientHeight  / this.contenSubject.scrollHeight;
			if( this.scaleX>=1 ) {
				this.scaleX = 1;
				this.scrollBoxX.style.display = 'none';
			} else {
				this.scrollBarX.className += ' ' + (options.scrollBarTypeX ? options.scrollBarTypeX :'');
				this.scrollBoxX.className += ' ' + (options.scrollBoxTypeX ? options.scrollBoxTypeX : '');
				this.contenSubject.style.height = this.barWrap.offsetHeight - this.scrollBoxX.offsetHeight + 'px';
				this.width = this.barWrap.clientWidth * this.scaleX;
				this.maxLeft = this.scrollBoxX.scrollWidth - this.width;
			    this.scrollBarX.style.width = this.width + 'px';
			    this.eventBindX();
			}
			if( this.scaleY>=1 ) {
				this.scaleY = 1;
				this.scrollBoxY.style.display = 'none';
			} else {
				this.scrollBarY.className += (options.scrollBarTypeY ? ' ' + options.scrollBarTypeY :'');
				this.scrollBoxY.className += (options.scrollBoxTypeY ? ' ' + options.scrollBoxTypeY : '');
				this.contenSubject.style.width = this.barWrap.offsetWidth - this.scrollBoxY.offsetWidth + 'px';
				this.height = this.barWrap.clientHeight * this.scaleY;
				this.maxTop = this.scrollBoxY.scrollHeight - this.height;
			    this.scrollBarY.style.height = this.height + 'px';
			    this.eventBindY();
			}
		},
		eventBindX : function() {
			var oThis = this;
			this.scrollBarX.onmousedown = function(event) {
				var event = event || win.event,
					orginX = event.clientX - this.offsetLeft;
				doc.onmousemove = function(event) {
					var event = event || win.event;
  					win.event ? win.event.returnValue = false : event.preventDefault();
					oThis.left = event.clientX - orginX;
					oThis.left = Math.max(0, Math.min(oThis.maxLeft, oThis.left));
					oThis.contenScrollX();
				};
				doc.onmouseup = function() {
        			doc.onmouseup = doc.onmousemove = null;
				};
			};
			this.barWrap.onmousewheel = function(event) {
				oThis.wheelEvent();
			};
			if( navigator.userAgent.indexOf("Firefox")>0 ) {
				this.barWrap.addEventListener('DOMMouseScroll', function(event){
					oThis.wheelEvent(event);
				}, false);
			}
		},
		eventBindY : function() {
			var oThis = this;
			this.scrollBarY.onmousedown = function(event) {
				var event = event || win.event,
					orginY = event.clientY - this.offsetTop;
				doc.onmousemove = function(event) {
					var event = event || win.event;
  					win.event ? win.event.returnValue = false : event.preventDefault();
					oThis.top = event.clientY - orginY;
					oThis.top = Math.max(0, Math.min(oThis.maxTop, oThis.top));
					oThis.contenScrollY();
				};
				doc.onmouseup = function() {
        			doc.onmouseup = doc.onmousemove = null;
				};
			};
			this.barWrap.onmousewheel = function(event) {
				oThis.wheelEvent();
			};
			if( navigator.userAgent.indexOf("Firefox")>0 ) {
				this.barWrap.addEventListener('DOMMouseScroll', function(event){
					oThis.wheelEvent(event);
				}, false);
			}
		},
		wheelEvent : function(event) {
			var oThis = this,
				event = event || window.event,
				wheel = event.wheelDelta || event.detail,
  				isDown = true;
  			win.event ? win.event.returnValue = false : event.preventDefault();
			event.wheelDelta ? (isDown = wheel<0 ? true : false) : (isDown = wheel>0 ? true : false);
			isDown ? oThis.top+=10 : oThis.top-=10;
			oThis.contenScrollY();
		},
		contenScrollX : function() {
			this.left = Math.max(0, Math.min(this.maxLeft, this.left));
			this.scrollBarX.style.left = this.left + 'px';
			this.contenSubject.style.left = - this.left / this.scaleX+ 'px';
		},
		contenScrollY : function() {
			this.top = Math.max(0, Math.min(this.maxTop, this.top));
			this.scrollBarY.style.top = this.top + 'px';
			this.contenSubject.style.top = - this.top / this.scaleY+ 'px';
		}
	};
	win.CustomBar  = CustomBar;
})(window, document);