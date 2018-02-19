import ContouredObject from './contouredobject.js';
import {Vector} from './vector.js';
import {abs, sign} from '../utility.js';

export default class Ellipse extends ContouredObject {
    constructor(center, a, b) {
        super();
        this.center = center;
        this.a = a;
        this.b = b;
        this.majorAxis = 2 * Math.max(a, b);
        this.minorAxis = 2 * Math.min(a, b);
        this.anticlockwise = false;
        this.angle = 0;
        this._propsToCopy = this._propsToCopy.concat(['anticlockwise', 'angle']);
    }
    get Origin() { return this.center; }
    moveTo(x, y) {
        if (this.center.x === x && this.center.y === y) return this;

        return new Ellipse(this.center.moveTo(x, y), this.a, this.b).copyFrom(this);
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;

        return new Ellipse(this.center.move(dx, dy), this.a, this.b).copyFrom(this);
    }
    rotate(rad) {
        if (rad % (2 * Math.PI) === 0) return this;
        const res = new Ellipse(this.center, this.a, this.b).copyFrom(this);
        res.angle += rad;
        return res;
    }
    equals(C) {
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) && this.a === C.a && this.b === C.b;
    }
    has(P) {
        P = P.rotate(-this.angle, this.center);
        return Math.pow((P.x - this.center.x) / this.a, 2) + Math.pow((P.y - this.center.y) / this.b, 2) <= 1;
    }
    setAnticlockwise(anticlockwise) {
        if (this.anticlockwise === anticlockwise) return this;

        const res = new Ellipse(this.center, this.a, this.b).copyFrom(this);
        res.anticlockwise = anticlockwise;
        return res;
    }
    name() { return 'Ellipse'; }
}
