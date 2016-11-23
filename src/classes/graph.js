import UnitaryObject from './unitaryobject.js';

export default class Graph extends UnitaryObject {
    constructor(f, scale) {
        super();
        this.f = f;
        this.scale = scale;
        this.start = null;
        this.end = null;
    }
    setRange(start, end) {
        this.start = start;
        this.end = end;
        return this;
    }
    equals() { return false; }
    moveX() {}
    moveY() {}
    name() { return 'Graph'; }
}
