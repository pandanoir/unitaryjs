import ContouredObject from './contouredobject.js';
import {Vector} from './vector.js';

export default class CircularSector extends ContouredObject {
    constructor(center, radius, endAngle, startAngle = 0) {
        super();
        this.center = center;
        this.Origin = center;
        this.radius = radius;
        this.r = radius;
        this.endAngle = endAngle;
        this.startAngle = startAngle;
        this.anticlockwise = false;
    }
    moveTo(x, y) {
        if (this.center.x === x && this.center.y === y) return this;
        return new CircularSector(this.center.moveTo(x, y), this.r, this.endAngle, this.startAngle)
            .setStyle(this.style)
            .setAnticlockwise(this.anticlockwise);
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;
        return new CircularSector(this.center.move(dx, dy), this.r, this.endAngle, this.startAngle)
            .setStyle(this.style)
            .setAnticlockwise(this.anticlockwise);
    }
    rotate(rad) {
        if (rad % (2 * Math.PI) === 0) return this;
        return new CircularSector(this.center, this.r, this.endAngle + rad, this.startAngle + rad)
            .setStyle(this.style)
            .setAnticlockwise(this.anticlockwise);
    }
    equals(C) {
        const angleCompare = (A, B) => (A - B) % (2 * Math.PI) === 0;
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) && this.r === C.r && angleCompare(this.startAngle, C.startAngle) && angleCompare(this.endAngle, C.endAngle);
    }
    has(P) {
        const theta = Math.atan2(P.y, P.x);
        return new Vector(P).subtract(new Vector(this.center)).abs() <= this.r &&
            this.startAngle <= theta &&
            theta <= this.endAngle;
    }
    setAnticlockwise(anticlockwise) {
        const newCircularSector =  new CircularSector(this.center, this.r, this.endAngle, this.startAngle).setStyle(this.style);
        newCircularSector.anticlockwise = anticlockwise;
        return newCircularSector;
    }
    name() { return 'CircularSector'; }
}
