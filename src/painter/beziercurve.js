export default function(obj) {
    this.canvas.beginPath();
    const controlPoints = obj.controlPoints;
    let P = controlPoints;
    let nextP = [];
    const points = obj.points || [controlPoints[0]];
    let pointsLength = 1;
    const step = obj.step;

    if (!obj.points) {
        console.log('cache created');
        for (let t = 0; t < 1; t += step) {
            P = controlPoints.concat();
            for (let i = 0, _i = controlPoints.length - 1; i < _i; i = 0|i+1) {
                for (let j = 0, _j = P.length - 1; j < _j; j = 0|j+1)
                    nextP[j] = new Unitary.Point(P[j + 1].x * t + P[j].x * (1 - t), P[j + 1].y * t + P[j].y * (1 - t));
                P = nextP;
                nextP = [];
            }
            points[pointsLength] = P[0];
            pointsLength = 0 | pointsLength + 1;
        }
        points[pointsLength] = controlPoints[controlPoints.length - 1];
    }
    obj.points = points;

    this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
    for (let i = 0, _i = points.length; i < _i; i = 0|i+1)
        this.canvas.lineTo(this.X(points[i].x), this.Y(points[i].y));
    this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
    this.canvas.closePath();
    this.canvas.stroke();
}
