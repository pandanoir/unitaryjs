import ContouredObject from './contouredobject.js';
import {Vector} from './vector.js';
import {abs, sign} from '../utility.js';

export default class Circle extends ContouredObject {
    constructor(center, radius) {
        super();
        this.center = center;
        this.Origin = center;
        this.r = radius;
        this.radius = radius;
        this.anticlockwise = false;
    }
    moveTo(x, y) {
        if (this.center.x === x && this.center.y === y) return this;
        return new Circle(this.center.moveTo(x, y), this.r).setStyle(this.style).setAnticlockwise(this.anticlockwise);
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;
        return new Circle(this.center.move(dx, dy), this.r).setStyle(this.style).setAnticlockwise(this.anticlockwise);
    }
    getEquation() {
        return `(x${this.center.x === 0 ? '' : sign(-this.center.x) + abs(this.center.x)})^2+(y${this.center.y === 0 ? '' : sign(-this.center.y) + abs(this.center.y)})^2=${this.r}^2`
    }
    equals(C) {
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) && this.r === C.r;
    }
    has(P) {
        return new Vector(P).subtract(new Vector(this.center)).abs() <= this.r;
    }
    setAnticlockwise(anticlockwise) {
        if (this.anticlockwise === anticlockwise) return this;
        const newCircle = new Circle(this.center, this.r).setStyle(this.style);
        newCircle.anticlockwise = anticlockwise;
        return newCircle;
    }
    name() { return 'Circle'; }
}
