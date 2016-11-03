import UnitaryObject from './unitaryobjcet.js';
import {Vector} from './vector.js';

export default class Circle extends UnitaryObject {
    constructor(center, radius) {
        super();
        this.center = center;
        this.Origin = center;
        this.r = radius;
        this.radius = radius;
    }
    moveTo(x, y) {
        return new Circle(this.center.moveTo(x, y), this.r).setStyle(this.style);
    }
    move(dx, dy) {
        return new Circle(this.center.move(dx, dy), this.r).setStyle(this.style);
    }
    getEquation() {
        let res = '(x';
        if (this.center.x > 0) res += '-' + this.center.x;
        else if (this.center.x < 0) res += '+' + (-this.center.x); // + abs(this.center.x)
        res += ')^2+(y';
        if (this.center.y > 0) res += '-' + this.center.y;
        else if (this.center.y < 0) res += '+' + (-this.center.y); // + abs(this.center.x)
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
    name() { return 'Circle'; }
}
