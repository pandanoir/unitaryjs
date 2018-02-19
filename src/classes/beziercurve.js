import ContouredObject from './contouredobject.js';

export default class BezierCurve extends ContouredObject {
    constructor(...args) {
        super();
        if (Array.isArray(args[0])) this.controlPoints = args[0];
        else this.controlPoints = args;
        if (this.controlPoints.length > 4) {
            let distance = 0;
            for (let i = 0, _i = this.controlPoints.length - 1; i < _i; i++) {
                const dx = (this.controlPoints[i + 1].x - this.controlPoints[i].x);
                const dy = (this.controlPoints[i + 1].y - this.controlPoints[i].y);
                distance += Math.sqrt(dx*dx + dy*dy);
            }
            this.step = 1 / distance;
        }
    }
    setStep(step) {
        this.step = step;
        return this;
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;

        return new BezierCurve(this.controlPoints.map(point => point.move(dx, dy))).copyFrom(this);
    }
    name() { return 'BezierCurve'; }
}
