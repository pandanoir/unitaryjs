import ContouredObject from './contouredobject.js';
import {Vector} from './vector.js';
import {nearlyEquals as eq} from '../utility.js';

export default class Doughnut extends ContouredObject {
    constructor(center, innerRadius, outerRadius) {
        super();
        this.center = center;
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
    }
    get Origin() {
        return this.center;
    }
    moveTo(x, y) {
        if (this.center.x === x && this.center.y === y) return this;

        return new Doughnut(this.center.moveTo(x, y), this.innerRadius, this.outerRadius).copyFrom(this);
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;

        return new Doughnut(this.center.move(dx, dy), this.innerRadius, this.outerRadius).copyFrom(this);
    }
    equals(C) {
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) &&
            eq(this.innerRadius, C.innerRadius) &&
            eq(this.outerRadius, C.outerRadius);
    }
    has(P) {
        const distance = new Vector(P).subtract(new Vector(this.center)).abs();
        return  (this.innerRadius < distance || eq(this.innerRadius, distance)) &&
            (distance < this.outerRadius || eq(distance, this.outerRadius));
    }
    name() { return 'Doughnut'; }
}
