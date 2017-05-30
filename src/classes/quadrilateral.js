import Polygon from './polygon.js';
import Segment from './segment.js';
import Triangle from './triangle.js';

export default class Quadrilateral extends Polygon{
    constructor(A, B, C, D) {
        if (new Segment(A, D).intersects(new Segment(B, C))) {
            throw new Error('ABCD is not a quadrilateral.');
        }
        if (A.equals(B) || A.equals(C) || A.equals(D) || B.equals(C) || B.equals(D) || C.equals(D)) {
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
        const newObject = super.move(dx, dy);
        const A = newObject.points[0],
            B = newObject.points[1],
            C = newObject.points[2],
            D = newObject.points[3];
        return new Quadrilateral(A, B, C, D).setStyle(this.style);
    }
    rotate(rad, center) {
        if (rad % (2 * Math.PI) === 0) return this;
        const newObject = super.rotate(rad, center);
        const A = newObject.points[0],
            B = newObject.points[1],
            C = newObject.points[2],
            D = newObject.points[3];
        return new Quadrilateral(A, B, C, D).setStyle(this.style);
    }
    name() { return 'Quadrilateral'; }
}
