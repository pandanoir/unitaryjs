import UnitaryObject from './unitaryobjcet.js';
import Point from './point.js';

function gcd(m, n) {
    if (m < n) return gcd(n, m);
    if (m < 0) return gcd(-m, n);
    if (n < 0) return gcd(m, -n);
    return n === 0 ? m : gcd(n, m % n);
}
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
        const g = gcd(gcd(this.a, this.b), this.c);
        this.a /= g;
        this.b /= g;
        this.c /= g;
        if (this.a === 0) {
            this.c /= this.b;
            this.b = 1;
        }
        if (this.b === 0) {
            this.c /= this.a;
            this.a = 1;
        }
    }
    move(dx, dy) {
        return new Line(this.points[0].move(dx, dy), this.points[1].move(dx, dy)).setStyle(this.style);
    }
    getEquation() {
        let res;
        res = '';
        let a = this.a;
        let b = this.b;
        let c = this.c;
        if (this.a < 0 || this.a === 0 && this.b < 0) {
            // to output x+y+1=0 instead of -x-y-1=0
            a *= -1;
            b *= -1;
            c *= -1;
        }
        if (a > 0 && a !== 1) { res += '+' + a + 'x'; }
        if (a === 1) { res += '+x'; }
        // if (a < 0 && a !== -1) { res += '-' + -a + 'x'; }
        // if (a === -1) { res += '-x'; }
        if (b > 0 && b !== 1) { res += '+' + b + 'y'; }
        if (b === 1) { res += '+y'; }
        if (b < 0 && b !== -1) { res += '-' + -b + 'y'; }
        if (b === -1) { res += '-y'; }
        if (c > 0) { res += '+' + c; }
        if (c < 0) { res += '-' + -c; }
        if (res.charAt(0) === '+') { res = res.slice(1); }
        return res + '=0';
    }
    toString() { return this.getEquation(); }
    inspect() { return this.getEquation(); }
    getIntersection(CD) {
        if (this.a === CD.a && this.b === CD.b) {
            return false;
        }
        const y = (CD.a * this.c - this.a * CD.c) / (this.a * CD.b - CD.a * this.b);
        const x = -1 * (this.b * y + this.c) / this.a;
        return new Point(x, y);
    }
    equals(CD) {
        if (!super.equals(CD)) {
            return false;
        }
        return this.a === CD.a && this.b === CD.b && this.c === CD.c;
    }
    name() { return 'Line'; }
}
