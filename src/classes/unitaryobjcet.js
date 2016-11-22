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
        for (const key of Object.keys(style)) {
            this.style[key] = style[key];
        }
        return this;
    }
    move(dx, dy) { return this; }
    moveX(dx) { return this.move(dx, 0); }
    moveY(dy) { return this.move(0, dy); }
    has(P) { return false; }
    name() { return 'UnitaryObject'; }
}
