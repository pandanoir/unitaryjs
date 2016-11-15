export default function(obj) {
    this.canvas.beginPath();
    let start = obj.start , end = obj.end;
    if (start === null) start = -this.origin.x;
    if (end === null) end = this.canvasWidth - this.origin.x;

    const points = [];
    for (let i = start; i <= end; i = 0|i+1) points[points.length] = new Unitary.Point(i, obj.f(i / obj.scale) * obj.scale);

    this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
    for (let i = 0, _i = points.length; i < _i; i = 0|i+1) {
        this.canvas.lineTo(this.X(points[i].x), this.Y(points[i].y));
        this.canvas.moveTo(this.X(points[i].x), this.Y(points[i].y));
    }
    this.canvas.closePath();
    this.canvas.stroke();
};
