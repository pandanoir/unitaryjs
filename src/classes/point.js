import UnitaryObject from './unitaryobject.js';
import {Vector} from './vector.js';
import {nearlyEquals as eq} from '../utility.js';

export default class Point extends UnitaryObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
    moveTo(x, y) {
        if (this.x === x && this.y === y) return this;
        return new Point(x, y).copyFrom(this);
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;
        return new Point(this.x + dx, this.y + dy).copyFrom(this);
    }
    rotate(rad, center) {
        if (rad % (2 * Math.PI) === 0) return this;
        const dx = this.x - center.x,
            dy = this.y - center.y;
        const x = Math.cos(rad)*dx - Math.sin(rad)*dy + center.x;
        const y = Math.sin(rad)*dx + Math.cos(rad)*dy + center.y;
        return new Point(x, y).copyFrom(this);
    }
    toString() { return '(' + this.x + ', ' + this.y + ')'; }
    inspect() { return '(' + this.x + ', ' + this.y + ')'; }
    equals(B) {
        if (!super.equals(B)) {
            return false;
        }
        return eq(this.x, B.x) && eq(this.y, B.y);
    }
    toVector() {
        return new Vector(this.x, this.y);
    }
    static fromPolar(r, theta) {
        return new Point(r*Math.cos(theta), r*Math.sin(theta));
    }
    name() { return 'Point'; }
}
