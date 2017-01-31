import UnitaryObject from './unitaryobject.js';

export default class Group extends UnitaryObject {
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
        const newGroup = this.group.concat();
        for (let i = 0, _i = newGroup.length; i < _i; i = 0|i+1) {
            if (newGroup[i].move) newGroup[i] = newGroup[i].move(dx, dy);
        }
        return new Group(newGroup);
    }
    push(...objs) {
        return new Group(this.group.concat(objs));
    }
    name() { return 'Group'; }
}
