;(function(win, doc) {
	function promptText(obj, options) {
		that = this;
		that.each.call(obj, function() {
			this.default = {
				dataDescribe : 'data-describe',
				styleClass : 'show-all-info'
			};
			this.options = options || this.default;
			that.init.call(this);
		});
	}
	promptText.prototype = {
		init : function() {
			that.addEvent.call(this, 'mouseover', function(event) {
				var oThis = this,
					event = event || window.event;
				oThis.timer = setTimeout(function() {
					oThis.showAllInfo = doc.createElement('p');
					oThis.showAllInfo.innerText = oThis.getAttribute(oThis.options.dataDescribe) ;
					oThis.showAllInfo.className = oThis.options.styleClass;
					that.css.call(oThis.showAllInfo, {'left': event.clientX + 10 + 'px' , 'top' : event.clientY + 15 + 'px' });
					doc.body.appendChild(oThis.showAllInfo);
					} ,1000);
			});
			that.addEvent.call(this, 'mouseout', function(event) {
				clearTimeout(this.timer);
				this.showAllInfo.remove();
			});
		},
		css : function(style) {
			for(var i in style) {
				this.style[i] = style[i];
			}
		},
		each : function(fn) {
			for (var i=0; i<this.length; i++) {
			    fn.call(this[i]);
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
	}
	win.promptText = promptText;
})(window, document);