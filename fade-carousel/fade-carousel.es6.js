class Carousel {
    constructor(obj, options) {
        this.obj = obj;
        this.parentNode = this.obj.parentNode;
        this.sliding = this.obj.querySelectorAll('li');
        this.num = this.sliding.length;
        this.pagination = this.parentNode.querySelector('#pagination');
        this.paginationItem = null;
        this.index = 0;
        this.timer = null;
        this.leftButton = this.obj.parentNode.querySelector('.carousel-left');
        this.rightButton = this.obj.parentNode.querySelector('.carousel-right');
        this.init(obj, options);
    }
    init(obj, options={}) {
        var oThis = this,
            optionDefault = {
                hasButton : false,
                haspagination : true,
                durtionTime : 3000
            };
        options = options;
        this.extend(options, optionDefault);
        this.sliding[0].style.zIndex = 1;
        this.sliding[0].style.opacity = 1;
        this.sliding[0].style.filter = "alpha(opacity = " + 100 + ")";
        if( this.num === 1 ) {
            this.pagination.style.display = 'none';
            return false;
        } else {
            for(var i=0; i<oThis.num; i++) {
                var a = document.createElement('a');
                oThis.pagination.appendChild(a);
            }
            oThis.paginationItem = oThis.pagination.querySelectorAll('a');
            oThis.paginationItem[0].className = 'active';
            if( options.hasButton ) {
                this.pagination.style.display = 'block';
            }
            if( !options.haspagination ) {
                this.pagination.style.display = 'none';
            }
            for(let j = 0;j < this.num; j++ ) {
                var tim = null;
                oThis.paginationItem[j].onmouseover = () => {
                    tim = setTimeout(function() {
                        oThis.index = j;
                        oThis.move(oThis.index);
                    }, 200);
                };
                oThis.paginationItem[j].onmouseout = () => {
                    clearTimeout(tim);
                };
            }
            this.autoTimer = setInterval(() => {
                this.next();
            }, options.durtionTime);
            oThis.parentNode.onmouseover = () => {
                if( options.hasButton ) {
                    oThis.leftButton.style.display = 'block';
                    oThis.rightButton.style.display = 'block';
                }
                clearInterval(oThis.autoTimer);
            };
            oThis.parentNode.onmouseout = () => {
                oThis.leftButton.style.display = 'none';
                oThis.rightButton.style.display = 'none';
                oThis.autoTimer = setInterval(() => {
                    this.next();
                }, options.durtionTime);
            };
            oThis.leftButton.onclick = () => {
                this.prev();
            };
            oThis.rightButton.onclick = () => {
                this.next();
            };
        }
    }
    prev() {
        this.index--;
        if(this.index === -1) {
            this.index = this.num -1;
        }
        this.move(this.index);
    }
    next() { 
        this.index++;
        if(this.index === this.num) {
            this.index = 0;
        } 
        this.move(this.index);
    }
    move(index, callBack) {
        var oThis = this,
            go = null,
            iSpeed = 0;
        for(var i = 0 ; i < this.num ; i++) {
            this.paginationItem[i].className = '';
            this.sliding[i].style.zIndex = 0;
            this.sliding[i].style.opacity = 0;
            this.sliding[i].style.filter = "alpha(opacity = " + 0 + ")";
        }
        this.paginationItem[index].className = "active";
        this.sliding[index].style.zIndex = 1;
        if( window.requestAnimationFrame ) {
            cancelAnimationFrame(oThis.timer);
            function animate() {
                iSpeed = (100 - oThis.css.call(oThis.sliding[index], 'opacity') * 100 ) / 10;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed) / 4;
                oThis.sliding[index].style.opacity = parseFloat(oThis.css.call(oThis.sliding[index], 'opacity')) + iSpeed / 100;
                oThis.sliding[index].style.filter = "alpha(opacity = " + iSpeed + oThis.css.call(oThis.sliding[index], 'opacity') + ")";
                if( iSpeed !== 0 ) {
                    oThis.timer = requestAnimationFrame(animate);
                }
            }
            animate();
        } else {
            clearInterval(this.timer);
            this.timer = setInterval(function() {
                iSpeed = (100 - oThis.css.call(oThis.sliding[index], 'opacity') * 100 ) / 10 ;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if( iSpeed === 0 ) {
                    clearInterval(oThis.timer);
                    callBack && callBack.call(oThis);
                } else {
                    oThis.sliding[index].style.opacity = parseFloat(oThis.css.call(oThis.sliding[index], 'opacity')) + iSpeed / 100;
                    oThis.sliding[index].style.filter = "alpha(opacity = " + iSpeed + oThis.css.call(oThis.sliding[index], 'opacity') + ")";
                }
            },40);
        }
    }
    css(styelList) {
        let style = null;
        if ( window.getComputedStyle ) {
            style = window.getComputedStyle(this,null)[styelList];
        } else { 
            style = this.currentStyle[styelList];
        }
        return style;
    }
    extend(options, tag) {
       for(var i in tag) {
            if( !(i in options) ) {
                options[i] = tag[i];
            }
       }
       return this;
    }
}
