export default function(obj) {
    this.canvas.beginPath();
    if (obj.b === 0) {
        this.canvas.moveTo(this.X(-obj.c), 0);
        this.canvas.lineTo(this.X(-obj.c), this.canvasHeight);
    } else {
        this.canvas.moveTo(0, this.Y(-(obj.c / obj.b)));
        this.canvas.lineTo(this.canvasWidth, this.Y(-(obj.a * this.canvasWidth + obj.c) / obj.b));
    }
    this.canvas.closePath();
    this.canvas.stroke();
};
