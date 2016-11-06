export default function(obj) {
    this.canvas.textAlign = obj.style.align;
    this.canvas.textBaseline = obj.style.baseline;
    const x = obj.P.x;
    const y = obj.P.y;
    const maxWidth = obj.style.maxWidth;
    let defaultFont;
    if (obj.style.font !== null) {
        defaultFont = this.canvas.font;
        this.canvas.font = obj.style.font;
    }
    if (maxWidth === null) {
        if (obj.style.strokesOutline)
            this.canvas.strokeText(obj.text, this.X(x), this.Y(y));
        this.canvas.fillText(obj.text, this.X(x), this.Y(y));
    } else {
        if (obj.style.strokesOutline)
            this.canvas.strokeText(obj.text, this.X(x), this.Y(y), maxWidth);
        this.canvas.fillText(obj.text, this.X(x), this.Y(y), maxWidth);
    }
    if(obj.style.font !== null) this.canvas.font = defaultFont;
};
