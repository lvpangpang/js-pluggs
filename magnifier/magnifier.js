;(function(win, doc) {
	function Magnifier(obj, options) {
		this.obj = obj;
		this.magnifierSmall = this.obj.querySelector('.magnifier-small');
		this.magnifierBig = this.obj.querySelector('.magnifier-big');
		this.magnifierMove = this.obj.querySelector('.magnifier-move');
		this.magnifierImg = this.magnifierBig.querySelector('img');
		this.magnifierWidth = this.magnifierSmall.offsetWidth;
		this.magnifierHeight = this.magnifierSmall.offsetHeight;
		this.scaleWidth = this.magnifierImg.width / this.magnifierWidth;
		this.scaleHeight = this.magnifierImg.height / this.magnifierHeight;
		this.init(obj, options);
	}
	Magnifier.prototype = {
		init : function(obj, options) {
			var oThis = this;
			oThis.magnifierBig.style.display = 'none';
			this.magnifierMove.style.width = this.magnifierWidth / this.scaleWidth + 'px';
			this.magnifierMove.style.height = this.magnifierHeight / this.scaleHeight + 'px';
			this.magnifierSmall.onmousemove = function(event) {
				oThis.goMove(event);
			};
			this.magnifierSmall.onmouseout = function() {
				oThis.magnifierMove.style.display = oThis.magnifierBig.style.display = 'none';
			};
		},
		goMove : function(event) {
			var event = event || window.event,
				x = event.clientX ,
				y = event.clientY ,
				oThis = this;
			oThis.magnifierMove.style.display = oThis.magnifierBig.style.display = 'block';
			x = x - oThis.magnifierSmall.getBoundingClientRect().left - oThis.magnifierMove.offsetWidth / 2;
			y =  y - oThis.magnifierSmall.getBoundingClientRect().top -  oThis.magnifierMove.offsetHeight / 2;
			x = Math.max(0, Math.min(oThis.magnifierWidth - oThis.magnifierMove.offsetWidth, x));
			y = Math.max(0, Math.min(oThis.magnifierHeight - oThis.magnifierMove.offsetHeight,  y));
			oThis.magnifierMove.style.left = x + 'px';
			oThis.magnifierMove.style.top = y + 'px';
			oThis.magnifierBig.scrollLeft = oThis.scaleWidth * x ;
			oThis.magnifierBig.scrollTop = oThis.scaleHeight * y ;
		}
	}
	win.Magnifier = Magnifier;
})(window, document);
