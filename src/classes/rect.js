import Polygon from './polygon.js';

export default class Rect extends Polygon{
    constructor(A, B) {
        super(A, B);
    }
    has(P) {
        const A = this.points[0],
            B = this.points[1];
        return (A.x - P.x) * (B.x - P.x) <= 0 && (A.y - P.y) * (B.y - P.y) <= 0;
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;

        const newObj = super.move(dx, dy);
        return new Rect(...newObj.points).copyFrom(this);
    }
    rotate(rad, center) {
        if (rad % (2 * Math.PI) === 0) return this;

        const newObj = super.rotate(rad, center);
        return new Rect(...newObj.points).copyFrom(this);
    }
    name() { return 'Rect'; }
}
