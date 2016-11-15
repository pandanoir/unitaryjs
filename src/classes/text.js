import UnitaryObject from './unitaryobjcet.js';

export default class Text_ extends UnitaryObject {
    constructor(str, P, align = 'left', maxWidth = null) {
        super();
        this.P = P;
        this.string = str;
        this.text = str;
        this.strokesOutline = false;
        this.style.align = align;
        this.style.maxWidth = maxWidth;
        this.style.fillStyle = '#000';
        this.style.outlineColor = '#000';
        this.style.baseline = 'alphabetic';
        this.style.font = null;
    }
    strokeOutline() {
        this.strokesOutline = true;
        return this;
    }
    setAlign(align) {
        this.style.align = align;
        return this;
    }
    setOutlineColor(color) {
        this.style.outlineColor = color;
        return this;
    }
    setBaseline(base) {
        this.style.baseline = base;
        return this;
    }
    setFont(font) {
        this.style.font = font;
        return this;
    }
    move(dx, dy) {
        const newText = new Text_(this.string, this.P.move(dx, dy), this.style.align, this.style.maxWidth).setStyle(this.style);
        if (this.strokesOutline) {
            newText.strokeOutline();
        }
        return newText;
    }
    name() { return 'Text'; }
}
