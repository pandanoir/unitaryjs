import UnitaryObject from './unitaryobject.js';
import {Vector} from './vector.js';

export default class Point extends UnitaryObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
    moveTo(x, y) {
        if (this.x === x && this.y === y) return this;
        return new Point(x, y).setStyle(this.style);
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;
        return new Point(this.x + dx, this.y + dy).setStyle(this.style);
    }
    rotate(rad, center) {
        if (rad % (2 * Math.PI) === 0) return this;
        const x = Math.cos(rad) * (this.x - center.x) - Math.sin(rad) * (this.y - center.y) + center.x;
        const y = Math.sin(rad) * (this.x - center.x) + Math.cos(rad) * (this.y - center.y) + center.y;
        return new Point(x, y);
    }
    toString() { return '(' + this.x + ', ' + this.y + ')'; }
    inspect() { return '(' + this.x + ', ' + this.y + ')'; }
    equals(B) {
        if (!super.equals(B)) {
            return false;
        }
        return this.x === B.x && this.y === B.y;
    }
    toVector() {
        return new Vector(this.x, this.y);
    }
    name() { return 'Point'; }
}
