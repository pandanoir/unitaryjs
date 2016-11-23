import ContouredObject from './contouredobject.js';
import {Vector} from './vector.js';

export default class Doughnut extends ContouredObject {
    constructor(center, innerRadius, outerRadius) {
        super();
        this.center = center;
        this.Origin = center;
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
    }
    moveTo(x, y) {
        return new Doughnut(this.center.moveTo(x, y), this.innerRadius, this.outerRadius).setStyle(this.style);
    }
    move(dx, dy) {
        return new Doughnut(this.center.move(dx, dy), this.innerRadius, this.outerRadius).setStyle(this.style);
    }
    equals(C) {
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) && this.innerRadius === C.innerRadius && this.outerRadius === C.outerRadius;
    }
    has(P) {
        const distance = new Vector(P).subtract(new Vector(this.center)).abs();
        return  this.innerRadius <= distance && distance <= this.outerRadius;
    }
    name() { return 'Doughnut'; }
}
