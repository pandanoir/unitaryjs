// Generated by CoffeeScript 1.9.1
(function() {
  "use strict";
  var Circle, Image_, Line, Module, Point, Polygon, Quadrilateral, Rect, Segment, Text_, Triangle, UnitaryObject, Vector, WORLD, _global, distance,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  distance = function(A, B) {
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
  };

  UnitaryObject = (function() {
    function UnitaryObject() {}

    UnitaryObject.prototype.equals = function(B) {
      return this.name() === B.name();
    };

    UnitaryObject.prototype.name = function() {
      return 'UnitaryObject';
    };

    return UnitaryObject;

  })();

  Point = (function(superClass) {
    extend(Point, superClass);

    function Point(x, y) {
      if (!(this instanceof Point)) {
        throw new Error('Constructor cannot be called as a function.');
      }
      this.x = x;
      this.y = y;
    }

    Point.fromVector = (function(c) {
      c.prototype = Point.prototype;
      return c;
    })(function(A) {
      this.x = A.x;
      return this.y = A.y;
    });

    Point.prototype.moveTo = function(x, y) {
      return new Point(x, y);
    };

    Point.prototype.move = function(dx, dy) {
      return new Point(this.x + dx, this.y + dy);
    };

    Point.prototype.moveX = function(dx) {
      return new Point(this.x + dx, this.y);
    };

    Point.prototype.moveY = function(dy) {
      return new Point(this.x, this.y + dy);
    };

    Point.prototype.toString = function() {
      return '(' + this.x + ', ' + this.y + ')';
    };

    Point.prototype.inspect = function() {
      return '(' + this.x + ', ' + this.y + ')';
    };

    Point.prototype.equals = function(B) {
      if (!Point.__super__.equals.call(this, B)) {
        return false;
      }
      return this.x === B.x && this.y === B.y;
    };

    Point.prototype.name = function() {
      return 'Point';
    };

    return Point;

  })(UnitaryObject);

  Vector = (function(superClass) {
    extend(Vector, superClass);

    function Vector(x, y) {
      this.x = x;
      this.y = y;
    }

    Vector.from = (function(c) {
      c.prototype = Vector.prototype;
      return c;
    })(function(A, B) {
      this.x = B.x - A.x;
      return this.y = B.y - A.y;
    });

    Vector.prototype.add = function(CD) {
      return new Vector(this.x + CD.x, this.y + CD.y);
    };

    Vector.prototype.minus = function(CD) {
      return new Vector(this.x - CD.x, this.y - CD.y);
    };

    Vector.prototype.product = function(CD) {
      return this.x * CD.x + this.y * CD.y;
    };

    Vector.prototype.multiple = function(k) {
      return new Vector(this.x * k, this.y * k);
    };

    Vector.prototype.abs = function() {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };

    Vector.prototype.equals = function(B) {
      if (!Vector.__super__.equals.call(this, B)) {
        return false;
      }
      return this.x === B.x && this.y === B.y;
    };

    Vector.prototype.name = function() {
      return 'Vector';
    };

    return Vector;

  })(UnitaryObject);

  Line = (function(superClass) {
    extend(Line, superClass);

    function Line(A, B) {
      var g, gcd;
      if (!(this instanceof Line)) {
        throw new Error('Constructor cannot be called as a function.');
      }
      if (A.equals(B)) {
        throw new Error('A equals B. So AB couldn\'t construct line.');
      }
      gcd = function(m, n) {
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
      };
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

    Line.prototype.move = function(dx, dy) {
      return new Line(this.points[0].move(x + dx, y + dy), this.points[1].move(x + dx, y + dy));
    };

    Line.prototype.moveX = function(dx) {
      return new Line(this.points[0].move(x + dx, y), this.points[1].move(x + dx, y));
    };

    Line.prototype.moveY = function(dy) {
      return new Line(this.points[0].move(x, y + dy), this.points[1].move(x, y + dy));
    };

    Line.prototype.toString = function() {
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

    Line.prototype.inspect = function() {
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

    Line.prototype.getIntersection = function(CD) {
      var x, y;
      if (this.a === CD.a && this.b === CD.b) {
        return false;
      }
      y = (CD.a * this.c - this.a * CD.c) / (this.a * CD.b - CD.a * this.b);
      x = -1 * (this.b * y + this.c) / this.a;
      return new Point(x, y);
    };

    Line.prototype.equals = function(CD) {
      if (!Line.__super__.equals.call(this, CD)) {
        return false;
      }
      return this.a === CD.a && this.b === CD.b && this.c === CD.c;
    };

    Line.prototype.name = function() {
      return 'Line';
    };

    return Line;

  })(UnitaryObject);

  Segment = (function(superClass) {
    extend(Segment, superClass);

    function Segment(A, B) {
      if (!(this instanceof Segment)) {
        throw new Error('Constructor cannot be called as a function.');
      }
      if (A.x > B.x) {
        this.points = [B, A];
      } else {
        this.points = [A, B];
      }
      this.length = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2));
    }

    Segment.prototype.move = function(dx, dy) {
      return new Segment(this.points[0].move(x + dx, y + dy), this.points[1].move(x + dx, y + dy));
    };

    Segment.prototype.moveX = function(dx) {
      return new Segment(this.points[0].move(x + dx, y), this.points[1].move(x + dx, y));
    };

    Segment.prototype.moveY = function(dy) {
      return new Segment(this.points[0].move(x, y + dy), this.points[1].move(x, y + dy));
    };

    Segment.prototype.has = function(P) {
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

    Segment.prototype.intersects = function(CD) {
      var intersection, ref, ref1;
      intersection = this.toLine().getIntersection(CD.toLine());
      if (intersection === false) {
        return false;
      }
      if ((this.points[0].x < (ref = intersection.x) && ref < this.points[1].x) && (this.points[0].y < (ref1 = intersection.y) && ref1 < this.points[1].y)) {
        return true;
      }
      return false;
    };

    Segment.prototype.toLine = function() {
      return new Line(this.points[0], this.points[1]);
    };

    Segment.prototype.equals = function(CD) {
      if (!Segment.__super__.equals.call(this, CD)) {
        return false;
      }
      return this.points[0].equals(CD.points[0]) && this.points[1].equals(CD.points[1]);
    };

    Segment.prototype.name = function() {
      return 'Segment';
    };

    return Segment;

  })(UnitaryObject);

  Circle = (function(superClass) {
    extend(Circle, superClass);

    function Circle(O, radius) {
      if (!(this instanceof Circle)) {
        throw new Error('Constructor cannot be called as a function.');
      }
      this.Origin = O;
      this.r = radius;
    }

    Circle.prototype.moveTo = function(x, y) {
      return new Circle(this.Origin.moveTo(x, y), this.r);
    };

    Circle.prototype.move = function(dx, dy) {
      return new Circle(this.Origin.move(dx, dy), this.r);
    };

    Circle.prototype.moveX = function(dx) {
      return new Circle(this.Origin.moveX(dx), this.r);
    };

    Circle.prototype.moveY = function(dy) {
      return new Circle(this.Origin.moveY(dy), this.r);
    };

    Circle.prototype.equals = function(C) {
      if (!Circle.__super__.equals.call(this, C)) {
        return false;
      }
      return this.Origin.equals(C.Origin) && this.r === C.r;
    };

    Circle.prototype.name = function() {
      return 'Circle';
    };

    return Circle;

  })(UnitaryObject);

  Polygon = (function(superClass) {
    extend(Polygon, superClass);

    function Polygon() {
      var points;
      points = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (!(this instanceof Polygon)) {
        throw new Error('Constructor cannot be called as a function.');
      }
      this.points = points;
    }

    Polygon.prototype.equals = function() {
      return false;
    };

    Polygon.prototype.name = function() {
      return 'Polygon';
    };

    return Polygon;

  })(UnitaryObject);

  Quadrilateral = (function(superClass) {
    extend(Quadrilateral, superClass);

    function Quadrilateral(A, B, C, D) {
      if (!(this instanceof Quadrilateral)) {
        throw new Error('Constructor cannot be called as a function.');
      }
      if (Segment(A, B).intersects(Segment(C, D))) {
        throw new Error('ABCD is not a quadrilateral.');
      }
      if (A.equals(B) || A.equals(C) || A.equals(D) || B.equals(C) || B.equals(D) || C.equals(D)) {
        throw new Error('ABCD is not a quadrilateral.');
      }
      Quadrilateral.__super__.constructor.call(this, A, B, C, D);
    }

    Quadrilateral.prototype.getArea = function() {
      var A, B, C, D, S1, S2, ref;
      ref = this.points, A = ref[0], B = ref[1], C = ref[2], D = ref[3];
      S1 = new Triangle(A, B, C).getArea();
      S2 = new Triangle(A, C, D).getArea();
      return S1 + S2;
    };

    Quadrilateral.prototype.name = function() {
      return 'Quadrilateral';
    };

    return Quadrilateral;

  })(Polygon);

  Triangle = (function(superClass) {
    extend(Triangle, superClass);

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
      Triangle.__super__.constructor.call(this, A, B, C);
    }

    Triangle.prototype.getCircumcircle = function() {
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
      vO = new Vector(0, 0).add(vA.multiple(a * (b + c - a))).add(vB.multiple(b * (c + a - b))).add(vC.multiple(c * (a + b - c))).multiple(1 / (16 * (Math.pow(S, 2))));
      O = new Point.fromVector(vO);
      cosA = vB.minus(vA).product(vC.minus(vA)) / (AB.length * CA.length);
      sinA = Math.sqrt(1 - Math.pow(cosA, 2));
      R = BC.length / sinA / 2;
      return new Circle(O, R);
    };

    Triangle.prototype.getIncircle = function() {
      var O, a, b, c, r, vA, vB, vC, vO;
      vA = new Vector(this.points[0].x, this.points[0].y);
      vB = new Vector(this.points[1].x, this.points[1].y);
      vC = new Vector(this.points[2].x, this.points[2].y);
      a = vC.minus(vB).abs();
      b = vC.minus(vA).abs();
      c = vB.minus(vA).abs();
      vO = new Vector(0, 0).add(vA.multiple(a / (a + b + c))).add(vB.multiple(b / (a + b + c))).add(vC.multiple(c / (a + b + c)));
      O = new Point.fromVector(vO);
      r = 2 * this.getArea() / (a + b + c);
      return new Circle(O, r);
    };

    Triangle.prototype.getArea = function() {
      var A, AB, AC, B, C, S, cosA, sinA, vAB, vAC;
      A = this.points[0];
      B = this.points[1];
      C = this.points[2];
      AB = new Segment(A, B);
      AC = new Segment(A, C);
      vAB = new Vector.from(A, B);
      vAC = new Vector.from(A, C);
      cosA = vAB.product(vAC) / (AB.length * AC.length);
      sinA = Math.sqrt(1 - Math.pow(cosA, 2));
      S = AB.length * AC.length * sinA / 2;
      return S;
    };

    Triangle.prototype.name = function() {
      return 'Triangle';
    };

    return Triangle;

  })(Polygon);

  Rect = (function(superClass) {
    extend(Rect, superClass);

    function Rect(A, B) {
      if (!(this instanceof Rect)) {
        throw new Error('Constructor cannot be called as a function.');
      }
      Rect.__super__.constructor.call(this, A, B);
    }

    Rect.prototype.name = function() {
      return 'Rect';
    };

    return Rect;

  })(Polygon);

  Text_ = (function(superClass) {
    extend(Text_, superClass);

    function Text_(str, P, align, maxWidth) {
      if (align == null) {
        align = 'left';
      }
      if (maxWidth == null) {
        maxWidth = null;
      }
      if (!(this instanceof Text_)) {
        throw new Error('Constructor cannot be called as a function.');
      }
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

    Text_.prototype.strokeOutline = function() {
      return this.strokesOutline = true;
    };

    Text_.prototype.setOutlineColor = function(color) {
      return this.outlineColor = color;
    };

    Text_.prototype.setFillColor = function(color) {
      return this.fillColor = color;
    };

    Text_.prototype.setBaseline = function(base) {
      return this.baseline = base;
    };

    Text_.prototype.setFont = function(font) {
      return this.font = font;
    };

    Text_.prototype.name = function() {
      return 'Text';
    };

    return Text_;

  })(UnitaryObject);

  Image_ = (function(superClass) {
    extend(Image_, superClass);

    function Image_(src, startPoint) {
      if (!(this instanceof Image_)) {
        throw new Error('Constructor cannot be called as a function.');
      }
      this.src = src;
      this.dx = startPoint.x;
      this.dy = startPoint.y;
      this.dw = null;
      this.dh = null;
      this.sw = null;
      this.sh = null;
      this.sx = null;
      this.sy = null;
    }

    Image_.prototype.trim = function(startPoint, sw, sh, dw, dh) {
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
      return this.dh = dh;
    };

    Image_.prototype.resize = function(dw, dh) {
      this.dw = dw;
      return this.dh = dh;
    };

    Image_.prototype.equals = function(B) {
      if (!Image_.__super__.equals.call(this, B)) {
        return false;
      }
      return this.src === B.src && this.dx === B.dx && this.dy === B.dy && this.dw === B.dw && this.dh === B.dh && this.sw === B.sw && this.sh === B.sh && this.sx === B.sx && this.sy === B.sy;
    };

    Image_.prototype.name = function() {
      return 'Image';
    };

    return Image_;

  })(UnitaryObject);

  WORLD = {
    ORIGIN: new Point(0, 0)
  };

  _global = (this || 0).self || global;

  Module = {
    UnitaryObject: UnitaryObject,
    Point: Point,
    Vector: Vector,
    Line: Line,
    Segment: Segment,
    Circle: Circle,
    Polygon: Polygon,
    Quadrilateral: Quadrilateral,
    Triangle: Triangle,
    Rect: Rect,
    Text: Text_,
    Image: Image_,
    distance: distance,
    WORLD: WORLD
  };

  if ('process' in _global) {
    module.exports = Module;
  }

  _global['Unitary'] = Module;

}).call(this);
