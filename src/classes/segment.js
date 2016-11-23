import ContouredObject from './contouredobject.js';
import Line from './line.js';

export default class Segment extends ContouredObject {
    constructor(A, B) {
        super();
        if (A.x > B.x) {
            this.points = [B, A];
        } else {
            this.points = [A, B];
        }
        this.length = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2));
    }
    move(dx, dy) {
        return new Segment(this.points[0].move(dx, dy), this.points[1].move(dx, dy)).setStyle(this.style);
    }
    has(P) {
        const A = this.points[0];
        const B = this.points[1];
        if (A.x <= P.x && P.x <= B.x) {
            if (A.y <= B.y && (A.y <= P.y && P.y <= B.y) || A.y >= B.y && (A.y >= P.y && P.y >= B.y)) {
                if (this.toLine().has(P)) {
                    return true;
                }
            }
        }
        return false;
    }
    intersects(CD) {
        let intersection;
        if (CD instanceof Line) {
            intersection = this.toLine().getIntersection(CD);
        } else {
            intersection = this.toLine().getIntersection(CD.toLine());
        }
        if (intersection === false) {
            return false;
        }
        return this.has(intersection) && CD.has(intersection);
    }
    toLine() { return new Line(this.points[0], this.points[1]); }
    equals(CD) {
        if (!super.equals(CD)) {
            return false;
        }
        return this.points[0].equals(CD.points[0]) && this.points[1].equals(CD.points[1]);
    }
    name() { return 'Segment'; }
}
