export default function(obj) {
    const O = obj.center,
          r = obj.r;
    this.canvas.beginPath();
    this.canvas.arc(this.X(O.x), this.Y(O.y), r, 0, 2 * Math.PI, obj.anticlockwise);
    this.canvas.closePath();
    this.canvas.stroke();
    if (obj.style.fillColor !== null) this.canvas.fill();
};
