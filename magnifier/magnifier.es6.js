class Magnifier {
    constructor(obj, options) {
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
    init(obj, options) {
        let oThis = this;
        oThis.magnifierBig.style.display = 'none';
        this.magnifierMove.style.width = this.magnifierWidth / this.scaleWidth + 'px';
        this.magnifierMove.style.height = this.magnifierHeight / this.scaleHeight + 'px';
        this.magnifierSmall.onmousemove = (event) => {
            oThis.goMove(event);
        };
        this.magnifierSmall.onmouseout = () => {
            oThis.magnifierMove.style.display = oThis.magnifierBig.style.display = 'none';
        };
    }
    goMove(event) {
        var event = event || window.event,
            x = event.clientX ,
            y = event.clientY ;
        this.magnifierMove.style.display = this.magnifierBig.style.display = 'block';
        x = x - this.magnifierSmall.getBoundingClientRect().left - this.magnifierMove.offsetWidth / 2;
        y =  y - this.magnifierSmall.getBoundingClientRect().top -  this.magnifierMove.offsetHeight / 2;
        x = Math.max(0, Math.min(this.magnifierWidth - this.magnifierMove.offsetWidth, x));
        y = Math.max(0, Math.min(this.magnifierHeight - this.magnifierMove.offsetHeight,  y));
        this.magnifierMove.style.left = x + 'px';
        this.magnifierMove.style.top = y + 'px';
        this.magnifierBig.scrollLeft = this.scaleWidth * x ;
        this.magnifierBig.scrollTop = this.scaleHeight * y ;
    }
}

