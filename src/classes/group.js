import ContouredObject from './contouredobject.js';

export default class Group extends ContouredObject {
    constructor(...args) {
        super();
        if (Array.isArray(args[0])) this.group = args[0];
        else this.group = args;
    }
    has(P) {
        for (let i = 0, _i = this.group.length; i < _i; i++) {
            if (this.group[i].has && this.group[i].has(P)) return true;
        }
        return false;
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;

        return new Group(this.group.map(g => g.move(dx, dy))).copyFrom(this);
    }
    rotate(rad, center) {
        if (rad % (2 * Math.PI) === 0) return this;

        return new Group(this.group.map(g => g.rotate(rad, center))).copyFrom(this);
    }
    push(...objs) {
        return new Group(this.group.concat(objs)).copyFrom(this);
    }
    name() { return 'Group'; }
}
