import UnitaryObject from './unitaryobjcet.js';

export default class BezierCurve extends UnitaryObject {
    constructor(...args) {
        super();
        if (Object.prototype.toString.call(args[0]) === '[object Array]') this.controlPoints = args[0];
        else this.controlPoints= args;
        this.step= 0.05;
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
