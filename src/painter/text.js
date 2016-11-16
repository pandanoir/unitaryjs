export default function(obj) {
    this.canvas.textAlign = obj.style.align;
    this.canvas.textBaseline = obj.style.baseline;
    const x = this.X(obj.P.x);
    const y = this.Y(obj.P.y);
    const maxWidth = obj.style.maxWidth;
    let defaultFont;
    if (obj.style.font !== null) {
        defaultFont = this.canvas.font;
        this.canvas.font = obj.style.font;
    }
    if (maxWidth === null) {
        if (obj.style.strokesOutline)
            this.canvas.strokeText(obj.text, x, y);
        this.canvas.fillText(obj.text, x, y);
    } else {
        if (obj.style.strokesOutline)
            this.canvas.strokeText(obj.text, x, y, maxWidth);
        this.canvas.fillText(obj.text, x, y, maxWidth);
    }
    if(obj.style.font !== null) this.canvas.font = defaultFont;
};
