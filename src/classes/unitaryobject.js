import {copy} from '../utility.js';
export default class UnitaryObject {
    constructor() {
        this.style = {
            fillStyle: null,
            strokeStyle: null
        };
        this._propsToCopy = ['style'];
    }
    equals(B) { return this.name() === B.name(); }
    setFillColor(color) { this.style.fillStyle = color; return this; }
    setFillStyle(color) { this.style.fillStyle = color; return this; }
    setStrokeColor(color) { this.style.strokeStyle = color; return this; }
    setStrokeStyle(color) { this.style.strokeStyle = color; return this; }
    copyFrom(obj) {
        for (let i = 0, _i = obj._propsToCopy.length; i < _i; i++) {
            const prop = obj._propsToCopy[i];
            this[prop] = copy(obj[prop]);
        }
        return this;
    }
    move(dx, dy) { return this; }
    moveX(dx) { return this.move(dx, 0); }
    moveY(dy) { return this.move(0, dy); }
    has(P) { return false; }
    name() { return 'UnitaryObject'; }
}
