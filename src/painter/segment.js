export default function(obj) {
    this.canvas.beginPath();
    this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    this.canvas.lineTo(this.X(obj.points[1].x), this.Y(obj.points[1].y));
    this.canvas.closePath();
    this.canvas.stroke();
};
