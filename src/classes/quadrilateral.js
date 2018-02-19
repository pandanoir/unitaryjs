import Polygon from './polygon.js';
import Segment from './segment.js';
import Triangle from './triangle.js';

export default class Quadrilateral extends Polygon{
    constructor(A, B, C, D) {
        if (A.equals(B) || A.equals(C) || A.equals(D) || B.equals(C) || B.equals(D) || C.equals(D)) {
            throw new Error('ABCD is not a quadrilateral.');
        }
        if (new Segment(A, D).intersects(new Segment(B, C)) ||
            new Segment(A, B).intersects(new Segment(C, D))
        ) {
            throw new Error('ABCD is not a quadrilateral.');
        }
        super(A, B, C, D);
    }
    getArea() {
        const A = this.points[0],
            B = this.points[1],
            C = this.points[2],
            D = this.points[3];
        const S1 = new Triangle(A, B, C).getArea();
        const S2 = new Triangle(A, C, D).getArea();
        return S1 + S2;
    }
    move(dx, dy) {
        if (dx === 0 && dy === 0) return this;

        const newObj = super.move(dx, dy);
        return new Quadrilateral(...newObj.points).copyFrom(this);
    }
    rotate(rad, center) {
        if (rad % (2 * Math.PI) === 0) return this;

        const newObj = super.rotate(rad, center);
        return new Quadrilateral(...newObj.points).copyFrom(this);
    }
    name() { return 'Quadrilateral'; }
}
