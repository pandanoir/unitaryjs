import Unitary from '../unitary.js';
export default function(obj) {
    this.canvas.beginPath();
    const {start, end, x, y} = obj;
    const points = [];
    const step = 1 / (end - start);

    for (let t = start; t <= end; t += step) {
        const slope = new Unitary.Vector((x(t + step) - x(t)) * obj.scale, (y(t + step) - y(t)) * obj.scale).theta / (2 * Math.PI) * 360;

        if (!Number.isNaN(x(t)) && !Number.isNaN(y(t))) points[points.length] = new Unitary.Point(x(t) * obj.scale, y(t) * obj.scale);
        if (45 <= slope && slope <= 135 || 225 <= slope && slope <= 315) {
            if (!Number.isNaN(x(t + step / 2)) && !Number.isNaN(y(t + step / 2))) points[points.length] = new Unitary.Point(x(t + step / 2) * obj.scale, y(t + step / 2) * obj.scale);
        }
    }

    this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
    for (let i = 0, _i = points.length; i < _i; i = 0|i+1) {
        this.canvas.lineTo(this.X(points[i].x), this.Y(points[i].y));
    }
    this.canvas.stroke();
};
