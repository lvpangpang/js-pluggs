

;(function(win, doc) {
	function uploadPic(obj) {
		this.btnDom = obj.querySelector('.btnDom');
		this.picDom = obj.querySelector('.picDom');
		this.init();
	}
	uploadPic.prototype = {
		init : function() {
			var oThis = this;
			// var fn = this.upPic.bind(this, this.btnDom, this.picDom);
			this.btnDom.onchange = function() {
				oThis.upPic(oThis.btnDom, oThis.picDom);
			}
		},
		upPic : function(btnDom, picDom) {
			var ext = btnDom.value.substring(btnDom.value.lastIndexOf(".") + 1).toLowerCase(),
				isIE = navigator.userAgent.match(/MSIE/) !== null;
		    if(ext!='png' && ext!='jpg' && ext!='jpeg'){
		        alert("图片的格式必须为png或者jpg或者jpeg格式！"); 
		    }
		    if( isIE ) {
		        btnDom.select();
		        var reallocalpath = document.selection.createRange().text;
		        picDom.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
		        picDom.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
		    } else {
		        this.html5Reader(btnDom, picDom);
		    }
		},
		html5Reader : function(btnDom, picDom) {
			var file = btnDom.files[0];
		    var reader = new FileReader();
		    reader.readAsDataURL(file);
		    reader.onload = function(){
		        picDom.src = this.result;
		    };
		    reader.onerror = function(){
		        alert('出错！')
		    }
		}
	};
	win.uploadPic = uploadPic;
})(window, document);
