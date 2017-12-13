;(function(win, doc) {
    function ImgLazy(params) {
        this.params = params || {};
        this.init(params);
    }
    ImgLazy.prototype = {
        init : function() {
            this.initParams();
            if ( !this.elements ) {
                return;
            }
            this.scrollTimer = null;
            this.addDefaultImg();
            this.scrollListener();
            this.addEvent(window, 'scroll', this.scrollListener);
            this.addEvent(window, 'resize', this.scrollListener);
            this.addEvent(window, 'resize', this.resizeListener);
        },

        // 初始化参数
        initParams : function() {
            var optionDefault = {
                    tag : 'data-src',
                    throtteTime : 16, 
                    distance : 0,
                    defaultImg : null
                },
                elements = null;
            this.extend(this.params, optionDefault);
            elements = document.querySelectorAll("["+ this.params.tag +"]");
            if ( !elements.length ) {
                return;
            }
            this.newElementsDomArr = Array.prototype.slice.call(elements, 0);
            // 判断是否第一次初始化插件
            if ( this.elements ) {
                this.elements.length !== 0 && this.clearListener();
                this.elements = this.elements.concat(this.newElementsDomArr);
            }
            this.elements = this.newElementsDomArr;
            this.getWH();
        },

        // 添加默认图片并且添加动态效果
        addDefaultImg : function() {
            var newElements = this.newElementsDomArr,
                defaultImg = this.params.defaultImg;
            newElements.forEach( function( item, index, arr ) {
                if ( defaultImg ) {
                    item.setAttribute('src', defaultImg)
                }
                item.style.webkitTransition = 'opacity 1s';
                item.style.opacity = .5;
                item.style.filter = "alpha(opacity = " + 50 + ")";
            });
        },

        // 滚动事件
        scrollListener : function() {
            if ( this.scrollTimer ) {
                return;
            }
            var oThis = this;
            this.scrollTimer = setTimeout( function() {
                this.scrollTimer = null;
                this.loadImg();
            }.bind(this), this.params.throtteTime);
        },

        // 浏览器改变大小事件
        resizeListener : function() {
            var oThis = this;
            oThis.getWH();
            oThis.loadImg();
        },

        // 判断是否加载真实的图片
        loadImg : function() {
            var len = this.elements.length,
                distance = this.params.distance,
                continueListener = false,
                distance = this.params.distance;

            for ( var i= 0; i < len ; i++ ) {
                var ele = this.elements[i];
                if ( !ele ) {
                    continue;
                }
                continueListener = true;
                // 获取元素距离浏览器视图边界的距离
                var rect = ele.getBoundingClientRect();
                if ( ( rect.top >= 0 && this.H + distance >= rect.top ) || ( rect.top < 0 && rect.top + rect.height >= -distance ) ) {
                    if ( ( rect.left >= 0 && this.W + distance >= rect.left) || (rect.left < 0 && (rect.left + rect.width >= -distance ) ) ) {
                        this.loadItem(ele);
                        this.elements.splice(i, 1, null);
                    }
                }
            }
            !continueListener && this.clearListener();
        },

        // 加载真实图片
        loadItem : function(ele) {
            var tag = this.params.tag,
                imgUrl = ele.getAttribute(tag);
            ele.setAttribute('src', imgUrl);
            ele.removeAttribute(tag);
            ele.style.opacity = 1;
            ele.style.filter = "alpha(opacity = " + 1 + ")";
        },

        // 清除绑定事件
        clearListener : function() {
            this.removeEvent(window, 'scroll', this.scrollListener);
            this.removeEvent(window, 'resize', this.scrollListener);
            this.removeEvent(window, 'resize', this.resizeListener);
        },

        // 获取浏览器宽高
        getWH: function() {
            this.W = document.documentElement.clientWidth || document.body.clientWidth;
            this.H = document.documentElement.clientHeight || document.body.clientHeight;
        },

        // 对象属性替换
        extend : function(options, tag) {
           for(var i in tag) {
                if( !(i in options) ) {
                    options[i] = tag[i];
                }
           }
           return this;
        },

        // 事件绑定,用bind来让addEventListener里面的this指向ImgLazy
        addEvent : function(dom, event, fn) {
            if( window.addEventListener ) {
                dom.addEventListener(event, fn.bind(this), false);
            } else if ( window.attachEvent ) {
                dom.attachEvent('on' + event, fn.bind(this));
            } else {
                dom['on' + event] = fn.bind(this);
            }
        },

        // 事件解除
        removeEvent : function(dom, event, fn) {
            if( window.addEventListener ) {
                dom.removeEventListener(event, fn.bind(this), false);
            } else if ( window.attachEvent ) {
                dom.detachEvent('on' + event, fn.bind(this));
            } else {
                dom['on' + event] = null;
            }
        }
    };
    win.ImgLazy = ImgLazy;
})(window, document);

// 1.imgList节点初始化的时候获取
// 2.绑定事件结束删除
// 3.去掉已经加载过url的imgItem
