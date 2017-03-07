import ContouredObject from './contouredobject.js';
import {Vector} from './vector.js';
import {abs, sign} from '../utility.js';

export default class Ellipse extends ContouredObject {
    constructor(center, a, b) {
        super();
        this.center = this.Origin = center;
        this.a = a;
        this.b = b;
        this.majorAxis = 2 * Math.max(a, b);
        this.minorAxis = 2 * Math.min(a, b);
        this.anticlockwise = false;
        this.angle = 0;
    }
    moveTo(x, y) {
        if (this.center.x === x && this.center.y === y) return this;
        return new Ellipse(this.center.moveTo(x, y), this.a, this.b).setStyle(this.style).setAnticlockwise(this.anticlockwise);
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;
        return new Ellipse(this.center.move(dx, dy), this.a, this.b).setStyle(this.style).setAnticlockwise(this.anticlockwise);
    }
    rotate(rad) {
        if (rad % (2 * Math.PI) === 0) return this;
        const newEllipse = new Ellipse(this.center, this.a, this.b)
            .setStyle(this.style)
            .setAnticlockwise(this.anticlockwise);
        newEllipse.angle = this.angle + rad;
        return newEllipse;
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
        const newEllipse = new Ellipse(this.center, this.a, this.b).setStyle(this.style);
        newEllipse.anticlockwise = anticlockwise;
        return newEllipse;
    }
    name() { return 'Ellipse'; }
}
