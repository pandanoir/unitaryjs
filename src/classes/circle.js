import ContouredObject from './contouredobject.js';
import {Vector} from './vector.js';
import {abs, sign, nearlyEquals as eq} from '../utility.js';

export default class Circle extends ContouredObject {
    constructor(center, radius) {
        super();
        this.center = center;
        this.r = radius;
        this.anticlockwise = false;
        this._propsToCopy = this._propsToCopy.concat('anticlockwise');
    }
    get Origin() { return this.center; }
    get radius() { return this.r; }
    moveTo(x, y) {
        if (this.center.x === x && this.center.y === y) return this;

        return new Circle(this.center.moveTo(x, y), this.radius).copyFrom(this);
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;

        return new Circle(this.center.move(dx, dy), this.radius).copyFrom(this);
    }
    getEquation() {
        return `(x${this.center.x === 0 ? '' : sign(-this.center.x) + abs(this.center.x)})^2+(y${this.center.y === 0 ? '' : sign(-this.center.y) + abs(this.center.y)})^2=${this.r}^2`
    }
    equals(C) {
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) && eq(this.r, C.r);
    }
    has(P) {
        return new Vector(P).subtract(new Vector(this.center)).abs() <= this.r;
    }
    setAnticlockwise(anticlockwise) {
        if (this.anticlockwise === anticlockwise) return this;

        const res = new Circle(this.center, this.radius).copyFrom(this);
        res.anticlockwise = anticlockwise;

        return res;
    }
    name() { return 'Circle'; }
}
