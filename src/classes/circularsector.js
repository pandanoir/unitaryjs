import ContouredObject from './contouredobject.js';
import {Vector} from './vector.js';
import {nearlyEquals as eq} from '../utility.js';

export default class CircularSector extends ContouredObject {
    constructor(center, radius, endAngle, startAngle = 0) {
        super();
        this.center = center;
        this.r = radius;
        this.endAngle = endAngle;
        this.startAngle = startAngle;
        this.anticlockwise = false;
    }
    get Origin() { return this.center; }
    get radius() { return this.r; }
    clone() {
        const res = new CircularSector(this.center, this.r, this.endAngle, this.startAngle).setStyle(this.style);
        for (const key of Object.keys(this)) {
            if (key === 'style') continue;
            res[key] = this[key];
        }
        return res;
    }
    moveTo(x, y) {
        if (this.center.x === x && this.center.y === y) return this;
        const res = this.clone();
        res.center = this.center.moveTo(x, y);
        return res;
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;
        const res = this.clone();
        res.center = this.center.move(dx, dy);
        return res;
    }
    rotate(rad) {
        if (rad % (2 * Math.PI) === 0) return this;
        const res = this.clone();
        res.endAngle += rad;
        res.startAngle += rad;
        return res;
    }
    equals(C) {
        const angleCompare = (A, B) => (A - B) % (2 * Math.PI) === 0;
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) && eq(this.r, C.r) && angleCompare(this.startAngle, C.startAngle) && angleCompare(this.endAngle, C.endAngle);
    }
    has(P) {
        const theta = Math.atan2(P.y, P.x);
        return new Vector(P).subtract(new Vector(this.center)).abs() <= this.r &&
            this.startAngle <= theta &&
            theta <= this.endAngle;
    }
    setAnticlockwise(anticlockwise) {
        if (this.anticlockwise === anticlockwise) return this;
        const res = this.clone();
        res.anticlockwise = anticlockwise;
        return res;
    }
    name() { return 'CircularSector'; }
}
