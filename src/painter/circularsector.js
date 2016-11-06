export default function(obj) {
    const center = obj.center,
        r = obj.r,
        startAngle = obj.startAngle,
        endAngle = obj.endAngle;
    this.canvas.beginPath();
    this.canvas.moveTo(this.X(center.x), this.Y(center.y));
    this.canvas.arc(this.X(center.x), this.Y(center.y), r, startAngle, endAngle, false);
    this.canvas.lineTo(this.X(center.x), this.Y(center.y));
    this.canvas.closePath();
    this.canvas.stroke();
    if (obj.style.fillColor !== null) this.canvas.fill();
};
