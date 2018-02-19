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

        this._propsToCopy = this._propsToCopy.concat(['dw', 'dh', 'sw', 'sh', 'sx', 'sy']);
    }
    get dx() { return this.startPoint.x; }
    get dy() { return this.startPoint.y; }
    trim(startPoint, sw, sh, dw = sw, dh = sh) {
        const res = new Image_(this.src, this.startPoint).copyFrom(this);
        res.sx = startPoint.x;
        res.sy = startPoint.y;
        res.sw = sw;
        res.sh = sh;
        res.dw = dw;
        res.dh = dh;
        return res;
    };
    resize(dw, dh) {
        const res = new Image_(this.src, this.startPoint).copyFrom(this);
        res.dw = dw;
        res.dh = dh;
        res.sw = this.sw;
        res.sh = this.sh;
        res.sx = this.sx;
        res.sy = this.sy;
        return res;
    }
    equals(B) {
        if (!super.equals(B)) {
            return false;
        }
        return this.src === B.src && this.dx === B.dx && this.dy === B.dy && this.dw === B.dw && this.dh === B.dh && this.sw === B.sw && this.sh === B.sh && this.sx === B.sx && this.sy === B.sy;
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;

        const res = new Image_(this.src, this.startPoint.move(dx, dy)).copyFrom(this);
        return res;
    }
    name() { return 'Image'; }
}
