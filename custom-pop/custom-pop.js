;(function(win, doc) {
	function CustomPop(options) {
		this.init(options);
	}
	CustomPop.prototype = {
		init: function(options) {
			var oThis = this,
				defaultOption = {
					title: '妮素提示',
					type : 'prompt',
					msg : '',
					callback : function(){}
				},
				isCancelShow = false;
				customWrap = doc.createElement('div'),
				customBg = doc.createElement('div'),
				customMain = doc.createElement('div'),
				customHeader = doc.createElement('div'),
				customHeaderTitle = doc.createElement('h2'),
				customHeaderClose = doc.createElement('button'),
				customContent = doc.createElement('div'),
				customStatus = doc.createElement('div'),
				customMsg = doc.createElement('div'),
				customFooter = doc.createElement('div'),
				customConfirm = doc.createElement('a'),
				customCancel = doc.createElement('a'),
				options = options || {};
			this.addClass.call(customWrap, 'custom-wrap');
			this.addClass.call(customBg, 'custom-bg');
			this.addClass.call(customMain, 'custom-main');
			this.addClass.call(customHeader, 'custom-header');
			this.addClass.call(customHeaderTitle, 'custom-header-title');
			this.addClass.call(customHeaderClose, 'custom-header-close');
			this.addClass.call(customContent, 'custom-content');
			this.addClass.call(customStatus, 'custom-status');
			this.addClass.call(customMsg, 'custom-msg');
			this.addClass.call(customFooter, 'custom-footer');
			this.addClass.call(customConfirm, 'custom-confirm opacity');
			this.addClass.call(customCancel, 'custom-cancel opacity');
			doc.body.appendChild(customWrap);
			customWrap.appendChild(customBg);
			customWrap.appendChild(customMain);
			customMain.appendChild(customHeader);
			customHeader.appendChild(customHeaderTitle);
			customHeader.appendChild(customHeaderClose);
			customMain.appendChild(customContent);
			customContent.appendChild(customStatus);
			customContent.appendChild(customMsg);
			customMain.appendChild(customFooter);
			customFooter.appendChild(customConfirm);
			customFooter.appendChild(customCancel);
			if( options.callback ) {
				customCancel.style.display = 'inline-block';
				customConfirm.onclick = function() {
					oThis.removeElement(doc.querySelector('#customWrap'));
					options.callback();
				}
			} else {
				customConfirm.onclick = function() {
					oThis.removeElement(doc.querySelector('#customWrap'));
				}
			}
			this.extend(options, defaultOption);
			customWrap.setAttribute('id', 'customWrap');
			customConfirm.innerText = '确定';
			customCancel.innerText = '取消';
			customHeaderTitle.innerText = options.title;
			// 3种类型的判断
			if( options.type==='success' ) {
				this.addClass.call(customStatus, 'custom-status-success');
			} else if( options.type==='failed' ) {
				this.addClass.call(customStatus, 'custom-status-failed');
			}
			// 写入要展示的信息
			customMsg.innerHTML = options.msg;
			// 事件绑定
			customHeaderClose.onclick = customCancel.onclick = function() {
				oThis.removeElement(doc.querySelector('#customWrap'));
			};
		},
		removeElement : function(_element) {
	         var _parentElement = _element.parentNode;
	         if( _parentElement ){
	            _parentElement.removeChild(_element);
	         }
		},
		extend : function(options, tag) {
		   for(var i in tag) {
			   	if( !(i in options) ) {
			   		options[i] = tag[i];
			   	}
		   }
		   return this;
		},
		addClass : function(claName) {
	        this.className += " " + claName;
		}
	};
	win.CustomPop = CustomPop;
})(window, document);