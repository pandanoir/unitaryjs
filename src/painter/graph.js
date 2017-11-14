import Unitary from '../unitary.js';
export default function(obj) {
    this.canvas.beginPath();
    let start = obj.start , end = obj.end;
    if (start === null) start = -this.origin.x;
    if (end === null) end = this.canvasWidth - this.origin.x;

    const points = [];
    for (let x = start; x <= end; x = 0|x+1) {
        const slope = new Unitary.Vector(1, (obj.f((x + 1) / obj.scale) - obj.f(x / obj.scale)) * obj.scale).theta / (2 * Math.PI) * 360;

        if (!Number.isNaN(obj.f(x / obj.scale))) points[points.length] = new Unitary.Point(x, obj.f(x / obj.scale) * obj.scale);
        if (45 <= slope && slope <= 135 || 225 <= slope && slope <= 315) {
            if (!Number.isNaN(obj.f((x + 0.5) / obj.scale))) points[points.length] = new Unitary.Point(x + 0.5, obj.f((x + 0.5) / obj.scale) * obj.scale);
        }
    }

    this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
    for (let i = 0, _i = points.length; i < _i; i = 0|i+1) {
        this.canvas.lineTo(this.X(points[i].x), this.Y(points[i].y));
    }
    this.canvas.stroke();
};
