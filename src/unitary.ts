"use strict";
type Style = {
    fillColor: string;
    strokeColor: string;
    align?: string;
    baseline?: string;
    font?: string;
    maxWidth?: number;
    outlineColor?: string;
    str?: string;
    string?: string;
    strokesOutline?: string;
    text?: string;
}
function gcd(m: number, n: number): number {
    if (m < n) {
        return gcd(n, m);
    }
    if (m < 0) {
        return gcd(-m, n);
    }
    if (n < 0) {
        return gcd(m, -n);
    }
    if (n === 0) {
        return m;
    }
    return gcd(n, m % n);
}
export function distance(A: Point | Line, B: Point | Line): number {
    var res:number;
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
export class UnitaryObject {
    style: Style = {
        fillColor: null,
        strokeColor: null
    };
    constructor() {
        if (!(this instanceof UnitaryObject)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        this.style.fillColor = null;
        this.style.strokeColor = null;
    }
    equals(B: UnitaryObject): boolean {
        return this.name() === B.name();
    }
    setFillColor(color: string): this {
        this.style.fillColor = color;
        return this;
    }
    setStrokeColor(color: string): this {
        this.style.strokeColor = color;
        return this;
    }
    setStyle(style: any): this {
        for (var key in style) {
            this.style[key] = style[key];
        }
        return this;
    }
    move(dx: number, dy: number): any {
        return this;
    }
    moveX(dx: number): any {
        return this.move(dx, 0);
    }
    moveY(dy: number): any {
        return this.move(0, dy);
    }
    name(): string {
        return 'UnitaryObject';
    }
}
export class Point extends UnitaryObject {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        if (!(this instanceof Point)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        super();
        this.x = x;
        this.y = y;
    }
    moveTo(x: number, y: number): Point {
        return new Point(x, y).setStyle(this.style);
    }
    move(dx: number, dy: number): Point {
        return new Point(this.x + dx, this.y + dy).setStyle(this.style);
    }
    rotate(rad: number, center: Point): Point {
        var x = Math.cos(rad) * (this.x - center.x) - Math.sin(rad) * (this.y - center.y) + center.x;
        var y = Math.sin(rad) * (this.y - center.y) + Math.cos(rad) * (this.y - center.y) + center.y;
        return new Point(x, y);
    }
    toString(): string {
        return '(' + this.x + ', ' + this.y + ')';
    }
    inspect(): string {
        return '(' + this.x + ', ' + this.y + ')';
    }
    equals(B: Point): boolean {
        if (!super.equals(B)) {
            return false;
        }
        return this.x === B.x && this.y === B.y;
    }
    name(): string {
        return 'Point';
    }
}
export class BaseVector extends UnitaryObject {
    component: number[];
    constructor(component: number[]) ;
    constructor(...component: number[]) ;
    constructor(x: any, ...y: number[]) { 
        super();
        if (arguments.length === 1 && Object.prototype.toString.call(arguments[0]) === '[object Array]') {
            this.component = new Array(arguments[0].length);
            for (var i: number = 0, _i: number = arguments[0].length; i < _i; i = 0|i+1) {
                this.component[i] = arguments[0][i];
            }
        } else {
            this.component = new Array(arguments.length);
            for (var i: number = 0, _i: number = arguments.length; i < _i; i = 0|i+1) {
                this.component[i] = arguments[i];
            }
        }
    }
    add(CD: BaseVector):BaseVector {
        if (this.component.length !== CD.component.length) {
            throw new Error('dimention of each vector are different.');
        }
        var component: number[] = new Array(this.component.length);
        for (var i = 0, _i = this.component.length; i < _i; i = 0|i+1) {
            component[i] = this.component[i] + CD.component[i];
        }
        return new BaseVector(component);
    }
    substract(CD: BaseVector) {
        return this.add(CD.multiple(-1));
    }
    product(CD: BaseVector): number {
        if (this.component.length !== CD.component.length) {
            throw new Error('dimention of each vector are different.');
        }
        var product = 0;
        for (var i = 0, _i = this.component.length; i < _i; i = 0|i+1) {
            product += this.component[i] * CD.component[i];
        }
        return product;
    }
    multiple(k: number): BaseVector {
        var component: number[] = new Array(this.component.length);
        for (var i = 0, _i = this.component.length; i < _i; i = 0|i+1 ) {
            component[i] = k * this.component[i];
        }
        return new BaseVector(component);
    }
    abs(): number {
        var res = 0;
        for (var i = 0, _i = this.component.length; i < _i; i = 0|i+1) {
            res += this.component[i] * this.component[i];
        }
        return Math.sqrt(res);
    }
    equals(B: BaseVector): boolean {
        if (this.component.length !== B.component.length) {
            return false;
        }
        for (var i: number = 0, _i: number = this.component.length; i < _i; i = 0|i+1) {
            if (this.component[i] !== B.component[i]) {
                return false;
            }
        }
        return true;
    };
    move(...dx: number[]): BaseVector {
        var component: number[] = new Array(arguments.length);
        for (var i = 0, _i = arguments.length; i < _i; i = 0|i+1) {
            component[i] = arguments[i];
        }
        return this.add(new BaseVector(component));
    }
    name(): string {
        return 'BaseVector';
    }
}
export class Vector extends BaseVector{
    x: number;
    y: number;
    constructor(v: Point);
    constructor(x: number, y: number);
    constructor(x: any, y?: number) {
        if (!(this instanceof Vector)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if (arguments.length === 2) {
            super(arguments[0], arguments[1]);
            this.x = arguments[0];
            this.y = arguments[1];
        } else if (arguments.length === 1) {
            super(arguments[0].x, arguments[0].y);
            this.x = arguments[0].x;
            this.y = arguments[0].y;
        }
    }
    add(CD: Vector): Vector {
        var newVector = super.add(CD);
        return new Vector(newVector.component[0], newVector.component[1]);
    }
    substract(CD: Vector): Vector {
        var newVector = super.substract(CD);
        return new Vector(newVector.component[0], newVector.component[1]);
    }
    multiple(k: number): Vector {
        var newVector = super.multiple(k);
        return new Vector(newVector.component[0], newVector.component[1]);
    }
    equals(B: Vector): boolean {
        if (!super.equals(B)) {
            return false;
        }
        return this.x === B.x && this.y === B.y;
    }
    move(dx: number, dy: number): Vector {
        return new Vector(this.x + dx, this.y + dy);
    }
    name(): string {
        return 'Vector';
    }
}
export class Vector3D extends BaseVector{
    x: number;
    y: number;
    z: number;
    constructor(component: number[]) ;
    constructor(x: number, y: number, z: number) ;
    constructor(x: any, y?: number, z?: number) {
        if (!(this instanceof Vector3D)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if (arguments.length === 3) {
            super(arguments[0], arguments[1], arguments[2]);
            this.x = arguments[0];
            this.y = arguments[1];
            this.z = arguments[2];
        } else if (arguments.length === 1) {
            super(arguments[0].x, arguments[0].y, arguments[0].z);
            this.x = arguments[0].x;
            this.y = arguments[0].y;
            this.z = arguments[0].z;
        }
    }
    add(CD: Vector3D): Vector3D {
        var newVector = super.add(CD);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    }
    substract(CD: Vector3D): Vector3D {
        var newVector = super.substract(CD);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    }
    multiple(k: number): Vector3D {
        var newVector = super.multiple(k);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    }
    move(dx: number, dy: number, dz: number): Vector3D {
        return new Vector3D(this.x + dx, this.y + dy, this.z + dz);
    }
    name(): string {
        return 'Vector3D';
    }
}

export class Line extends UnitaryObject{
    points: Point[];
    a: number;
    b: number;
    c: number;
    constructor(A: Point, B: Point) {
        var g:number;
        if (!(this instanceof Line)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if (A.equals(B)) {
            throw new Error('A equals B. So AB couldn\'t construct line.');
        }
        super();
        this.points = [A, B];
        this.a = B.y - A.y;
        this.b = A.x - B.x;
        this.c = A.x * (A.y - B.y) - A.y * (A.x - B.x);
        g = gcd(gcd(this.a, this.b), this.c);
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
    move(dx: number, dy: number): UnitaryObject {
        return new Line(this.points[0].move(dx, dy), this.points[1].move(dx, dy)).setStyle(this.style);
    }
    getEquation(): string {
        var res:string;
        res = '';
        var a = this.a;
        var b = this.b;
        var c = this.c;
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
    toString(): string {
        return this.getEquation();
    }
    inspect(): string {
        return this.getEquation();
    }
    getIntersection(CD: Line): Point | boolean {
        var x:number, y:number;
        if (this.a === CD.a && this.b === CD.b) {
            return false;
        }
        y = (CD.a * this.c - this.a * CD.c) / (this.a * CD.b - CD.a * this.b);
        x = -1 * (this.b * y + this.c) / this.a;
        return new Point(x, y);
    }
    equals(CD: Line): boolean {
        if (!super.equals(CD)) {
            return false;
        }
        return this.a === CD.a && this.b === CD.b && this.c === CD.c;
    }
    name(): string {
        return 'Line';
    }
}
export class Segment extends UnitaryObject{
    points: Point[];
    length: number;
    constructor(A: Point, B: Point) {
        if (!(this instanceof Segment)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if (A.x > B.x) {
            this.points = [B, A];
        } else {
            this.points = [A, B];
        }
        super();
        this.length = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2));
    }
    move(dx: number, dy: number): UnitaryObject {
        return new Segment(this.points[0].move(dx, dy), this.points[1].move(dx, dy)).setStyle(this.style);
    }
    has(P: Point): boolean {
        var A:Point, B:Point;
        A = this.points[0];
        B = this.points[1];
        if (A.x <= P.x && P.x <= B.x) {
            if (A.y <= B.y && (A.y <= P.y && P.y <= B.y) || A.y >= B.y && (A.y >= P.y && P.y >= B.y)) {
                if ((A.y - B.y) / (A.x - B.x) * P.x === P.y) {
                    return true;
                }
            }
        }
        return false;
    }
    intersects(CD: Line): boolean;
    intersects(CD: Segment): boolean;
    intersects(CD: any): boolean {
        var intersection;
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
    };

    toLine(): Line {
        return new Line(this.points[0], this.points[1]);
    };

    equals(CD: Segment): boolean {
        if (!super.equals(CD)) {
            return false;
        }
        return this.points[0].equals(CD.points[0]) && this.points[1].equals(CD.points[1]);
    }
    name(): string {
        return 'Segment';
    }
}

export class Circle extends UnitaryObject{
    center: Point;
    Origin: Point;
    r: number;
    radius: number;
    constructor(center: Point, radius: number) {
        if (!(this instanceof Circle)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        super();
        this.center = center;
        this.Origin = center;
        this.r = radius;
        this.radius = radius;
    }
    moveTo(x: number, y: number): UnitaryObject {
        return new Circle(this.center.moveTo(x, y), this.r).setStyle(this.style);
    }
    move(dx: number, dy: number): UnitaryObject {
        return new Circle(this.center.move(dx, dy), this.r).setStyle(this.style);
    }
    getEquation(): string {
        var res = '(x';
        if (this.center.x > 0) res += '-' + this.center.x;
        else if (this.center.x < 0) res += '+' + (-this.center.x); // + abs(this.center.x)
        res += ')^2+(y';
        if (this.center.y > 0) res += '-' + this.center.y;
        else if (this.center.y < 0) res += '+' + (-this.center.y); // + abs(this.center.x)
        res += ')^2=' + this.r + '^2';
        return res;
    }
    equals(C: Circle): boolean {
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) && this.r === C.r;
    }
    name(): string {
        return 'Circle';
    }
}
export class CircularSector extends UnitaryObject{
    center: Point;
    Origin: Point;
    radius: number;
    r: number;
    endAngle: number;
    startAngle: number;
    constructor(center: Point, radius: number, endAngle: number, startAngle: number = 0) {
        if (!(this instanceof CircularSector)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        super();
        this.center = center;
        this.Origin = center;
        this.radius = radius;
        this.r = radius;
        this.endAngle = endAngle;
        this.startAngle = startAngle;
    }
    moveTo(x: number, y: number): UnitaryObject {
        return new CircularSector(this.center.moveTo(x, y), this.r, this.endAngle, this.startAngle).setStyle(this.style);
    }
    move(dx: number, dy: number): UnitaryObject {
        return new CircularSector(this.center.move(dx, dy), this.r, this.endAngle, this.startAngle).setStyle(this.style);
    }
    rotate(rad: number): UnitaryObject {
        return new CircularSector(this.center, this.r, this.endAngle + rad, this.startAngle + rad).setStyle(this.style);
    }
    equals(C: CircularSector): boolean {
        function angleCompare(A, B) {
            return (A - B) % (2 * Math.PI) === 0;
        }
        if (!super.equals(C)) {
            return false;
        }
        return this.center.equals(C.center) && this.r === C.r && angleCompare(this.startAngle, C.startAngle) && angleCompare(this.endAngle, C.endAngle);
    }
    name(): string {
        return 'CircularSector';
    }
}

export class Polygon extends UnitaryObject{
    points: Point[];
    constructor(...points: Point[]);
    constructor(points: Point[]);
    constructor() {
        var points;
        points = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
        if (!(this instanceof Polygon)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        super();
        if (Object.prototype.toString.call(points[0]) === '[object Array]') {
            this.points = points[0];
        } else {
            this.points = points;
        }
    }
    equals(): boolean {
        return false;
    }
    move(dx: number, dy: number): Polygon {
        var points:Point[] = [];
        for (var i = 0, len = this.points.length; i < len; i++) {
            points[i] = this.points[i].move(dx, dy);
        }
        return new Polygon(points).setStyle(this.style);
    }
    rotate(rad: number, center: Point): Polygon {
        var points:Point[] = [];
        for (var i = 0, len = this.points.length; i < len; i++) {
            points[i] = this.points[i].rotate(rad, center);
        }
        return new Polygon(points).setStyle(this.style);
    }
    has(P: Point): boolean {
        var a:Vector, b:Vector, cos:number, v:Point;
        var before_v = this.points[this.points.length - 1];
        var rad = 0;
        for (var i = 0, len = this.points.length; i < len; i++) {
            v = this.points[i];
            a = new Vector(v).substract(new Vector(P));
            b = new Vector(before_v).substract(new Vector(P));
            cos = a.product(b) / (a.abs() * b.abs());
            rad += Math.acos(cos);
            before_v = v;
        }
        return Math.round(rad / (2 * Math.PI) * 360) === 360;
    }
    name(): string {
        return 'Polygon';
    }
}
export class Quadrilateral extends Polygon{
    constructor(A: Point, B: Point, C: Point, D: Point) {
        if (!(this instanceof Quadrilateral)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if (new Segment(A, D).intersects(new Segment(B, C))) {
            throw new Error('ABCD is not a quadrilateral.');
        }
        if (A.equals(B) || A.equals(C) || A.equals(D) || B.equals(C) || B.equals(D) || C.equals(D)) {
            throw new Error('ABCD is not a quadrilateral.');
        }
        super(A, B, C, D);
    }
    getArea(): number {
        var A = this.points[0],
            B = this.points[1],
            C = this.points[2],
            D = this.points[3];
        var S1 = new Triangle(A, B, C).getArea();
        var S2 = new Triangle(A, C, D).getArea();
        return S1 + S2;
    }
    move(dx: number, dy: number): Quadrilateral {
        var newObject = super.move(dx, dy);
        var A = newObject.points[0],
            B = newObject.points[1],
            C = newObject.points[2],
            D = newObject.points[3];
        return new Quadrilateral(A, B, C, D);
    }
    rotate(rad: number, center: Point): Quadrilateral {
        var newObject = super.rotate(rad, center);
        var A = newObject.points[0],
            B = newObject.points[1],
            C = newObject.points[2],
            D = newObject.points[3];
        return new Quadrilateral(A, B, C, D);
    }
    name(): string {
        return 'Quadrilateral';
    }
}
export class Triangle extends Polygon{
    constructor(A: Point, B: Point, C: Point) {
        if (!(this instanceof Triangle)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if ((A == null) || (B == null) || (C == null)) {
            throw new Error('Triangle must have three vertices.');
        }
        if (A.equals(B) || B.equals(C) || A.equals(C)) {
            throw new Error('Triangle must have three vertices.');
        }
        super(A, B, C);
    }
    getCircumcircle(): Circle {
        var A = this.points[0],
            B = this.points[1],
            C = this.points[2];
        var AB = new Segment(A, B),
            BC = new Segment(B, C),
            CA = new Segment(C, A);
        var S = this.getArea();
        var vA = new Vector(A.x, A.y),
            vB = new Vector(B.x, B.y),
            vC = new Vector(C.x, C.y);
        var a = Math.pow(BC.length, 2),
            b = Math.pow(CA.length, 2),
            c = Math.pow(AB.length, 2);
        var vO = new Vector(0, 0)
            .add(vA.multiple(a * (b + c - a)))
            .add(vB.multiple(b * (c + a - b)))
            .add(vC.multiple(c * (a + b - c)))
            .multiple(1 / (16 * (Math.pow(S, 2))));
        var O = new Point(vO.x, vO.y);
        var cosA = vB.substract(vA).product(vC.substract(vA)) / (AB.length * CA.length),
            sinA = Math.sqrt(1 - Math.pow(cosA, 2));
        var R = BC.length / sinA / 2;
        return new Circle(O, R);
    }
    getIncircle(): Circle {
        var vA = new Vector(this.points[0].x, this.points[0].y),
            vB = new Vector(this.points[1].x, this.points[1].y),
            vC = new Vector(this.points[2].x, this.points[2].y);
        var a = vC.substract(vB).abs(),
            b = vC.substract(vA).abs(),
            c = vB.substract(vA).abs();
        var vO = new Vector(0, 0).add(vA.multiple(a / (a + b + c)))
            .add(vB.multiple(b / (a + b + c)))
            .add(vC.multiple(c / (a + b + c)));
        var O = new Point(vO.x, vO.y);
        var r = 2 * this.getArea() / (a + b + c);
        return new Circle(O, r);
    }
    getCenter(): Point {
        var A = this.points[0],
            B = this.points[1],
            C = this.points[2];
        return new Point((A.x + B.x + C.x) / 3, (A.y + B.y + C.y) / 3);
    }
    getArea(): number {
        var A = this.points[0],
            B = this.points[1],
            C = this.points[2];
        var AB = new Segment(A, B),
            AC = new Segment(A, C);
        var vAB = new Vector(B.x - A.x, B.y - A.y),
            vAC = new Vector(C.x - A.x, C.y - A.y);
        var cosA = vAB.product(vAC) / (AB.length * AC.length),
            sinA = Math.sqrt(1 - Math.pow(cosA, 2));
        var S = AB.length * AC.length * sinA / 2;
        return S;
    }
    move(dx: number, dy: number): Triangle {
        var newObject = super.move(dx, dy);
        var A = newObject.points[0],
            B = newObject.points[1],
            C = newObject.points[2];
        return new Triangle(A, B, C);
    }
    rotate(rad: number, center?: Point): Triangle{
        if (typeof center === 'undefined') {
            center = this.getCenter();
        }
        var newObject = super.rotate(rad, center);
        var A = newObject.points[0],
            B = newObject.points[1],
            C = newObject.points[2];
        return new Triangle(A, B, C);
    }
    name(): string {
        return 'Triangle';
    }
}
export class Rect extends Polygon{
    constructor(A: Point, B: Point) {
        if (!(this instanceof Rect)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        super(A, B);
    }
    has(P: Point): boolean {
        var A = this.points[0];
        var B = this.points[1];
        return (A.x - P.x) * (B.x - P.x) <= 0 && (A.y - P.y) * (B.y - P.y) <= 0;
    }
    move(dx: number, dy: number): Rect {
        var newObject = super.move(dx, dy);
        var A = newObject.points[0],
        B = newObject.points[1];
        return new Rect(A, B);
    }
    rotate(rad: number, center: Point): Rect {
        var newObject = super.rotate(rad, center);
        var A = newObject.points[0],
            B = newObject.points[1];
        return new Rect(A, B);
    }
    name(): string {
        return 'Rect';
    }
}
export class Text extends UnitaryObject{
    P: Point;
    string: string;
    text: string;
    strokesOutline: boolean;
    constructor(str: string, P: Point, align: string = 'left', maxWidth: number = null) {
        if (!(this instanceof Text)) {
            throw new Error('Constructor cannot be called as a function.');
        }
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
    strokeOutline(): Text {
        this.strokesOutline = true;
        return this;
    }
    setAlign(align: string): Text {
        this.style.align = align;
        return this;
    }
    setOutlineColor(color: string): Text {
        this.style.outlineColor = color;
        return this;
    }
    setBaseline(base: string): Text {
        this.style.baseline = base;
        return this;
    }
    setFont(font: string): Text {
        this.style.font = font;
        return this;
    }
    move(dx: number, dy: number): UnitaryObject {
        var newText = new Text(this.string, this.P.move(dx, dy), this.style.align, this.style.maxWidth).setStyle(this.style);
        if (this.strokesOutline) {
            newText.strokeOutline();
        }
        return newText;
    }
    name(): string {
        return 'Text';
    }
}
export class Image extends UnitaryObject{
    src: string;
    startPoint: Point;
    dx: number;
    dy: number;
    dw: number;
    dh: number;
    sw: number;
    sh: number;
    sx: number;
    sy: number;
    constructor(src: string, startPoint: Point) {
        if (!(this instanceof Image)) {
            throw new Error('Constructor cannot be called as a function.');
        }
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
    trim(startPoint: Point, sw: number, sh: number, dw: number = null, dh: number = null): Image {
        var newImage = new Image(this.src, this.startPoint);
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
    resize(dw: number, dh: number): Image {
        var newImage = new Image(this.src, this.startPoint);
        newImage.dw = dw;
        newImage.dh = dh;
        newImage.sw = this.sw;
        newImage.sh = this.sh;
        newImage.sx = this.sx;
        newImage.sy = this.sy;
        return newImage;
    }
    equals(B: Image): boolean {
        if (!super.equals(B)) {
            return false;
        }
        return this.src === B.src && this.dx === B.dx && this.dy === B.dy && this.dw === B.dw && this.dh === B.dh && this.sw === B.sw && this.sh === B.sh && this.sx === B.sx && this.sy === B.sy;
    }
    move(dx: number, dy: number): Image {
        var newImage = new Image(this.src, this.startPoint.move(dx, dy));
        if (this.sx !== null) {
            newImage.trim(new Point(this.sx, this.sy), this.sw, this.sh, this.dw, this.dh);
        }
        return newImage;
    }
    name(): string {
        return 'Image';
    }
}
export class Group extends UnitaryObject {
    group: UnitaryObject[];
    constructor(...objects: UnitaryObject[]) {
        super();
        this.group = objects;
    }
    name(): string {
        return 'Group';
    }
}
export class Graph extends UnitaryObject{
    f: Function;
    scale: number;
    start: number;
    end: number;
    constructor(f: Function, scale: number) {
        super();
        this.f = f;
        this.scale = scale;
        this.start = null;
        this.end = null;
    }
    setRange(start: number, end: number): Graph {
        this.start = start;
        this.end = end;
        return this;
    }
    equals(): boolean {
        return false;
    }
    moveX() {
    }
    moveY() {
    }
    name(): string {
        return 'Graph';
    }
}
export var XAxis = new Line(new Point(0, 0), new Point(1, 0));
export var YAxis = new Line(new Point(0, 0), new Point(0, 1));
export var VERSION = '0.0.5';
