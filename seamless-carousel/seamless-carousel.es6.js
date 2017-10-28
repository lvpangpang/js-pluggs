class Carousel {
    constructor(obj, options) {
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
    init(obj , options) {
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
                var a = document.createElement('a');
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
            oThis.parentNode.onmouseover = () => {
                if( options.hasButton ) {
                    this.leftButton.style.display = 'block';
                    this.rightButton.style.display = 'block';
                }
                clearInterval(oThis.autoTimer);
            };
            oThis.parentNode.onmouseout = () => {
                this.leftButton.style.display = 'none';
                this.rightButton.style.display = 'none';
                this.autoTimer = setInterval( () => {
                    this.next();
                }, options.durtionTime);
            };
            oThis.leftButton.onclick = () => {
                this.prev();
            };
            oThis.rightButton.onclick = () => {
                console.log(this);
                this.next();
            };
            for(let j=0; j<oThis.num; j++) {
                var tim = null;
                oThis.paginationItem[j].onmouseover = () => {
                    tim = setTimeout(() => {
                        this.index = j;
                        this.move(oThis.index);
                    }, 200);
                };
                oThis.paginationItem[j].onmouseout = () => {
                    clearTimeout(tim);
                };
            }
        } else {
            oThis.obj.style.left = 0;
            oThis.leftButton.style.display = 'none';
            oThis.rightButton.style.display = 'none';
        }
    }
    prev() {
        var oThis = this;
        oThis.index--;
        if(oThis.index === -1) {
            oThis.index = oThis.num ;
            oThis.obj.style.left = (oThis.index +1) * (-oThis.width) +'px';
            oThis.index--;
        }
        this.move(this.index);
    }
    next() {
        var oThis = this;   
        oThis.index++;
        if(oThis.index === oThis.num) {
            oThis.index = 0;
            oThis.obj.style.left = 0;
        } 
        oThis.move(oThis.index);
    }
    move(index, callBack) {
        var oThis = this,
            translate = - (index +1) * oThis.width,
            flag = true,
            iSpeed = 0;
        if( flag ) {
            for (var i = 0; i < oThis.num; i++) {
                oThis.paginationItem[i].className = '';
            }
            index === -1 ? index = oThis.num - 1 :'';
            oThis.paginationItem[index].className = "active";
            if( window.requestAnimationFrame ) {
                window.cancelAnimationFrame(oThis.timer);
                function animate() {
                    iSpeed = (translate - oThis.obj.offsetLeft) / 10;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                    flag = false;
                    oThis.obj.style.left =  oThis.obj.offsetLeft + iSpeed + 'px';
                    if( iSpeed !== 0 ) {
                        oThis.timer = requestAnimationFrame(animate);
                    } else {
                        flag = true;
                    }
                }
                animate();
            } else {
                clearInterval(oThis.timer);
                oThis.timer = setInterval(function () {
                    iSpeed = (translate - oThis.obj.offsetLeft) / 10;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                    if( iSpeed === 0 ) {
                        flag = true;
                        clearInterval(oThis.timer);
                        callBack && callBack.call(oThis);
                    } else {
                        flag = false;
                        oThis.obj.style.left =  oThis.obj.offsetLeft + iSpeed + 'px';
                    }
                }, 25);
            }
        }
    }
    css(styelList) {
        var style = null;
        if ( window.getComputedStyle ) {
            style = window.getComputedStyle(this,null)[styelList];
        } else { 
            style = this.currentStyle[styelList];
        }
        return style;
    }
    extend( options,tag ) {
       for(var i in tag) {
            if( !(i in options) ) {
                options[i] = tag[i];
            }
       }
       return this;
    }
}