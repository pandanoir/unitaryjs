export default class UnitaryObject {
    constructor() {
        this.style = {
            fillStyle: null,
            strokeStyle: null
        };
    }
    equals(B) { return this.name() === B.name(); }
    setFillColor(color) { this.style.fillStyle = color; return this; }
    setFillStyle(color) { this.style.fillStyle = color; return this; }
    setStrokeColor(color) { this.style.strokeStyle = color; return this; }
    setStrokeStyle(color) { this.style.strokeStyle = color; return this; }
    setStyle(style) {
        const keys = Object.keys(style);
        for (let i = 0, _i = keys.length; i < _i; i++) {
            this.style[keys[i]] = style[keys[i]];
        }
        return this;
    }
    move(dx, dy) { return this; }
    moveX(dx) { return this.move(dx, 0); }
    moveY(dy) { return this.move(0, dy); }
    has(P) { return false; }
    name() { return 'UnitaryObject'; }
}
