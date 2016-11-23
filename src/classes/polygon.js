import UnitaryObject from './unitaryobject.js';
import {Vector} from './vector.js';
import {nearlyEqualsZero} from '../utility.js';

export default class Polygon extends UnitaryObject {
    constructor(...args) {
        super();
        const points = 1 <= args.length ? args : [];
        if (Array.isArray(points[0])) {
            this.points = points[0];
        } else {
            this.points = points;
        }
    }
    equals() {
        return false;
    }
    move(dx, dy) {
        const points = [];
        for (let i = 0, len = this.points.length; i < len; i = 0|i+1) {
            points[i] = this.points[i].move(dx, dy);
        }
        return new Polygon(points).setStyle(this.style);
    }
    rotate(rad, center) {
        const points = [];
        for (let i = 0, len = this.points.length; i < len; i = 0|i+1) {
            points[i] = this.points[i].rotate(rad, center);
        }
        return new Polygon(points).setStyle(this.style);
    }
    has(P) {
        let a, b, cos, v;
        let before_v = this.points[this.points.length - 1];
        let rad = 0;
        for (let i = 0, len = this.points.length; i < len; i = 0|i+1) {
            v = this.points[i];
            a = new Vector(v).subtract(new Vector(P));
            b = new Vector(before_v).subtract(new Vector(P));
            cos = a.product(b) / (a.abs() * b.abs());
            rad += Math.acos(cos);
            before_v = v;
        }
        return nearlyEqualsZero(rad / (2 * Math.PI) * 360 - 360);
    }
    name() { return 'Polygon'; }
}
