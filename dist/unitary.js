"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function gcd(m, n) {
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
function distance(A, B) {
    var res;
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
exports.distance = distance;
var UnitaryObject = (function () {
    function UnitaryObject() {
        this.style = {
            fillColor: null,
            strokeColor: null
        };
        if (!(this instanceof UnitaryObject)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        this.style.fillColor = null;
        this.style.strokeColor = null;
    }
    UnitaryObject.prototype.equals = function (B) {
        return this.name() === B.name();
    };
    UnitaryObject.prototype.setFillColor = function (color) {
        this.style.fillColor = color;
        return this;
    };
    UnitaryObject.prototype.setStrokeColor = function (color) {
        this.style.strokeColor = color;
        return this;
    };
    UnitaryObject.prototype.setStyle = function (style) {
        for (var key in style) {
            this.style[key] = style[key];
        }
        return this;
    };
    UnitaryObject.prototype.move = function (dx, dy) {
        return this;
    };
    UnitaryObject.prototype.moveX = function (dx) {
        return this.move(dx, 0);
    };
    UnitaryObject.prototype.moveY = function (dy) {
        return this.move(0, dy);
    };
    UnitaryObject.prototype.name = function () {
        return 'UnitaryObject';
    };
    return UnitaryObject;
})();
exports.UnitaryObject = UnitaryObject;
var Point = (function (_super) {
    __extends(Point, _super);
    function Point(x, y) {
        if (!(this instanceof Point)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        _super.call(this);
        this.x = x;
        this.y = y;
    }
    Point.prototype.moveTo = function (x, y) {
        return new Point(x, y).setStyle(this.style);
    };
    Point.prototype.move = function (dx, dy) {
        return new Point(this.x + dx, this.y + dy).setStyle(this.style);
    };
    Point.prototype.rotate = function (rad, center) {
        var x = Math.cos(rad) * (this.x - center.x) - Math.sin(rad) * (this.y - center.y) + center.x;
        var y = Math.sin(rad) * (this.y - center.y) + Math.cos(rad) * (this.y - center.y) + center.y;
        return new Point(x, y);
    };
    Point.prototype.toString = function () {
        return '(' + this.x + ', ' + this.y + ')';
    };
    Point.prototype.inspect = function () {
        return '(' + this.x + ', ' + this.y + ')';
    };
    Point.prototype.equals = function (B) {
        if (!_super.prototype.equals.call(this, B)) {
            return false;
        }
        return this.x === B.x && this.y === B.y;
    };
    Point.prototype.name = function () {
        return 'Point';
    };
    return Point;
})(UnitaryObject);
exports.Point = Point;
var BaseVector = (function (_super) {
    __extends(BaseVector, _super);
    function BaseVector(x) {
        var y = [];
        for (var _a = 1; _a < arguments.length; _a++) {
            y[_a - 1] = arguments[_a];
        }
        _super.call(this);
        if (arguments.length === 1 && Object.prototype.toString.call(arguments[0]) === '[object Array]') {
            this.component = new Array(arguments[0].length);
            for (var i = 0, _i = arguments[0].length; i < _i; i = 0 | i + 1) {
                this.component[i] = arguments[0][i];
            }
        }
        else {
            this.component = new Array(arguments.length);
            for (var i = 0, _i = arguments.length; i < _i; i = 0 | i + 1) {
                this.component[i] = arguments[i];
            }
        }
    }
    BaseVector.prototype.add = function (CD) {
        if (this.component.length !== CD.component.length) {
            throw new Error('dimention of each vector are different.');
        }
        var component = new Array(this.component.length);
        for (var i = 0, _i = this.component.length; i < _i; i = 0 | i + 1) {
            component[i] = this.component[i] + CD.component[i];
        }
        return new BaseVector(component);
    };
    BaseVector.prototype.substract = function (CD) {
        return this.add(CD.multiple(-1));
    };
    BaseVector.prototype.product = function (CD) {
        if (this.component.length !== CD.component.length) {
            throw new Error('dimention of each vector are different.');
        }
        var product = 0;
        for (var i = 0, _i = this.component.length; i < _i; i = 0 | i + 1) {
            product += this.component[i] * CD.component[i];
        }
        return product;
    };
    BaseVector.prototype.multiple = function (k) {
        var component = new Array(this.component.length);
        for (var i = 0, _i = this.component.length; i < _i; i = 0 | i + 1) {
            component[i] = k * this.component[i];
        }
        return new BaseVector(component);
    };
    BaseVector.prototype.abs = function () {
        var res = 0;
        for (var i = 0, _i = this.component.length; i < _i; i = 0 | i + 1) {
            res += this.component[i] * this.component[i];
        }
        return Math.sqrt(res);
    };
    BaseVector.prototype.equals = function (B) {
        if (this.component.length !== B.component.length) {
            return false;
        }
        for (var i = 0, _i = this.component.length; i < _i; i = 0 | i + 1) {
            if (this.component[i] !== B.component[i]) {
                return false;
            }
        }
        return true;
    };
    ;
    BaseVector.prototype.move = function () {
        var dx = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            dx[_a - 0] = arguments[_a];
        }
        var component = new Array(arguments.length);
        for (var i = 0, _i = arguments.length; i < _i; i = 0 | i + 1) {
            component[i] = arguments[i];
        }
        return this.add(new BaseVector(component));
    };
    BaseVector.prototype.name = function () {
        return 'BaseVector';
    };
    return BaseVector;
})(UnitaryObject);
exports.BaseVector = BaseVector;
var Vector = (function (_super) {
    __extends(Vector, _super);
    function Vector(x, y) {
        if (!(this instanceof Vector)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if (arguments.length === 2) {
            _super.call(this, arguments[0], arguments[1]);
            this.x = arguments[0];
            this.y = arguments[1];
        }
        else if (arguments.length === 1) {
            _super.call(this, arguments[0].x, arguments[0].y);
            this.x = arguments[0].x;
            this.y = arguments[0].y;
        }
    }
    Vector.prototype.add = function (CD) {
        var newVector = _super.prototype.add.call(this, CD);
        return new Vector(newVector.component[0], newVector.component[1]);
    };
    Vector.prototype.substract = function (CD) {
        var newVector = _super.prototype.substract.call(this, CD);
        return new Vector(newVector.component[0], newVector.component[1]);
    };
    Vector.prototype.multiple = function (k) {
        var newVector = _super.prototype.multiple.call(this, k);
        return new Vector(newVector.component[0], newVector.component[1]);
    };
    Vector.prototype.equals = function (B) {
        if (!_super.prototype.equals.call(this, B)) {
            return false;
        }
        return this.x === B.x && this.y === B.y;
    };
    Vector.prototype.move = function (dx, dy) {
        return new Vector(this.x + dx, this.y + dy);
    };
    Vector.prototype.name = function () {
        return 'Vector';
    };
    return Vector;
})(BaseVector);
exports.Vector = Vector;
var Vector3D = (function (_super) {
    __extends(Vector3D, _super);
    function Vector3D(x, y, z) {
        if (!(this instanceof Vector3D)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if (arguments.length === 3) {
            _super.call(this, arguments[0], arguments[1], arguments[2]);
            this.x = arguments[0];
            this.y = arguments[1];
            this.z = arguments[2];
        }
        else if (arguments.length === 1) {
            _super.call(this, arguments[0].x, arguments[0].y, arguments[0].z);
            this.x = arguments[0].x;
            this.y = arguments[0].y;
            this.z = arguments[0].z;
        }
    }
    Vector3D.prototype.add = function (CD) {
        var newVector = _super.prototype.add.call(this, CD);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    };
    Vector3D.prototype.substract = function (CD) {
        var newVector = _super.prototype.substract.call(this, CD);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    };
    Vector3D.prototype.multiple = function (k) {
        var newVector = _super.prototype.multiple.call(this, k);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    };
    Vector3D.prototype.move = function (dx, dy, dz) {
        return new Vector3D(this.x + dx, this.y + dy, this.z + dz);
    };
    Vector3D.prototype.name = function () {
        return 'Vector3D';
    };
    return Vector3D;
})(BaseVector);
exports.Vector3D = Vector3D;
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(A, B) {
        var g;
        if (!(this instanceof Line)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if (A.equals(B)) {
            throw new Error('A equals B. So AB couldn\'t construct line.');
        }
        _super.call(this);
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
    Line.prototype.move = function (dx, dy) {
        return new Line(this.points[0].move(dx, dy), this.points[1].move(dx, dy)).setStyle(this.style);
    };
    Line.prototype.getEquation = function () {
        var res;
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
        if (a > 0 && a !== 1) {
            res += '+' + a + 'x';
        }
        if (a === 1) {
            res += '+x';
        }
        // if (a < 0 && a !== -1) { res += '-' + -a + 'x'; }
        // if (a === -1) { res += '-x'; }
        if (b > 0 && b !== 1) {
            res += '+' + b + 'y';
        }
        if (b === 1) {
            res += '+y';
        }
        if (b < 0 && b !== -1) {
            res += '-' + -b + 'y';
        }
        if (b === -1) {
            res += '-y';
        }
        if (c > 0) {
            res += '+' + c;
        }
        if (c < 0) {
            res += '-' + -c;
        }
        if (res.charAt(0) === '+') {
            res = res.slice(1);
        }
        return res + '=0';
    };
    Line.prototype.toString = function () {
        return this.getEquation();
    };
    Line.prototype.inspect = function () {
        return this.getEquation();
    };
    Line.prototype.getIntersection = function (CD) {
        var x, y;
        if (this.a === CD.a && this.b === CD.b) {
            return false;
        }
        y = (CD.a * this.c - this.a * CD.c) / (this.a * CD.b - CD.a * this.b);
        x = -1 * (this.b * y + this.c) / this.a;
        return new Point(x, y);
    };
    Line.prototype.equals = function (CD) {
        if (!_super.prototype.equals.call(this, CD)) {
            return false;
        }
        return this.a === CD.a && this.b === CD.b && this.c === CD.c;
    };
    Line.prototype.name = function () {
        return 'Line';
    };
    return Line;
})(UnitaryObject);
exports.Line = Line;
var Segment = (function (_super) {
    __extends(Segment, _super);
    function Segment(A, B) {
        if (!(this instanceof Segment)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if (A.x > B.x) {
            this.points = [B, A];
        }
        else {
            this.points = [A, B];
        }
        _super.call(this);
        this.length = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2));
    }
    Segment.prototype.move = function (dx, dy) {
        return new Segment(this.points[0].move(dx, dy), this.points[1].move(dx, dy)).setStyle(this.style);
    };
    Segment.prototype.has = function (P) {
        var A, B;
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
    };
    Segment.prototype.intersects = function (CD) {
        var intersection;
        if (CD instanceof Line) {
            intersection = this.toLine().getIntersection(CD);
        }
        else {
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
    ;
    Segment.prototype.toLine = function () {
        return new Line(this.points[0], this.points[1]);
    };
    ;
    Segment.prototype.equals = function (CD) {
        if (!_super.prototype.equals.call(this, CD)) {
            return false;
        }
        return this.points[0].equals(CD.points[0]) && this.points[1].equals(CD.points[1]);
    };
    Segment.prototype.name = function () {
        return 'Segment';
    };
    return Segment;
})(UnitaryObject);
exports.Segment = Segment;
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(center, radius) {
        if (!(this instanceof Circle)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        _super.call(this);
        this.center = center;
        this.Origin = center;
        this.r = radius;
        this.radius = radius;
    }
    Circle.prototype.moveTo = function (x, y) {
        return new Circle(this.center.moveTo(x, y), this.r).setStyle(this.style);
    };
    Circle.prototype.move = function (dx, dy) {
        return new Circle(this.center.move(dx, dy), this.r).setStyle(this.style);
    };
    Circle.prototype.getEquation = function () {
        var res = '(x';
        if (this.center.x > 0)
            res += '-' + this.center.x;
        else if (this.center.x < 0)
            res += '+' + (-this.center.x); // + abs(this.center.x)
        res += ')^2+(y';
        if (this.center.y > 0)
            res += '-' + this.center.y;
        else if (this.center.y < 0)
            res += '+' + (-this.center.y); // + abs(this.center.x)
        res += ')^2=' + this.r + '^2';
        return res;
    };
    Circle.prototype.equals = function (C) {
        if (!_super.prototype.equals.call(this, C)) {
            return false;
        }
        return this.center.equals(C.center) && this.r === C.r;
    };
    Circle.prototype.name = function () {
        return 'Circle';
    };
    return Circle;
})(UnitaryObject);
exports.Circle = Circle;
var CircularSector = (function (_super) {
    __extends(CircularSector, _super);
    function CircularSector(center, radius, endAngle, startAngle) {
        if (startAngle === void 0) { startAngle = 0; }
        if (!(this instanceof CircularSector)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        _super.call(this);
        this.center = center;
        this.Origin = center;
        this.radius = radius;
        this.r = radius;
        this.endAngle = endAngle;
        this.startAngle = startAngle;
    }
    CircularSector.prototype.moveTo = function (x, y) {
        return new CircularSector(this.center.moveTo(x, y), this.r, this.endAngle, this.startAngle).setStyle(this.style);
    };
    CircularSector.prototype.move = function (dx, dy) {
        return new CircularSector(this.center.move(dx, dy), this.r, this.endAngle, this.startAngle).setStyle(this.style);
    };
    CircularSector.prototype.rotate = function (rad) {
        return new CircularSector(this.center, this.r, this.endAngle + rad, this.startAngle + rad).setStyle(this.style);
    };
    CircularSector.prototype.equals = function (C) {
        function angleCompare(A, B) {
            return (A - B) % (2 * Math.PI) === 0;
        }
        if (!_super.prototype.equals.call(this, C)) {
            return false;
        }
        return this.center.equals(C.center) && this.r === C.r && angleCompare(this.startAngle, C.startAngle) && angleCompare(this.endAngle, C.endAngle);
    };
    CircularSector.prototype.name = function () {
        return 'CircularSector';
    };
    return CircularSector;
})(UnitaryObject);
exports.CircularSector = CircularSector;
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon() {
        var points;
        points = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
        if (!(this instanceof Polygon)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        _super.call(this);
        if (Object.prototype.toString.call(points[0]) === '[object Array]') {
            this.points = points[0];
        }
        else {
            this.points = points;
        }
    }
    Polygon.prototype.equals = function () {
        return false;
    };
    Polygon.prototype.move = function (dx, dy) {
        var points = [];
        for (var i = 0, len = this.points.length; i < len; i++) {
            points[i] = this.points[i].move(dx, dy);
        }
        return new Polygon(points).setStyle(this.style);
    };
    Polygon.prototype.rotate = function (rad, center) {
        var points = [];
        for (var i = 0, len = this.points.length; i < len; i++) {
            points[i] = this.points[i].rotate(rad, center);
        }
        return new Polygon(points).setStyle(this.style);
    };
    Polygon.prototype.has = function (P) {
        var a, b, cos, v;
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
    };
    Polygon.prototype.name = function () {
        return 'Polygon';
    };
    return Polygon;
})(UnitaryObject);
exports.Polygon = Polygon;
var Quadrilateral = (function (_super) {
    __extends(Quadrilateral, _super);
    function Quadrilateral(A, B, C, D) {
        if (!(this instanceof Quadrilateral)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if (new Segment(A, D).intersects(new Segment(B, C))) {
            throw new Error('ABCD is not a quadrilateral.');
        }
        if (A.equals(B) || A.equals(C) || A.equals(D) || B.equals(C) || B.equals(D) || C.equals(D)) {
            throw new Error('ABCD is not a quadrilateral.');
        }
        _super.call(this, A, B, C, D);
    }
    Quadrilateral.prototype.getArea = function () {
        var A = this.points[0], B = this.points[1], C = this.points[2], D = this.points[3];
        var S1 = new Triangle(A, B, C).getArea();
        var S2 = new Triangle(A, C, D).getArea();
        return S1 + S2;
    };
    Quadrilateral.prototype.move = function (dx, dy) {
        var newObject = _super.prototype.move.call(this, dx, dy);
        var A = newObject.points[0], B = newObject.points[1], C = newObject.points[2], D = newObject.points[3];
        return new Quadrilateral(A, B, C, D);
    };
    Quadrilateral.prototype.rotate = function (rad, center) {
        var newObject = _super.prototype.rotate.call(this, rad, center);
        var A = newObject.points[0], B = newObject.points[1], C = newObject.points[2], D = newObject.points[3];
        return new Quadrilateral(A, B, C, D);
    };
    Quadrilateral.prototype.name = function () {
        return 'Quadrilateral';
    };
    return Quadrilateral;
})(Polygon);
exports.Quadrilateral = Quadrilateral;
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(A, B, C) {
        if (!(this instanceof Triangle)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        if ((A == null) || (B == null) || (C == null)) {
            throw new Error('Triangle must have three vertices.');
        }
        if (A.equals(B) || B.equals(C) || A.equals(C)) {
            throw new Error('Triangle must have three vertices.');
        }
        _super.call(this, A, B, C);
    }
    Triangle.prototype.getCircumcircle = function () {
        var A = this.points[0], B = this.points[1], C = this.points[2];
        var AB = new Segment(A, B), BC = new Segment(B, C), CA = new Segment(C, A);
        var S = this.getArea();
        var vA = new Vector(A.x, A.y), vB = new Vector(B.x, B.y), vC = new Vector(C.x, C.y);
        var a = Math.pow(BC.length, 2), b = Math.pow(CA.length, 2), c = Math.pow(AB.length, 2);
        var vO = new Vector(0, 0)
            .add(vA.multiple(a * (b + c - a)))
            .add(vB.multiple(b * (c + a - b)))
            .add(vC.multiple(c * (a + b - c)))
            .multiple(1 / (16 * (Math.pow(S, 2))));
        var O = new Point(vO.x, vO.y);
        var cosA = vB.substract(vA).product(vC.substract(vA)) / (AB.length * CA.length), sinA = Math.sqrt(1 - Math.pow(cosA, 2));
        var R = BC.length / sinA / 2;
        return new Circle(O, R);
    };
    Triangle.prototype.getIncircle = function () {
        var vA = new Vector(this.points[0].x, this.points[0].y), vB = new Vector(this.points[1].x, this.points[1].y), vC = new Vector(this.points[2].x, this.points[2].y);
        var a = vC.substract(vB).abs(), b = vC.substract(vA).abs(), c = vB.substract(vA).abs();
        var vO = new Vector(0, 0).add(vA.multiple(a / (a + b + c)))
            .add(vB.multiple(b / (a + b + c)))
            .add(vC.multiple(c / (a + b + c)));
        var O = new Point(vO.x, vO.y);
        var r = 2 * this.getArea() / (a + b + c);
        return new Circle(O, r);
    };
    Triangle.prototype.getCenter = function () {
        var A = this.points[0], B = this.points[1], C = this.points[2];
        return new Point((A.x + B.x + C.x) / 3, (A.y + B.y + C.y) / 3);
    };
    Triangle.prototype.getArea = function () {
        var A = this.points[0], B = this.points[1], C = this.points[2];
        var AB = new Segment(A, B), AC = new Segment(A, C);
        var vAB = new Vector(B.x - A.x, B.y - A.y), vAC = new Vector(C.x - A.x, C.y - A.y);
        var cosA = vAB.product(vAC) / (AB.length * AC.length), sinA = Math.sqrt(1 - Math.pow(cosA, 2));
        var S = AB.length * AC.length * sinA / 2;
        return S;
    };
    Triangle.prototype.move = function (dx, dy) {
        var newObject = _super.prototype.move.call(this, dx, dy);
        var A = newObject.points[0], B = newObject.points[1], C = newObject.points[2];
        return new Triangle(A, B, C);
    };
    Triangle.prototype.rotate = function (rad, center) {
        if (typeof center === 'undefined') {
            center = this.getCenter();
        }
        var newObject = _super.prototype.rotate.call(this, rad, center);
        var A = newObject.points[0], B = newObject.points[1], C = newObject.points[2];
        return new Triangle(A, B, C);
    };
    Triangle.prototype.name = function () {
        return 'Triangle';
    };
    return Triangle;
})(Polygon);
exports.Triangle = Triangle;
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect(A, B) {
        if (!(this instanceof Rect)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        _super.call(this, A, B);
    }
    Rect.prototype.has = function (P) {
        var A = this.points[0];
        var B = this.points[1];
        return (A.x - P.x) * (B.x - P.x) <= 0 && (A.y - P.y) * (B.y - P.y) <= 0;
    };
    Rect.prototype.move = function (dx, dy) {
        var newObject = _super.prototype.move.call(this, dx, dy);
        var A = newObject.points[0], B = newObject.points[1];
        return new Rect(A, B);
    };
    Rect.prototype.rotate = function (rad, center) {
        var newObject = _super.prototype.rotate.call(this, rad, center);
        var A = newObject.points[0], B = newObject.points[1];
        return new Rect(A, B);
    };
    Rect.prototype.name = function () {
        return 'Rect';
    };
    return Rect;
})(Polygon);
exports.Rect = Rect;
var Text = (function (_super) {
    __extends(Text, _super);
    function Text(str, P, align, maxWidth) {
        if (align === void 0) { align = 'left'; }
        if (maxWidth === void 0) { maxWidth = null; }
        if (!(this instanceof Text)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        _super.call(this);
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
    Text.prototype.strokeOutline = function () {
        this.strokesOutline = true;
        return this;
    };
    Text.prototype.setAlign = function (align) {
        this.style.align = align;
        return this;
    };
    Text.prototype.setOutlineColor = function (color) {
        this.style.outlineColor = color;
        return this;
    };
    Text.prototype.setBaseline = function (base) {
        this.style.baseline = base;
        return this;
    };
    Text.prototype.setFont = function (font) {
        this.style.font = font;
        return this;
    };
    Text.prototype.move = function (dx, dy) {
        var newText = new Text(this.string, this.P.move(dx, dy), this.style.align, this.style.maxWidth).setStyle(this.style);
        if (this.strokesOutline) {
            newText.strokeOutline();
        }
        return newText;
    };
    Text.prototype.name = function () {
        return 'Text';
    };
    return Text;
})(UnitaryObject);
exports.Text = Text;
var Image = (function (_super) {
    __extends(Image, _super);
    function Image(src, startPoint) {
        if (!(this instanceof Image)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        _super.call(this);
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
    Image.prototype.trim = function (startPoint, sw, sh, dw, dh) {
        if (dw === void 0) { dw = null; }
        if (dh === void 0) { dh = null; }
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
    ;
    Image.prototype.resize = function (dw, dh) {
        var newImage = new Image(this.src, this.startPoint);
        newImage.dw = dw;
        newImage.dh = dh;
        newImage.sw = this.sw;
        newImage.sh = this.sh;
        newImage.sx = this.sx;
        newImage.sy = this.sy;
        return newImage;
    };
    Image.prototype.equals = function (B) {
        if (!_super.prototype.equals.call(this, B)) {
            return false;
        }
        return this.src === B.src && this.dx === B.dx && this.dy === B.dy && this.dw === B.dw && this.dh === B.dh && this.sw === B.sw && this.sh === B.sh && this.sx === B.sx && this.sy === B.sy;
    };
    Image.prototype.move = function (dx, dy) {
        var newImage = new Image(this.src, this.startPoint.move(dx, dy));
        if (this.sx !== null) {
            newImage = newImage.trim(new Point(this.sx, this.sy), this.sw, this.sh, this.dw, this.dh);
        }
        return newImage;
    };
    Image.prototype.name = function () {
        return 'Image';
    };
    return Image;
})(UnitaryObject);
exports.Image = Image;
var Group = (function (_super) {
    __extends(Group, _super);
    function Group() {
        var objects = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            objects[_a - 0] = arguments[_a];
        }
        _super.call(this);
        this.group = objects;
    }
    Group.prototype.name = function () {
        return 'Group';
    };
    return Group;
})(UnitaryObject);
exports.Group = Group;
var Graph = (function (_super) {
    __extends(Graph, _super);
    function Graph(f, scale) {
        _super.call(this);
        this.f = f;
        this.scale = scale;
        this.start = null;
        this.end = null;
    }
    Graph.prototype.setRange = function (start, end) {
        this.start = start;
        this.end = end;
        return this;
    };
    Graph.prototype.equals = function () {
        return false;
    };
    Graph.prototype.moveX = function () {
    };
    Graph.prototype.moveY = function () {
    };
    Graph.prototype.name = function () {
        return 'Graph';
    };
    return Graph;
})(UnitaryObject);
exports.Graph = Graph;
exports.XAxis = new Line(new Point(0, 0), new Point(1, 0));
exports.YAxis = new Line(new Point(0, 0), new Point(0, 1));
exports.VERSION = '0.0.5';
