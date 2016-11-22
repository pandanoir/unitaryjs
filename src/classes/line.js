import UnitaryObject from './unitaryobjcet.js';
import Point from './point.js';
import {Vector} from './vector.js';
import {sign, abs, isInteger, gcd, nearlyEqualsZero} from '../utility.js';

export default class Line extends UnitaryObject {
    constructor(A, B) {
        if (A.equals(B)) {
            throw new Error('A equals B. So AB couldn\'t construct line.');
        }
        super();
        this.points = [A, B];
        this.a = B.y - A.y;
        this.b = A.x - B.x;
        this.c = A.x * (A.y - B.y) - A.y * (A.x - B.x);
        if (isInteger(this.a) && isInteger(this.b) && isInteger(this.c)) {
            const g = gcd(gcd(this.a, this.b), this.c);
            this.a /= g;
            this.b /= g;
            this.c /= g;
        }
        if (this.a < 0) {
            this.a *= -1;
            this.b *= -1;
            this.c *= -1;
        }
        if (this.a === 0) {
            this.c /= this.b;
            this.b = 1;
        }
        if (this.b === 0) {
            this.c /= this.a;
            this.a = 1;
        }
        // a > 0 || a == 0 && b > 0
    }
    move(dx, dy) {
        return new Line(this.points[0].move(dx, dy), this.points[1].move(dx, dy)).setStyle(this.style);
    }
    has(P) {
        return nearlyEqualsZero(this.a * P.x + this.b * P.y + this.c);
    }
    getEquation() {
        const a = this.a;
        const b = this.b;
        const c = this.c;
        const n = _n => abs(_n) === 1 ? '' : abs(_n);

        let res = '';
        if (a !== 0) res += sign(a) + n(a) + 'x';
        if (b !== 0) res += sign(b) + n(b) + 'y';
        if (c !== 0) res += sign(c) + abs(c);
        return res.slice(1) + '=0';
    }
    toString() { return this.getEquation(); }
    inspect() { return this.getEquation(); }
    getNormalVector() {
        return new Vector(this.a, this.b);
    }
    getIntersection(CD) {
        if (nearlyEqualsZero(this.a * CD.b - CD.a * this.b)) {
            return false;
        }
        const y = (CD.a * this.c - this.a * CD.c) / (this.a * CD.b - CD.a * this.b); // this.a * CD.b - CD.a * this.b !== 0
        let x;
        if (this.a === 0) {
            // if this.a === 0 && CD.a === 0, this.b and CD.b are 1.
            // So CD.a !== 0.
            x = -1 * (CD.b * y + CD.c) / CD.a;
        } else {
            x = -1 * (this.b * y + this.c) / this.a;
        }
        return new Point(x, y);
    }
    equals(CD) {
        if (!super.equals(CD)) {
            return false;
        }
        const ratio1 = nearlyEqualsZero(this.a * CD.b - this.b * CD.a); // a:b = a':b'
        const ratio2 = nearlyEqualsZero(this.b * CD.c - this.c * CD.b); // b:c = b':c'
        const ratio3 = nearlyEqualsZero(this.a * CD.c - this.c * CD.a); // a:c = a':c'
        // ratio1 && ratio2 equals a:b:c = a':b':c'
        return ratio1 && ratio2 && ratio3;
    }
    isParallelTo(CD) {
        if (this.equals(CD)) {
            return false;
        }
        return nearlyEqualsZero(this.a * CD.b - this.b * CD.a);
    }
    isPerpendicularTo(CD) {
        if (this.equals(CD)) {
            return false;
        }
        return nearlyEqualsZero(this.a * CD.a + this.b * CD.b);
    }
    name() { return 'Line'; }
    static fromVector(_a, _d) {
        let a = _a, d = _d;
        if (_a.name() === 'Point') a = _a.toVector();
        if (_d.name() === 'Point') d = _d.toVector();
        return new Line(a, a.add(d));
    }
}
