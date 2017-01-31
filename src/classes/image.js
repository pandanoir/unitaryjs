import UnitaryObject from './unitaryobject.js';
import Point from './point.js';

export default class Image_ extends UnitaryObject {
    constructor(src, startPoint) {
        super();
        this.src = src;
        this.startPoint = startPoint;
        this.dx = startPoint.x;
        this.dy = startPoint.y;
        this.dw = null;
        this.dh = null;
        this.sw = null;
        this.sh = null;
        this.sx = null;
        this.sy = null;
    }
    trim(startPoint, sw, sh, dw = null, dh = null) {
        const newImage = new Image_(this.src, this.startPoint);
        if (dw == null) {
            dw = sw;
        }
        if (dh == null) {
            dh = sh;
        }
        newImage.sx = startPoint.x;
        newImage.sy = startPoint.y;
        newImage.sw = sw;
        newImage.sh = sh;
        newImage.dw = dw;
        newImage.dh = dh;
        return newImage;
    };
    resize(dw, dh) {
        const newImage = new Image_(this.src, this.startPoint);
        newImage.dw = dw;
        newImage.dh = dh;
        newImage.sw = this.sw;
        newImage.sh = this.sh;
        newImage.sx = this.sx;
        newImage.sy = this.sy;
        return newImage;
    }
    equals(B) {
        if (!super.equals(B)) {
            return false;
        }
        return this.src === B.src && this.dx === B.dx && this.dy === B.dy && this.dw === B.dw && this.dh === B.dh && this.sw === B.sw && this.sh === B.sh && this.sx === B.sx && this.sy === B.sy;
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;
        let newImage = new Image_(this.src, this.startPoint.move(dx, dy));
        if (this.sx !== null) {
            newImage = newImage.trim(new Point(this.sx, this.sy), this.sw, this.sh, this.dw, this.dh);
        }
        return newImage;
    }
    name() { return 'Image'; }
}
