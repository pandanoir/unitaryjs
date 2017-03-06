import ContouredObject from './contouredobject.js';

export default class Graph extends ContouredObject {
    constructor(f, scale = 30) {
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