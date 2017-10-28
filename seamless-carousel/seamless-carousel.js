;(function(win, doc) {
	function Carousel(obj,options) {
		this.obj  = obj;
		this.parentNode = this.obj.parentNode;
		this.sliding = this.obj.querySelectorAll('li');
		this.width = parseFloat(this.css.call(this.sliding[0], 'width'));
		this.pagination = this.parentNode.querySelector('#pagination');
		this.paginationItem = null;
		this.leftButton = this.parentNode.querySelector('.carousel-left');
		this.rightButton = this.parentNode.querySelector('.carousel-right');
		this.timer = null;
		this.index = 0;
		this.num = this.sliding.length;
		this.setTime = null;
		this.init(obj, options);
	}
	Carousel.prototype = {
		init : function(obj , options) {
			var oThis = this,
				optionDefault = {
				hasButton : false,
				haspagination : true,
				durtionTime : 3000
			};
			options = options || {};
			oThis.extend(options, optionDefault);
			if(oThis.num > 1) {
				oThis.obj.style.left = -oThis.width + 'px';
				for(var i=0; i<oThis.num; i++) {
					var a = doc.createElement('a');
					oThis.pagination.appendChild(a);
				}
				oThis.paginationItem = oThis.pagination.querySelectorAll('a');
				oThis.paginationItem[0].className = 'active';
				if( !options.haspagination  ) {
					oThis.pagination.style.display = 'none';
				}
				var firstNode = oThis.sliding[0].cloneNode(true),
					lastNode = oThis.sliding[oThis.num - 1].cloneNode(true);
				oThis.obj.insertBefore(lastNode, oThis.sliding[0]);
				oThis.obj.appendChild(firstNode);
				oThis.autoTimer = setInterval(function () {
					oThis.next();
				}, options.durtionTime);
				oThis.parentNode.onmouseover = function () {
					if( options.hasButton ) {
						oThis.leftButton.style.display = 'block';
						oThis.rightButton.style.display = 'block';
					}
					clearInterval(oThis.autoTimer);
				};
				oThis.parentNode.onmouseout = function () {
					oThis.leftButton.style.display = 'none';
					oThis.rightButton.style.display = 'none';
					oThis.autoTimer = setInterval(function () {
						oThis.next();
					}, options.durtionTime);
				};
				oThis.leftButton.onclick = function() {
					oThis.prev();
				};
				oThis.rightButton.onclick = function() {
					oThis.next();
				};
				for(var j=0; j<oThis.num; j++) {
					(function(j) {
						var tim = null;
						oThis.paginationItem[j].onmouseover = function() {
							tim = setTimeout(function() {
								oThis.index = j;
								oThis.move(oThis.index);
							}, 200);
						}
						oThis.paginationItem[j].onmouseout = function() {
							clearTimeout(tim);
						}
					})(j);
				}
			} else {
				oThis.obj.style.left = 0;
				oThis.leftButton.style.display = 'none';
				oThis.rightButton.style.display = 'none';
			}
		},
		prev : function() {
			var oThis = this;
			oThis.index--;
			if(oThis.index === -1) {
				oThis.index = oThis.num ;
				oThis.obj.style.left = (oThis.index +1) * (-oThis.width) +'px';
				oThis.index--;
			}
			this.move(this.index);
		},
		next: function () {
			var oThis = this;	
			oThis.index++;
			if(oThis.index === oThis.num) {
				oThis.index = 0;
				oThis.obj.style.left = 0;
			} 
			oThis.move(oThis.index);
		},
		move: function(index,callBack) {
			var oThis = this,
				translate = - (index +1) * oThis.width,
				flag = true,
				iSpeed = 0;
			// if( flag ) {
			// 	for (var i = 0; i < oThis.num; i++) {
			// 		oThis.paginationItem[i].className = '';
			// 	}
			// 	index === -1 ? index = oThis.num - 1 :'';
			// 	oThis.paginationItem[index].className = "active";
			// 	if( win.requestAnimationFrame ) {
			// 		win.cancelAnimationFrame(oThis.timer);
			// 		function animate() {
			// 			iSpeed = (translate - oThis.obj.offsetLeft) / 5;
			// 			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			// 			flag = false;
			// 			oThis.obj.style.left =  oThis.obj.offsetLeft + iSpeed + 'px';
			// 			if( iSpeed !== 0 ) {
			// 				oThis.timer = requestAnimationFrame(animate);
			// 			} else {
			// 				flag = true;
			// 			}
			// 		}
			// 		animate();
			// 	} else {
			// 		clearInterval(oThis.timer);
			// 		oThis.timer = setInterval(function () {
			// 			iSpeed = (translate - oThis.obj.offsetLeft) / 4;
			// 			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			// 			if( iSpeed === 0 ) {
			// 				flag = true;
			// 				clearInterval(oThis.timer);
			// 				callBack && callBack.call(oThis);
			// 			} else {
			// 				flag = false;
			// 				oThis.obj.style.left =  oThis.obj.offsetLeft + iSpeed + 'px';
			// 			}
			// 		}, 25);
			// 	}
			// }

			Math.easeout = function( A, B, rate, callback, crValue ) {
			    if ( A === B || typeof A !=='number' ||  typeof B !=='number' ) {
			        return;
			    }
			    B = B || 0;
			    rate = rate || 2;
			    crValue = crValue || 1;
			    var step = function() {
			        A = A + ( B - A ) / rate;
			        if ( A < crValue ) {
			            callback(B);
			            return ;
			        }
			        callback(A);
			        if ( !window.requestAnimationFrame ) {
			            requestAnimationFrame = function(fn) {
			                setTimeout(fn, 17);
			            };  
			        }
			        requestAnimationFrame(step); 
			    };
			    step();
			};

			Math.easeout( oThis.obj.offsetLeft, translate, 2, function (value) {
		        oThis.obj.style.left = value + 'px';
		    }, 1);
		},
		css : function(styelList) {
			var style = null;
			if (window.getComputedStyle) {
				style = window.getComputedStyle(this,null)[styelList];
			} else { 
				style = this.currentStyle[styelList];
			}
			return style;
		},
		extend : function(options,tag) {
		   for(var i in tag) {
			   	if( !(i in options) ) {
			   		options[i] = tag[i];
			   	}
		   }
		   return this;
		}
	};
	win.Carousel = Carousel;
})(window, document);