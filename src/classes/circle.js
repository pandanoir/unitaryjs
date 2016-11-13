import UnitaryObject from './unitaryobjcet.js';
import {Vector} from './vector.js';
import {abs, sign} from '../utility.js';

export default class Circle extends UnitaryObject {
    constructor(center, radius) {
        super();
        this.center = center;
        this.Origin = center;
        this.r = radius;
        this.radius = radius;
        this.anticlockwise = false;
    }
    moveTo(x, y) {
        return new Circle(this.center.moveTo(x, y), this.r).setStyle(this.style).setAnticlockwise(this.anticlockwise);
    }
    move(dx, dy) {
        return new Circle(this.center.move(dx, dy), this.r).setStyle(this.style).setAnticlockwise(this.anticlockwise);
    }
    getEquation() {
        let res = '(x';
        if (this.center.x !== 0) res += sign(-this.center.x) + abs(this.center.x);
        res += ')^2+(y';
        if (this.center.y !== 0) res += sign(-this.center.y) + abs(this.center.y);
        res += ')^2=' + this.r + '^2';
        return res;
    }
    equals(C) {
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) && this.r === C.r;
    }
    has(P) {
        return new Vector(P).substract(new Vector(this.center)).abs() <= this.r;
    }
    setAnticlockwise(anticlockwise) {
        const newCircle = new Circle(this.center, this.r).setStyle(this.style);
        newCircle.anticlockwise = anticlockwise;
        return newCircle;
    }
    name() { return 'Circle'; }
}
