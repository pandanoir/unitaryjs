import ContouredObject from './contouredobject.js';
import {Vector} from './vector.js';
import {nearlyEquals as eq} from '../utility.js';

export default class Polygon extends ContouredObject {
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
        if (dx === 0 && dy === 0) return this;
        const points = [];
        for (let i = 0, len = this.points.length; i < len; i = 0|i+1) {
            points[i] = this.points[i].move(dx, dy);
        }
        return new Polygon(points).setStyle(this.style);
    }
    rotate(rad, center) {
        if (rad % (2 * Math.PI) === 0) return this;
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
            if (a.abs() === 0 || b.abs() === 0) return true; // v == P || before_v == p
            cos = a.product(b) / (a.abs() * b.abs());
            rad += Math.acos(cos);
            before_v = v;
        }
        return eq(rad, 0) || eq(rad, 2 * Math.PI);
    }
    name() { return 'Polygon'; }
}
