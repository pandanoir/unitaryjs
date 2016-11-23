import ContouredObject from './contouredobject.js';

export default class BezierCurve extends ContouredObject {
    constructor(...args) {
        super();
        if (Array.isArray(args[0])) this.controlPoints = args[0];
        else this.controlPoints = args;
        if (this.controlPoints.length > 4) {
            let distance = 0;
            for (let i = 0, _i = this.controlPoints.length - 1; i < _i; i++) {
                const x = (this.controlPoints[i + 1].x - this.controlPoints[i].x);
                const y = (this.controlPoints[i + 1].y - this.controlPoints[i].y);
                distance += Math.sqrt(x * x + y * y);
            }
            this.step = 1 / distance;
        }
    }
    setStep(step) {
        this.step = step;
        return this;
    }
    move(dx, dy) {
        const newBezier = this.controlPoints.concat();
        for (let i = 0, _i = newBezier.length; i < _i; i = 0|i+1) {
            newBezier[i] = newBezier[i].move(dx, dy);
        }
        return new BezierCurve(newBezier).setStep(this.step);
    }
    name() { return 'BezierCurve'; }
}
