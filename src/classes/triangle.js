import Circle from './circle.js';
import Point from './point.js';
import Polygon from './polygon.js';
import Segment from './segment.js';
import {Vector} from './vector.js';

export default class Triangle extends Polygon{
    constructor(A, B, C) {
        if ((A == null) || (B == null) || (C == null)) {
            throw new Error('Triangle must have three vertices.');
        }
        if (A.equals(B) || B.equals(C) || A.equals(C)) {
            throw new Error('Triangle must have three vertices.');
        }
        super(A, B, C);
    }
    getCircumcircle() {
        const A = this.points[0],
            B = this.points[1],
            C = this.points[2];
        const AB = new Segment(A, B),
            BC = new Segment(B, C),
            CA = new Segment(C, A);
        const S = this.getArea();
        const vA = new Vector(A.x, A.y),
            vB = new Vector(B.x, B.y),
            vC = new Vector(C.x, C.y);
        const a = Math.pow(BC.length, 2),
            b = Math.pow(CA.length, 2),
            c = Math.pow(AB.length, 2);
        const vO = new Vector(0, 0)
            .add(vA.multiple(a * (b + c - a)))
            .add(vB.multiple(b * (c + a - b)))
            .add(vC.multiple(c * (a + b - c)))
            .multiple(1 / (16 * (Math.pow(S, 2))));
        const O = new Point(vO.x, vO.y);
        const cosA = vB.subtract(vA).product(vC.subtract(vA)) / (AB.length * CA.length),
            sinA = Math.sqrt(1 - Math.pow(cosA, 2));
        const R = BC.length / sinA / 2;
        return new Circle(O, R);
    }
    getIncircle() {
        const vA = new Vector(this.points[0].x, this.points[0].y),
            vB = new Vector(this.points[1].x, this.points[1].y),
            vC = new Vector(this.points[2].x, this.points[2].y);
        const a = vC.subtract(vB).abs(),
            b = vC.subtract(vA).abs(),
            c = vB.subtract(vA).abs();
        const vO = new Vector(0, 0).add(vA.multiple(a / (a + b + c)))
            .add(vB.multiple(b / (a + b + c)))
            .add(vC.multiple(c / (a + b + c)));
        const O = new Point(vO.x, vO.y);
        const r = 2 * this.getArea() / (a + b + c);
        return new Circle(O, r);
    }
    getCenter() {
        const A = this.points[0],
            B = this.points[1],
            C = this.points[2];
        return new Point((A.x + B.x + C.x) / 3, (A.y + B.y + C.y) / 3);
    }
    getArea() {
        const A = this.points[0],
            B = this.points[1],
            C = this.points[2];
        const AB = new Segment(A, B),
            AC = new Segment(A, C);
        const vAB = new Vector(B.x - A.x, B.y - A.y),
            vAC = new Vector(C.x - A.x, C.y - A.y);
        const cosA = vAB.product(vAC) / (AB.length * AC.length),
            sinA = Math.sqrt(1 - Math.pow(cosA, 2));
        const S = AB.length * AC.length * sinA / 2;
        return S;
    }
    move(dx, dy) {
        const newObject = super.move(dx, dy);
        const A = newObject.points[0],
            B = newObject.points[1],
            C = newObject.points[2];
        return new Triangle(A, B, C);
    }
    rotate(rad, center) {
        if (typeof center === 'undefined') {
            center = this.getCenter();
        }
        const newObject = super.rotate(rad, center);
        const A = newObject.points[0],
            B = newObject.points[1],
            C = newObject.points[2];
        return new Triangle(A, B, C);
    }
    name() { return 'Triangle'; }
}
