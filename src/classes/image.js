import UnitaryObject from './unitaryobject.js';
import Point from './point.js';

export default class Image_ extends UnitaryObject {
    constructor(src, startPoint) {
        super();
        this.src = src;
        this.startPoint = startPoint;
        this.dw = null;
        this.dh = null;
        this.sw = null;
        this.sh = null;
        this.sx = null;
        this.sy = null;
    }
    get dx() { return this.startPoint.x; }
    get dy() { return this.startPoint.y; }
    clone() {
        const res = new Image_(this.src, this.startPoint).setStyle(this.style);
        for (const key of Object.keys(this)) {
            if (key === 'style') continue;
            res[key] = this[key];
        }
        return res;
    }
    trim(startPoint, sw, sh, dw = sw, dh = sh) {
        const newImage = this.clone();
        newImage.sx = startPoint.x;
        newImage.sy = startPoint.y;
        newImage.sw = sw;
        newImage.sh = sh;
        newImage.dw = dw;
        newImage.dh = dh;
        return newImage;
    };
    resize(dw, dh) {
        const newImage = this.clone();
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
        const res = this.clone();
        res.startPoint = this.startPoint.move(dx, dy);
        return res;
    }
    name() { return 'Image'; }
}
