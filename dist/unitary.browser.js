(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
exports.gcd = gcd;
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
        if (!(this instanceof UnitaryObject)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        this.fillColor = null;
        this.strokeColor = null;
    }
    UnitaryObject.prototype.equals = function (B) {
        return this.name() === B.name();
    };
    UnitaryObject.prototype.setFillColor = function (color) {
        this.fillColor = color;
        return this;
    };
    UnitaryObject.prototype.setStrokeColor = function (color) {
        this.strokeColor = color;
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
        return new Point(x, y).setStrokeColor(this.strokeColor).setFillColor(this.fillColor);
    };
    Point.prototype.move = function (dx, dy) {
        return new Point(this.x + dx, this.y + dy).setStrokeColor(this.strokeColor).setFillColor(this.fillColor);
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
var Vector = (function (_super) {
    __extends(Vector, _super);
    function Vector(x, y) {
        if (!(this instanceof Vector)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        _super.call(this);
        if (arguments.length === 2) {
            this.x = arguments[0];
            this.y = arguments[1];
        }
        else if (arguments.length === 1) {
            this.x = arguments[0].x;
            this.y = arguments[0].y;
        }
    }
    Vector.prototype.add = function (CD) {
        return new Vector(this.x + CD.x, this.y + CD.y);
    };
    Vector.prototype.minus = function (CD) {
        return new Vector(this.x - CD.x, this.y - CD.y);
    };
    Vector.prototype.product = function (CD) {
        return this.x * CD.x + this.y * CD.y;
    };
    Vector.prototype.multiple = function (k) {
        return new Vector(this.x * k, this.y * k);
    };
    Vector.prototype.abs = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
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
})(UnitaryObject);
exports.Vector = Vector;
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
        return new Line(this.points[0].move(dx, dy), this.points[1].move(dx, dy))
            .setStrokeColor(this.strokeColor)
            .setFillColor(this.fillColor);
    };
    Line.prototype.toString = function () {
        var res;
        res = '';
        if (this.a > 0 && this.a !== 1) {
            res += '+' + this.a + 'x';
        }
        if (this.a === 1) {
            res += '+x';
        }
        if (this.a < 0 && this.a !== -1) {
            res += '-' + -this.a + 'x';
        }
        if (this.a === -1) {
            res += '-x';
        }
        if (this.b > 0 && this.b !== 1) {
            res += '+' + this.b + 'y';
        }
        if (this.b === 1) {
            res += '+y';
        }
        if (this.b < 0 && this.b !== -1) {
            res += '-' + -this.b + 'y';
        }
        if (this.b === -1) {
            res += '-y';
        }
        if (this.c > 0) {
            res += '+' + this.c;
        }
        if (this.c < 0) {
            res += '-' + -this.c;
        }
        if (res.charAt(0) === '+') {
            res = res.slice(1);
        }
        return res + '=0';
    };
    Line.prototype.inspect = function () {
        var res;
        res = '';
        if (this.a > 0 && this.a !== 1) {
            res += '+' + this.a + 'x';
        }
        if (this.a === 1) {
            res += '+x';
        }
        if (this.a < 0 && this.a !== -1) {
            res += '-' + -this.a + 'x';
        }
        if (this.a === -1) {
            res += '-x';
        }
        if (this.b > 0 && this.b !== 1) {
            res += '+' + this.b + 'y';
        }
        if (this.b === 1) {
            res += '+y';
        }
        if (this.b < 0 && this.b !== -1) {
            res += '-' + -this.b + 'y';
        }
        if (this.b === -1) {
            res += '-y';
        }
        if (this.c > 0) {
            res += '+' + this.c;
        }
        if (this.c < 0) {
            res += '-' + -this.c;
        }
        if (res.charAt(0) === '+') {
            res = res.slice(1);
        }
        return res + '=0';
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
        return new Segment(this.points[0].move(dx, dy), this.points[1].move(dx, dy)).setStrokeColor(this.strokeColor).setFillColor(this.fillColor);
    };
    Segment.prototype.has = function (P) {
        var A, B, ref, ref1, ref2;
        A = this.points[0];
        B = this.points[1];
        if ((A.x <= (ref = P.x) && ref <= B.x)) {
            if (A.y <= B.y && (A.y <= (ref1 = P.y) && ref1 <= B.y) || A.y >= B.y && (A.y >= (ref2 = P.y) && ref2 >= B.y)) {
                if ((A.y - B.y) / (A.x - B.x) * P.x === P.y) {
                    return true;
                }
            }
        }
        return false;
    };
    Segment.prototype.intersects = function (CD) {
        var intersection, ref;
        if (CD instanceof Line) {
            intersection = this.toLine().getIntersection(CD);
        }
        else {
            intersection = this.toLine().getIntersection(CD.toLine());
        }
        if (intersection === false) {
            return false;
        }
        if ((this.points[0].x <= (ref = intersection.x) && ref <= this.points[1].x)) {
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
    function Circle(O, radius) {
        if (!(this instanceof Circle)) {
            throw new Error('Constructor cannot be called as a function.');
        }
        _super.call(this);
        this.Origin = O;
        this.r = radius;
    }
    Circle.prototype.moveTo = function (x, y) {
        return new Circle(this.Origin.moveTo(x, y), this.r).setStrokeColor(this.strokeColor).setFillColor(this.fillColor);
    };
    Circle.prototype.move = function (dx, dy) {
        return new Circle(this.Origin.move(dx, dy), this.r).setStrokeColor(this.strokeColor).setFillColor(this.fillColor);
    };
    Circle.prototype.equals = function (C) {
        if (!_super.prototype.equals.call(this, C)) {
            return false;
        }
        return this.Origin.equals(C.Origin) && this.r === C.r;
    };
    Circle.prototype.name = function () {
        return 'Circle';
    };
    return Circle;
})(UnitaryObject);
exports.Circle = Circle;
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
        var i, len, length, points, ref, val;
        points = [];
        length = 0;
        ref = this.points;
        for (i = 0, len = ref.length; i < len; i++) {
            val = ref[i];
            points[length] = val.move(dx, dy);
            length = 0 | length + 1;
        }
        return new Polygon(points).setStrokeColor(this.strokeColor).setFillColor(this.fillColor);
    };
    Polygon.prototype.has = function (P) {
        var a, b, before_v, cos, i, len, rad, ref, v;
        before_v = this.points[this.points.length - 1];
        rad = 0;
        ref = this.points;
        for (i = 0, len = ref.length; i < len; i++) {
            v = ref[i];
            a = new Vector(v).minus(new Vector(P));
            b = new Vector(before_v).minus(new Vector(P));
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
        var A, B, C, D, S1, S2, ref;
        ref = this.points, A = ref[0], B = ref[1], C = ref[2], D = ref[3];
        S1 = new Triangle(A, B, C).getArea();
        S2 = new Triangle(A, C, D).getArea();
        return S1 + S2;
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
        var A, AB, B, BC, C, CA, O, R, S, a, b, c, cosA, sinA, vA, vB, vC, vO;
        A = this.points[0];
        B = this.points[1];
        C = this.points[2];
        AB = new Segment(A, B);
        BC = new Segment(B, C);
        CA = new Segment(C, A);
        S = this.getArea();
        vA = new Vector(A.x, A.y);
        vB = new Vector(B.x, B.y);
        vC = new Vector(C.x, C.y);
        a = Math.pow(BC.length, 2);
        b = Math.pow(CA.length, 2);
        c = Math.pow(AB.length, 2);
        vO = new Vector(0, 0)
            .add(vA.multiple(a * (b + c - a)))
            .add(vB.multiple(b * (c + a - b)))
            .add(vC.multiple(c * (a + b - c)))
            .multiple(1 / (16 * (Math.pow(S, 2))));
        O = new Point(vO.x, vO.y);
        cosA = vB.minus(vA).product(vC.minus(vA)) / (AB.length * CA.length);
        sinA = Math.sqrt(1 - Math.pow(cosA, 2));
        R = BC.length / sinA / 2;
        return new Circle(O, R);
    };
    Triangle.prototype.getIncircle = function () {
        var O, a, b, c, r, vA, vB, vC, vO;
        vA = new Vector(this.points[0].x, this.points[0].y);
        vB = new Vector(this.points[1].x, this.points[1].y);
        vC = new Vector(this.points[2].x, this.points[2].y);
        a = vC.minus(vB).abs();
        b = vC.minus(vA).abs();
        c = vB.minus(vA).abs();
        vO = new Vector(0, 0).add(vA.multiple(a / (a + b + c)))
            .add(vB.multiple(b / (a + b + c)))
            .add(vC.multiple(c / (a + b + c)));
        O = new Point(vO.x, vO.y);
        r = 2 * this.getArea() / (a + b + c);
        return new Circle(O, r);
    };
    Triangle.prototype.getArea = function () {
        var A, AB, AC, B, C, S, cosA, sinA, vAB, vAC;
        A = this.points[0];
        B = this.points[1];
        C = this.points[2];
        AB = new Segment(A, B);
        AC = new Segment(A, C);
        vAB = new Vector(B.x - A.x, B.y - A.y);
        vAC = new Vector(C.x - A.x, C.y - A.y);
        cosA = vAB.product(vAC) / (AB.length * AC.length);
        sinA = Math.sqrt(1 - Math.pow(cosA, 2));
        S = AB.length * AC.length * sinA / 2;
        return S;
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
        var A, B;
        A = this.points[0];
        B = this.points[1];
        return (A.x - P.x) * (B.x - P.x) <= 0 && (A.y - P.y) * (B.y - P.y) <= 0;
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
        this.align = align;
        this.maxWidth = maxWidth;
        this.strokesOutline = false;
        this.fillColor = '#000';
        this.outlineColor = '#000';
        this.baseline = 'alphabetic';
        this.font = null;
    }
    Text.prototype.strokeOutline = function () {
        this.strokesOutline = true;
        return this;
    };
    Text.prototype.setAlign = function (align) {
        this.align = align;
        return this;
    };
    Text.prototype.setOutlineColor = function (color) {
        this.outlineColor = color;
        return this;
    };
    Text.prototype.setBaseline = function (base) {
        this.baseline = base;
        return this;
    };
    Text.prototype.setFont = function (font) {
        this.font = font;
        return this;
    };
    Text.prototype.move = function (dx, dy) {
        return new Text(this.string, this.P.move(dx, dy), this.align, this.maxWidth)
            .setStrokeColor(this.strokeColor)
            .setFillColor(this.fillColor)
            .setOutlineColor(this.outlineColor)
            .setBaseline(this.baseline)
            .setFont(this.font);
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
        if (dw == null) {
            dw = sw;
        }
        if (dh == null) {
            dh = sh;
        }
        this.sx = startPoint.x;
        this.sy = startPoint.y;
        this.sw = sw;
        this.sh = sh;
        this.dw = dw;
        this.dh = dh;
        return this;
    };
    ;
    Image.prototype.resize = function (dw, dh) {
        this.dw = dw;
        this.dh = dh;
        return this;
    };
    Image.prototype.equals = function (B) {
        if (!_super.prototype.equals.call(this, B)) {
            return false;
        }
        return this.src === B.src && this.dx === B.dx && this.dy === B.dy && this.dw === B.dw && this.dh === B.dh && this.sw === B.sw && this.sh === B.sh && this.sx === B.sx && this.sy === B.sy;
    };
    Image.prototype.move = function (dx, dy) {
        var newImage;
        newImage = new Image(this.src, this.startPoint.move(dx, dy));
        if (this.sx !== null) {
            newImage.trim(new Point(this.sx, this.sy), this.sw, this.sh, this.dw, this.dh);
        }
        return newImage;
    };
    Image.prototype.name = function () {
        return 'Image';
    };
    return Image;
})(UnitaryObject);
exports.Image = Image;
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

},{}],2:[function(require,module,exports){
window.Unitary = require('../dist/unitary.js');

},{"../dist/unitary.js":1}]},{},[2]);
