export default function(obj) {
    const center = obj.center,
          r = obj.r;
    this.canvas.beginPath();
    this.canvas.arc(this.X(center.x), this.Y(center.y), r, 0, 2 * Math.PI, obj.anticlockwise);
    this.canvas.stroke();
    if (obj.style.fillStyle !== null) this.canvas.fill();
};
