(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Unitary = factory());
}(this, (function () { 'use strict';

function gcd(m, n) {
    if (m < n) return gcd(n, m);
    if (m < 0) return gcd(-m, n);
    if (n < 0) return gcd(m, -n);
    return n === 0 ? m : gcd(n, m % n);
}
function distance(A, B) {
    let res;
    if (A instanceof Point && B instanceof Point) {
        return Math.sqrt((A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y));
    }
    if (A instanceof Point && B instanceof Line) {
        res = B.a * A.x + B.b * A.y + B.c;
        if (res < 0) {
            res *= -1;
        }
        res /= Math.sqrt(B.a * B.a + B.b * B.b);
        return res;
    }
    if (A instanceof Line && B instanceof Point) {
        return distance(B, A);
    }
}
class UnitaryObject {
    constructor() {
        this.style = {
            fillColor: null,
            strokeColor: null
        };
    }
    equals(B) {
        return this.name() === B.name();
    }
    setFillColor(color) {
        this.style.fillColor = color;
        return this;
    }
    setStrokeColor(color) {
        this.style.strokeColor = color;
        return this;
    }
    setStyle(style) {
        for (const key of Object.keys(style)) {
            this.style[key] = style[key];
        }
        return this;
    }
    move(dx, dy) { return this; }
    moveX(dx) { return this.move(dx, 0); }
    moveY(dy) { return this.move(0, dy); }
    has(P) { return false; }
    name() { return 'UnitaryObject'; }
}
class Point extends UnitaryObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
    moveTo(x, y) {
        return new Point(x, y).setStyle(this.style);
    }
    move(dx, dy) {
        return new Point(this.x + dx, this.y + dy).setStyle(this.style);
    }
    rotate(rad, center) {
        const x = Math.cos(rad) * (this.x - center.x) - Math.sin(rad) * (this.y - center.y) + center.x;
        const y = Math.sin(rad) * (this.y - center.y) + Math.cos(rad) * (this.y - center.y) + center.y;
        return new Point(x, y);
    }
    toString() { return '(' + this.x + ', ' + this.y + ')'; }
    inspect() { return '(' + this.x + ', ' + this.y + ')'; }
    equals(B) {
        if (!super.equals(B)) {
            return false;
        }
        return this.x === B.x && this.y === B.y;
    }
    name() { return 'Point'; }
}
class BaseVector extends UnitaryObject {
    constructor(...args) {
        super();
        if (args.length === 1 && Object.prototype.toString.call(args[0]) === '[object Array]') {
            this.component = new Array(args[0].length);
            for (let i = 0, _i = args[0].length; i < _i; i = 0|i+1) {
                this.component[i] = args[0][i];
            }
        } else {
            this.component = new Array(args.length);
            for (let i = 0, _i = args.length; i < _i; i = 0|i+1) {
                this.component[i] = args[i];
            }
        }
    }
    add(CD) {
        if (this.component.length !== CD.component.length) {
            throw new Error('dimention of each vector are different.');
        }
        const component = new Array(this.component.length);
        for (let i = 0, _i = this.component.length; i < _i; i = 0|i+1) {
            component[i] = this.component[i] + CD.component[i];
        }
        return new BaseVector(component);
    }
    substract(CD) {
        return this.add(CD.multiple(-1));
    }
    product(CD) {
        if (this.component.length !== CD.component.length) {
            throw new Error('dimention of each vector are different.');
        }
        let product = 0;
        for (let i = 0, _i = this.component.length; i < _i; i = 0|i+1) {
            product += this.component[i] * CD.component[i];
        }
        return product;
    }
    multiple(k) {
        const component = new Array(this.component.length);
        for (let i = 0, _i = this.component.length; i < _i; i = 0|i+1 ) {
            component[i] = k * this.component[i];
        }
        return new BaseVector(component);
    }
    abs() {
        let res = 0;
        for (let i = 0, _i = this.component.length; i < _i; i = 0|i+1) {
            res += this.component[i] * this.component[i];
        }
        return Math.sqrt(res);
    }
    equals(B) {
        if (this.component.length !== B.component.length) {
            return false;
        }
        for (let i = 0, _i = this.component.length; i < _i; i = 0|i+1) {
            if (this.component[i] !== B.component[i]) {
                return false;
            }
        }
        return true;
    }
    move(...component) {
        return this.add(new BaseVector(component));
    }
    name() { return 'BaseVector'; }
}
class Vector extends BaseVector{
    constructor(...args) {
        if (args.length === 2) {
            super(args[0], args[1]);
            this.x = args[0];
            this.y = args[1];
        } else if (args.length === 1) {
            super(args[0].x, args[0].y);
            this.x = args[0].x;
            this.y = args[0].y;
        }
    }
    add(CD) {
        const newVector = super.add(CD);
        return new Vector(newVector.component[0], newVector.component[1]);
    }
    substract(CD) {
        const newVector = super.substract(CD);
        return new Vector(newVector.component[0], newVector.component[1]);
    }
    multiple(k) {
        const newVector = super.multiple(k);
        return new Vector(newVector.component[0], newVector.component[1]);
    }
    equals(B) {
        if (!super.equals(B)) {
            return false;
        }
        return this.x === B.x && this.y === B.y;
    }
    move(dx, dy) { return new Vector(this.x + dx, this.y + dy); }
    name() { return 'Vector'; }
}
class Vector3D extends BaseVector{
    constructor(...args) {
        if (args.length === 3) {
            super(args[0], args[1], args[2]);
            this.x = args[0];
            this.y = args[1];
            this.z = args[2];
        } else if (args.length === 1) {
            super(args[0].x, args[0].y, args[0].z);
            this.x = args[0].x;
            this.y = args[0].y;
            this.z = args[0].z;
        }
    }
    add(CD) {
        const newVector = super.add(CD);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    }
    substract(CD) {
        const newVector = super.substract(CD);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    }
    multiple(k) {
        const newVector = super.multiple(k);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    }
    move(dx, dy, dz) { return new Vector3D(this.x + dx, this.y + dy, this.z + dz); }
    name() { return 'Vector3D'; }
}

class Line extends UnitaryObject {
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
class Segment extends UnitaryObject {
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
                if ((A.y - B.y) / (A.x - B.x) * P.x === P.y) {
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
        if (this.points[0].x <= intersection.x && intersection.x <= this.points[1].x) {
            return true;
        }
        return false;
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

class Circle extends UnitaryObject {
    constructor(center, radius) {
        super();
        this.center = center;
        this.Origin = center;
        this.r = radius;
        this.radius = radius;
    }
    moveTo(x, y) {
        return new Circle(this.center.moveTo(x, y), this.r).setStyle(this.style);
    }
    move(dx, dy) {
        return new Circle(this.center.move(dx, dy), this.r).setStyle(this.style);
    }
    getEquation() {
        let res = '(x';
        if (this.center.x > 0) res += '-' + this.center.x;
        else if (this.center.x < 0) res += '+' + (-this.center.x); // + abs(this.center.x)
        res += ')^2+(y';
        if (this.center.y > 0) res += '-' + this.center.y;
        else if (this.center.y < 0) res += '+' + (-this.center.y); // + abs(this.center.x)
        res += ')^2=' + this.r + '^2';
        return res;
    }
    equals(C) {
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) && this.r === C.r;
    }
    has(P) {
        return new Vector(P).substract(new Vector(this.center)).abs() <= this.r;
    }
    name() { return 'Circle'; }
}
class CircularSector extends UnitaryObject {
    constructor(center, radius, endAngle, startAngle = 0) {
        super();
        this.center = center;
        this.Origin = center;
        this.radius = radius;
        this.r = radius;
        this.endAngle = endAngle;
        this.startAngle = startAngle;
    }
    moveTo(x, y) {
        return new CircularSector(this.center.moveTo(x, y), this.r, this.endAngle, this.startAngle).setStyle(this.style);
    }
    move(dx, dy) {
        return new CircularSector(this.center.move(dx, dy), this.r, this.endAngle, this.startAngle).setStyle(this.style);
    }
    rotate(rad) {
        return new CircularSector(this.center, this.r, this.endAngle + rad, this.startAngle + rad).setStyle(this.style);
    }
    equals(C) {
        const angleCompare = (A, B) => (A - B) % (2 * Math.PI) === 0;
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) && this.r === C.r && angleCompare(this.startAngle, C.startAngle) && angleCompare(this.endAngle, C.endAngle);
    }
    has(P) {
        const theta = Math.atan2(P.y, P.x);
        return new Vector(P).substract(new Vector(this.center)).abs() <= this.r &&
            this.startAngle <= theta &&
            theta <= this.endAngle;
    }
    name() { return 'CircularSector'; }
}

class Polygon extends UnitaryObject {
    constructor(...args) {
        super();
        const points = 1 <= args.length ? Array.prototype.slice.call(args, 0) : [];
        if (Object.prototype.toString.call(points[0]) === '[object Array]') {
            this.points = points[0];
        } else {
            this.points = points;
        }
    }
    equals() {
        return false;
    }
    move(dx, dy) {
        const points = [];
        for (let i = 0, len = this.points.length; i < len; i++) {
            points[i] = this.points[i].move(dx, dy);
        }
        return new Polygon(points).setStyle(this.style);
    }
    rotate(rad, center) {
        const points = [];
        for (let i = 0, len = this.points.length; i < len; i++) {
            points[i] = this.points[i].rotate(rad, center);
        }
        return new Polygon(points).setStyle(this.style);
    }
    has(P) {
        let a, b, cos, v;
        let before_v = this.points[this.points.length - 1];
        let rad = 0;
        for (let i = 0, len = this.points.length; i < len; i++) {
            v = this.points[i];
            a = new Vector(v).substract(new Vector(P));
            b = new Vector(before_v).substract(new Vector(P));
            cos = a.product(b) / (a.abs() * b.abs());
            rad += Math.acos(cos);
            before_v = v;
        }
        return Math.round(rad / (2 * Math.PI) * 360) === 360;
    }
    name() { return 'Polygon'; }
}
class Quadrilateral extends Polygon{
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
        const newObject = super.move(dx, dy);
        const A = newObject.points[0],
            B = newObject.points[1],
            C = newObject.points[2],
            D = newObject.points[3];
        return new Quadrilateral(A, B, C, D);
    }
    rotate(rad, center) {
        const newObject = super.rotate(rad, center);
        const A = newObject.points[0],
            B = newObject.points[1],
            C = newObject.points[2],
            D = newObject.points[3];
        return new Quadrilateral(A, B, C, D);
    }
    name() { return 'Quadrilateral'; }
}
class Triangle extends Polygon{
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
        const cosA = vB.substract(vA).product(vC.substract(vA)) / (AB.length * CA.length),
            sinA = Math.sqrt(1 - Math.pow(cosA, 2));
        const R = BC.length / sinA / 2;
        return new Circle(O, R);
    }
    getIncircle() {
        const vA = new Vector(this.points[0].x, this.points[0].y),
            vB = new Vector(this.points[1].x, this.points[1].y),
            vC = new Vector(this.points[2].x, this.points[2].y);
        const a = vC.substract(vB).abs(),
            b = vC.substract(vA).abs(),
            c = vB.substract(vA).abs();
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
class Rect extends Polygon{
    constructor(A, B) {
        super(A, B);
    }
    has(P) {
        const A = this.points[0],
            B = this.points[1];
        return (A.x - P.x) * (B.x - P.x) <= 0 && (A.y - P.y) * (B.y - P.y) <= 0;
    }
    move(dx, dy) {
        const newObject = super.move(dx, dy);
        const A = newObject.points[0],
            B = newObject.points[1];
        return new Rect(A, B);
    }
    rotate(rad, center) {
        const newObject = super.rotate(rad, center);
        const A = newObject.points[0],
            B = newObject.points[1];
        return new Rect(A, B);
    }
    name() { return 'Rect'; }
}
class Text extends UnitaryObject {
    constructor(str, P, align = 'left', maxWidth = null) {
        super();
        this.P = P;
        this.string = str;
        this.text = str;
        this.strokesOutline = false;
        this.style.align = align;
        this.style.maxWidth = maxWidth;
        this.style.fillColor = '#000';
        this.style.outlineColor = '#000';
        this.style.baseline = 'alphabetic';
        this.style.font = null;
    }
    strokeOutline() {
        this.strokesOutline = true;
        return this;
    }
    setAlign(align) {
        this.style.align = align;
        return this;
    }
    setOutlineColor(color) {
        this.style.outlineColor = color;
        return this;
    }
    setBaseline(base) {
        this.style.baseline = base;
        return this;
    }
    setFont(font) {
        this.style.font = font;
        return this;
    }
    move(dx, dy) {
        const newText = new Text(this.string, this.P.move(dx, dy), this.style.align, this.style.maxWidth).setStyle(this.style);
        if (this.strokesOutline) {
            newText.strokeOutline();
        }
        return newText;
    }
    name() { return 'Text'; }
}
class Image extends UnitaryObject {
    constructor(src, startPoint) {
        super();
        this.src = src;
        this.startPoint = startPoint;
        this.dx = startPoint.x;
        this.dy = startPoint.y;
        this.dw = null;
        this.dh = null;
        this.sw = null;
        this.sh = null;
        this.sx = null;
        this.sy = null;
    }
    trim(startPoint, sw, sh, dw = null, dh = null) {
        const newImage = new Image(this.src, this.startPoint);
        if (dw == null) {
            dw = sw;
        }
        if (dh == null) {
            dh = sh;
        }
        newImage.sx = startPoint.x;
        newImage.sy = startPoint.y;
        newImage.sw = sw;
        newImage.sh = sh;
        newImage.dw = dw;
        newImage.dh = dh;
        return newImage;
    };
    resize(dw, dh) {
        const newImage = new Image(this.src, this.startPoint);
        newImage.dw = dw;
        newImage.dh = dh;
        newImage.sw = this.sw;
        newImage.sh = this.sh;
        newImage.sx = this.sx;
        newImage.sy = this.sy;
        return newImage;
    }
    equals(B) {
        if (!super.equals(B)) {
            return false;
        }
        return this.src === B.src && this.dx === B.dx && this.dy === B.dy && this.dw === B.dw && this.dh === B.dh && this.sw === B.sw && this.sh === B.sh && this.sx === B.sx && this.sy === B.sy;
    }
    move(dx, dy) {
        let newImage = new Image(this.src, this.startPoint.move(dx, dy));
        if (this.sx !== null) {
            newImage = newImage.trim(new Point(this.sx, this.sy), this.sw, this.sh, this.dw, this.dh);
        }
        return newImage;
    }
    name() { return 'Image'; }
}
class Group extends UnitaryObject {
    constructor(...args) {
        super();
        if (Object.prototype.toString.call(args[0]) === '[object Array]') this.group = args[0];
        else this.group = args;
    }
    has(P) {
        for (let i = 0, _i = this.group.length; i < _i; i++) {
            if (this.group[i].has && this.group[i].has(P)) return true;
        }
        return false;
    }
    move(dx, dy) {
        const newGroup = this.group.concat();
        for (let i = 0, _i = newGroup.length; i < _i; i++) {
            if (newGroup[i].move) newGroup[i] = newGroup[i].move(dx, dy);
        }
        return new Group(newGroup);
    }
    name() { return 'Group'; }
}
class Graph extends UnitaryObject {
    constructor(f, scale) {
        super();
        this.f = f;
        this.scale = scale;
        this.start = null;
        this.end = null;
    }
    setRange(start, end) {
        this.start = start;
        this.end = end;
        return this;
    }
    equals() { return false; }
    moveX() {}
    moveY() {}
    name() { return 'Graph'; }
}
class BezierCurve extends UnitaryObject {
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
        for (let i = 0, _i = newBezier.length; i < _i; i++) {
            newBezier[i] = newBezier[i].move(dx, dy);
        }
        return new BezierCurve(newBezier).setStep(this.step);
    }
    name() { return 'BezierCurve'; }
}
var unitary = {
    distance: distance,
    UnitaryObject: UnitaryObject,
    Point: Point,
    BaseVector: BaseVector,
    Vector: Vector,
    Vector3D: Vector3D,
    Line: Line,
    Segment: Segment,
    Circle: Circle,
    CircularSector: CircularSector,
    Polygon: Polygon,
    Quadrilateral: Quadrilateral,
    Triangle: Triangle,
    Rect: Rect,
    Text: Text,
    Image: Image,
    Group: Group,
    Graph: Graph,
    BezierCurve: BezierCurve,
    XAxis: new Line(new Point(0, 0), new Point(1, 0)),
    YAxis: new Line(new Point(0, 0), new Point(0, 1)),
    VERSION: '0.0.6'
};

return unitary;

})));
