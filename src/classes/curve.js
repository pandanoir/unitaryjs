import ContouredObject from './contouredobject.js';

export default class Curve extends ContouredObject {
    constructor(x, y, scale = 30) {
        super();
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.start = 0;
        this.end = 2 * Math.PI;
    }
    setRange(start, end) {
        this.start = start;
        this.end = end;
        return this;
    }
    equals() { return false; }
    moveX() {}
    moveY() {}
    name() { return 'Curve'; }
}
