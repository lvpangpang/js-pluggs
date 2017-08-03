;(function(win, doc) {
	'use strict';
	function WaterFall(obj, data, options) {
		this.obj = obj;
		this.length = data.length;
		this.indexNum = 0;
		this.isLast = false;
		this.goLast = true;
		this.init(options, data);
	}
	WaterFall.prototype = {
		constructor : WaterFall,
		init : function(options, data) {
			var defaultOptions = {
				ulBoxNum : 4,
				eachNew : 4,
				ulBoxMargin : 10,
				minHeight : 240,
				maxHeight : 300,
				lastTip : '数据显示完毕！'
			}
			options = options || {};
			this.extend(defaultOptions, options);
			this.createUlBox(options.ulBoxNum);
			this.createCon(options, data);
			this.EventBind(options, data);
			this.obj.style.width = this.obj.querySelector('ul').offsetWidth * options.ulBoxNum + 2 * options.ulBoxNum  * options.ulBoxMargin + 'px';
			if( options.ulBoxNum * options.eachNew > this.length ) {
				this.lastShow(options);
			}
		},
		randomNum : function(x, y) {
        	return Math.floor( Math.random() * (Math.max(x, y) - Math.min(x, y)) ) + Math.min(x, y);
		},
		// 画ul
		createUlBox : function(num) {
			var frag = document.createDocumentFragment();
	        for(var i=0; i<num; i++) {
	            var oList = document.createElement("ul");
	            frag.appendChild(oList);
	        }
	        this.obj.appendChild(frag);
		},
		// 画Li
		createLi : function(options, data) {
	        var r = this.randomNum(0,255),
	        	g = this.randomNum(0,255),
	        	b = this.randomNum(0,255),
	        	oLi = doc.createElement("li"),
	        	img = doc.createElement("img"),
	        	p = doc.createElement('p');
	        img.src = data[this.indexNum]['imgSrc']; 
	        p.innerText = data[this.indexNum]['imgDer'];
	        this.indexNum++;
	        oLi.style.height = this.randomNum(options.minHeight, options.maxHeight)+"px";
	        oLi.style.backgroundColor = 'RGB('+r+', '+g+', '+b+')';
	        oLi.style.opacity = 1;
	        oLi.appendChild(img);
	        oLi.appendChild(p);
	        return oLi;
    	},
    	// 随机增加节点
    	createCon : function(options, data) {
    		var oList = null;
			for(var j=0; j<options.eachNew; j++) {
    			for(var i=0; i<options.ulBoxNum; i++) {
    				if(this.indexNum < this.length) {
    					oList = this.createLi(options, data);
    					this.obj.querySelectorAll('ul')[i].appendChild(oList);
    				} else {
    					this.isLast = true;
    				}
    			}
    		}
    	},
    	// 事件绑定
    	EventBind : function(options, data) {
    		var oThis  = this;
    		window.onscroll = function() { 
    			if( !oThis.isLast ) {
					var scT = doc.documentElement.scrollTop ||doc.body.scrollTop,
		         		scH = doc.documentElement.scrollHeight || doc.body.scrollHeight ,
		        		cH = doc.documentElement.clientHeight || doc.body.clientHeight ; 
			        if( scT + 20 >= scH-cH) { 
			            oThis.createCon(options, data);
			        }
		    	} else if( oThis.goLast && oThis.isLast ) {
		    		oThis.lastShow(options);
		    	} 
    		}
    	},
    	// 对象扩展
    	extend : function(obj1, obj2) {
    		for(var x in obj1) {
    			if( !obj2[x] ) {
    				obj2[x] = obj1[x];
    			}
    		}
    		return obj2;
    	},
    	// 加载完毕后的函数
    	lastShow : function(options) {
    		var oThis = this,
    			oList = doc.createElement('div');
    		oThis.goLast = false;
			oList.innerText = options.lastTip;
			oList.className = 'last-tip';
			oThis.obj.appendChild(oList);
    	}
	}
	win.WaterFall = WaterFall;
})(window, document);