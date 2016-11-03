(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Unitary = factory());
}(this, (function () { 'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

function gcd(m, n) {
    if (m < n) return gcd(n, m);
    if (m < 0) return gcd(-m, n);
    if (n < 0) return gcd(m, -n);
    return n === 0 ? m : gcd(n, m % n);
}
function distance(A, B) {
    var res = void 0;
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

var UnitaryObject = function () {
    function UnitaryObject() {
        classCallCheck(this, UnitaryObject);

        this.style = {
            fillColor: null,
            strokeColor: null
        };
    }

    createClass(UnitaryObject, [{
        key: 'equals',
        value: function equals(B) {
            return this.name() === B.name();
        }
    }, {
        key: 'setFillColor',
        value: function setFillColor(color) {
            this.style.fillColor = color;
            return this;
        }
    }, {
        key: 'setStrokeColor',
        value: function setStrokeColor(color) {
            this.style.strokeColor = color;
            return this;
        }
    }, {
        key: 'setStyle',
        value: function setStyle(style) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(style)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    this.style[key] = style[key];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return this;
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            return this;
        }
    }, {
        key: 'moveX',
        value: function moveX(dx) {
            return this.move(dx, 0);
        }
    }, {
        key: 'moveY',
        value: function moveY(dy) {
            return this.move(0, dy);
        }
    }, {
        key: 'has',
        value: function has(P) {
            return false;
        }
    }, {
        key: 'name',
        value: function name() {
            return 'UnitaryObject';
        }
    }]);
    return UnitaryObject;
}();

var Point = function (_UnitaryObject) {
    inherits(Point, _UnitaryObject);

    function Point(x, y) {
        classCallCheck(this, Point);

        var _this = possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this));

        _this.x = x;
        _this.y = y;
        return _this;
    }

    createClass(Point, [{
        key: 'moveTo',
        value: function moveTo(x, y) {
            return new Point(x, y).setStyle(this.style);
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            return new Point(this.x + dx, this.y + dy).setStyle(this.style);
        }
    }, {
        key: 'rotate',
        value: function rotate(rad, center) {
            var x = Math.cos(rad) * (this.x - center.x) - Math.sin(rad) * (this.y - center.y) + center.x;
            var y = Math.sin(rad) * (this.y - center.y) + Math.cos(rad) * (this.y - center.y) + center.y;
            return new Point(x, y);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return '(' + this.x + ', ' + this.y + ')';
        }
    }, {
        key: 'inspect',
        value: function inspect() {
            return '(' + this.x + ', ' + this.y + ')';
        }
    }, {
        key: 'equals',
        value: function equals(B) {
            if (!get(Point.prototype.__proto__ || Object.getPrototypeOf(Point.prototype), 'equals', this).call(this, B)) {
                return false;
            }
            return this.x === B.x && this.y === B.y;
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Point';
        }
    }]);
    return Point;
}(UnitaryObject);

var BaseVector = function (_UnitaryObject2) {
    inherits(BaseVector, _UnitaryObject2);

    function BaseVector() {
        classCallCheck(this, BaseVector);

        var _this2 = possibleConstructorReturn(this, (BaseVector.__proto__ || Object.getPrototypeOf(BaseVector)).call(this));

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (args.length === 1 && Object.prototype.toString.call(args[0]) === '[object Array]') {
            _this2.component = new Array(args[0].length);
            for (var i = 0, _i = args[0].length; i < _i; i = 0 | i + 1) {
                _this2.component[i] = args[0][i];
            }
        } else {
            _this2.component = new Array(args.length);
            for (var _i2 = 0, _i3 = args.length; _i2 < _i3; _i2 = 0 | _i2 + 1) {
                _this2.component[_i2] = args[_i2];
            }
        }
        return _this2;
    }

    createClass(BaseVector, [{
        key: 'add',
        value: function add(CD) {
            if (this.component.length !== CD.component.length) {
                throw new Error('dimention of each vector are different.');
            }
            var component = new Array(this.component.length);
            for (var i = 0, _i = this.component.length; i < _i; i = 0 | i + 1) {
                component[i] = this.component[i] + CD.component[i];
            }
            return new BaseVector(component);
        }
    }, {
        key: 'substract',
        value: function substract(CD) {
            return this.add(CD.multiple(-1));
        }
    }, {
        key: 'product',
        value: function product(CD) {
            if (this.component.length !== CD.component.length) {
                throw new Error('dimention of each vector are different.');
            }
            var product = 0;
            for (var i = 0, _i = this.component.length; i < _i; i = 0 | i + 1) {
                product += this.component[i] * CD.component[i];
            }
            return product;
        }
    }, {
        key: 'multiple',
        value: function multiple(k) {
            var component = new Array(this.component.length);
            for (var i = 0, _i = this.component.length; i < _i; i = 0 | i + 1) {
                component[i] = k * this.component[i];
            }
            return new BaseVector(component);
        }
    }, {
        key: 'abs',
        value: function abs() {
            var res = 0;
            for (var i = 0, _i = this.component.length; i < _i; i = 0 | i + 1) {
                res += this.component[i] * this.component[i];
            }
            return Math.sqrt(res);
        }
    }, {
        key: 'equals',
        value: function equals(B) {
            if (this.component.length !== B.component.length) {
                return false;
            }
            for (var i = 0, _i = this.component.length; i < _i; i = 0 | i + 1) {
                if (this.component[i] !== B.component[i]) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'move',
        value: function move() {
            for (var _len2 = arguments.length, component = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                component[_key2] = arguments[_key2];
            }

            return this.add(new BaseVector(component));
        }
    }, {
        key: 'name',
        value: function name() {
            return 'BaseVector';
        }
    }]);
    return BaseVector;
}(UnitaryObject);

var Vector = function (_BaseVector) {
    inherits(Vector, _BaseVector);

    function Vector() {
        classCallCheck(this, Vector);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        if (args.length === 2) {
            var _this3 = possibleConstructorReturn(this, (Vector.__proto__ || Object.getPrototypeOf(Vector)).call(this, args[0], args[1]));

            _this3.x = args[0];
            _this3.y = args[1];
        } else if (args.length === 1) {
            var _this3 = possibleConstructorReturn(this, (Vector.__proto__ || Object.getPrototypeOf(Vector)).call(this, args[0].x, args[0].y));

            _this3.x = args[0].x;
            _this3.y = args[0].y;
        }
        return possibleConstructorReturn(_this3);
    }

    createClass(Vector, [{
        key: 'add',
        value: function add(CD) {
            var newVector = get(Vector.prototype.__proto__ || Object.getPrototypeOf(Vector.prototype), 'add', this).call(this, CD);
            return new Vector(newVector.component[0], newVector.component[1]);
        }
    }, {
        key: 'substract',
        value: function substract(CD) {
            var newVector = get(Vector.prototype.__proto__ || Object.getPrototypeOf(Vector.prototype), 'substract', this).call(this, CD);
            return new Vector(newVector.component[0], newVector.component[1]);
        }
    }, {
        key: 'multiple',
        value: function multiple(k) {
            var newVector = get(Vector.prototype.__proto__ || Object.getPrototypeOf(Vector.prototype), 'multiple', this).call(this, k);
            return new Vector(newVector.component[0], newVector.component[1]);
        }
    }, {
        key: 'equals',
        value: function equals(B) {
            if (!get(Vector.prototype.__proto__ || Object.getPrototypeOf(Vector.prototype), 'equals', this).call(this, B)) {
                return false;
            }
            return this.x === B.x && this.y === B.y;
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            return new Vector(this.x + dx, this.y + dy);
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Vector';
        }
    }]);
    return Vector;
}(BaseVector);

var Vector3D = function (_BaseVector2) {
    inherits(Vector3D, _BaseVector2);

    function Vector3D() {
        classCallCheck(this, Vector3D);

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        if (args.length === 3) {
            var _this4 = possibleConstructorReturn(this, (Vector3D.__proto__ || Object.getPrototypeOf(Vector3D)).call(this, args[0], args[1], args[2]));

            _this4.x = args[0];
            _this4.y = args[1];
            _this4.z = args[2];
        } else if (args.length === 1) {
            var _this4 = possibleConstructorReturn(this, (Vector3D.__proto__ || Object.getPrototypeOf(Vector3D)).call(this, args[0].x, args[0].y, args[0].z));

            _this4.x = args[0].x;
            _this4.y = args[0].y;
            _this4.z = args[0].z;
        }
        return possibleConstructorReturn(_this4);
    }

    createClass(Vector3D, [{
        key: 'add',
        value: function add(CD) {
            var newVector = get(Vector3D.prototype.__proto__ || Object.getPrototypeOf(Vector3D.prototype), 'add', this).call(this, CD);
            return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
        }
    }, {
        key: 'substract',
        value: function substract(CD) {
            var newVector = get(Vector3D.prototype.__proto__ || Object.getPrototypeOf(Vector3D.prototype), 'substract', this).call(this, CD);
            return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
        }
    }, {
        key: 'multiple',
        value: function multiple(k) {
            var newVector = get(Vector3D.prototype.__proto__ || Object.getPrototypeOf(Vector3D.prototype), 'multiple', this).call(this, k);
            return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
        }
    }, {
        key: 'move',
        value: function move(dx, dy, dz) {
            return new Vector3D(this.x + dx, this.y + dy, this.z + dz);
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Vector3D';
        }
    }]);
    return Vector3D;
}(BaseVector);

var Line = function (_UnitaryObject3) {
    inherits(Line, _UnitaryObject3);

    function Line(A, B) {
        classCallCheck(this, Line);

        if (A.equals(B)) {
            throw new Error('A equals B. So AB couldn\'t construct line.');
        }

        var _this5 = possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this));

        _this5.points = [A, B];
        _this5.a = B.y - A.y;
        _this5.b = A.x - B.x;
        _this5.c = A.x * (A.y - B.y) - A.y * (A.x - B.x);
        var g = gcd(gcd(_this5.a, _this5.b), _this5.c);
        _this5.a /= g;
        _this5.b /= g;
        _this5.c /= g;
        if (_this5.a === 0) {
            _this5.c /= _this5.b;
            _this5.b = 1;
        }
        if (_this5.b === 0) {
            _this5.c /= _this5.a;
            _this5.a = 1;
        }
        return _this5;
    }

    createClass(Line, [{
        key: 'move',
        value: function move(dx, dy) {
            return new Line(this.points[0].move(dx, dy), this.points[1].move(dx, dy)).setStyle(this.style);
        }
    }, {
        key: 'getEquation',
        value: function getEquation() {
            var res = void 0;
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
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.getEquation();
        }
    }, {
        key: 'inspect',
        value: function inspect() {
            return this.getEquation();
        }
    }, {
        key: 'getIntersection',
        value: function getIntersection(CD) {
            if (this.a === CD.a && this.b === CD.b) {
                return false;
            }
            var y = (CD.a * this.c - this.a * CD.c) / (this.a * CD.b - CD.a * this.b);
            var x = -1 * (this.b * y + this.c) / this.a;
            return new Point(x, y);
        }
    }, {
        key: 'equals',
        value: function equals(CD) {
            if (!get(Line.prototype.__proto__ || Object.getPrototypeOf(Line.prototype), 'equals', this).call(this, CD)) {
                return false;
            }
            return this.a === CD.a && this.b === CD.b && this.c === CD.c;
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Line';
        }
    }]);
    return Line;
}(UnitaryObject);

var Segment = function (_UnitaryObject4) {
    inherits(Segment, _UnitaryObject4);

    function Segment(A, B) {
        classCallCheck(this, Segment);

        var _this6 = possibleConstructorReturn(this, (Segment.__proto__ || Object.getPrototypeOf(Segment)).call(this));

        if (A.x > B.x) {
            _this6.points = [B, A];
        } else {
            _this6.points = [A, B];
        }
        _this6.length = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2));
        return _this6;
    }

    createClass(Segment, [{
        key: 'move',
        value: function move(dx, dy) {
            return new Segment(this.points[0].move(dx, dy), this.points[1].move(dx, dy)).setStyle(this.style);
        }
    }, {
        key: 'has',
        value: function has(P) {
            var A = this.points[0];
            var B = this.points[1];
            if (A.x <= P.x && P.x <= B.x) {
                if (A.y <= B.y && A.y <= P.y && P.y <= B.y || A.y >= B.y && A.y >= P.y && P.y >= B.y) {
                    if ((A.y - B.y) / (A.x - B.x) * P.x === P.y) {
                        return true;
                    }
                }
            }
            return false;
        }
    }, {
        key: 'intersects',
        value: function intersects(CD) {
            var intersection = void 0;
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
    }, {
        key: 'toLine',
        value: function toLine() {
            return new Line(this.points[0], this.points[1]);
        }
    }, {
        key: 'equals',
        value: function equals(CD) {
            if (!get(Segment.prototype.__proto__ || Object.getPrototypeOf(Segment.prototype), 'equals', this).call(this, CD)) {
                return false;
            }
            return this.points[0].equals(CD.points[0]) && this.points[1].equals(CD.points[1]);
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Segment';
        }
    }]);
    return Segment;
}(UnitaryObject);

var Circle = function (_UnitaryObject5) {
    inherits(Circle, _UnitaryObject5);

    function Circle(center, radius) {
        classCallCheck(this, Circle);

        var _this7 = possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this));

        _this7.center = center;
        _this7.Origin = center;
        _this7.r = radius;
        _this7.radius = radius;
        return _this7;
    }

    createClass(Circle, [{
        key: 'moveTo',
        value: function moveTo(x, y) {
            return new Circle(this.center.moveTo(x, y), this.r).setStyle(this.style);
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            return new Circle(this.center.move(dx, dy), this.r).setStyle(this.style);
        }
    }, {
        key: 'getEquation',
        value: function getEquation() {
            var res = '(x';
            if (this.center.x > 0) res += '-' + this.center.x;else if (this.center.x < 0) res += '+' + -this.center.x; // + abs(this.center.x)
            res += ')^2+(y';
            if (this.center.y > 0) res += '-' + this.center.y;else if (this.center.y < 0) res += '+' + -this.center.y; // + abs(this.center.x)
            res += ')^2=' + this.r + '^2';
            return res;
        }
    }, {
        key: 'equals',
        value: function equals(C) {
            if (!get(Circle.prototype.__proto__ || Object.getPrototypeOf(Circle.prototype), 'equals', this).call(this, C)) {
                return false;
            }
            return this.center.equals(C.center) && this.r === C.r;
        }
    }, {
        key: 'has',
        value: function has(P) {
            return new Vector(P).substract(new Vector(this.center)).abs() <= this.r;
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Circle';
        }
    }]);
    return Circle;
}(UnitaryObject);

var CircularSector = function (_UnitaryObject6) {
    inherits(CircularSector, _UnitaryObject6);

    function CircularSector(center, radius, endAngle) {
        var startAngle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        classCallCheck(this, CircularSector);

        var _this8 = possibleConstructorReturn(this, (CircularSector.__proto__ || Object.getPrototypeOf(CircularSector)).call(this));

        _this8.center = center;
        _this8.Origin = center;
        _this8.radius = radius;
        _this8.r = radius;
        _this8.endAngle = endAngle;
        _this8.startAngle = startAngle;
        return _this8;
    }

    createClass(CircularSector, [{
        key: 'moveTo',
        value: function moveTo(x, y) {
            return new CircularSector(this.center.moveTo(x, y), this.r, this.endAngle, this.startAngle).setStyle(this.style);
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            return new CircularSector(this.center.move(dx, dy), this.r, this.endAngle, this.startAngle).setStyle(this.style);
        }
    }, {
        key: 'rotate',
        value: function rotate(rad) {
            return new CircularSector(this.center, this.r, this.endAngle + rad, this.startAngle + rad).setStyle(this.style);
        }
    }, {
        key: 'equals',
        value: function equals(C) {
            var angleCompare = function angleCompare(A, B) {
                return (A - B) % (2 * Math.PI) === 0;
            };
            if (!get(CircularSector.prototype.__proto__ || Object.getPrototypeOf(CircularSector.prototype), 'equals', this).call(this, C)) {
                return false;
            }
            return this.center.equals(C.center) && this.r === C.r && angleCompare(this.startAngle, C.startAngle) && angleCompare(this.endAngle, C.endAngle);
        }
    }, {
        key: 'has',
        value: function has(P) {
            var theta = Math.atan2(P.y, P.x);
            return new Vector(P).substract(new Vector(this.center)).abs() <= this.r && this.startAngle <= theta && theta <= this.endAngle;
        }
    }, {
        key: 'name',
        value: function name() {
            return 'CircularSector';
        }
    }]);
    return CircularSector;
}(UnitaryObject);

var Polygon = function (_UnitaryObject7) {
    inherits(Polygon, _UnitaryObject7);

    function Polygon() {
        classCallCheck(this, Polygon);

        var _this9 = possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this));

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        var points = 1 <= args.length ? Array.prototype.slice.call(args, 0) : [];
        if (Object.prototype.toString.call(points[0]) === '[object Array]') {
            _this9.points = points[0];
        } else {
            _this9.points = points;
        }
        return _this9;
    }

    createClass(Polygon, [{
        key: 'equals',
        value: function equals() {
            return false;
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            var points = [];
            for (var i = 0, len = this.points.length; i < len; i++) {
                points[i] = this.points[i].move(dx, dy);
            }
            return new Polygon(points).setStyle(this.style);
        }
    }, {
        key: 'rotate',
        value: function rotate(rad, center) {
            var points = [];
            for (var i = 0, len = this.points.length; i < len; i++) {
                points[i] = this.points[i].rotate(rad, center);
            }
            return new Polygon(points).setStyle(this.style);
        }
    }, {
        key: 'has',
        value: function has(P) {
            var a = void 0,
                b = void 0,
                cos = void 0,
                v = void 0;
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
    }, {
        key: 'name',
        value: function name() {
            return 'Polygon';
        }
    }]);
    return Polygon;
}(UnitaryObject);

var Quadrilateral = function (_Polygon) {
    inherits(Quadrilateral, _Polygon);

    function Quadrilateral(A, B, C, D) {
        classCallCheck(this, Quadrilateral);

        if (new Segment(A, D).intersects(new Segment(B, C))) {
            throw new Error('ABCD is not a quadrilateral.');
        }
        if (A.equals(B) || A.equals(C) || A.equals(D) || B.equals(C) || B.equals(D) || C.equals(D)) {
            throw new Error('ABCD is not a quadrilateral.');
        }
        return possibleConstructorReturn(this, (Quadrilateral.__proto__ || Object.getPrototypeOf(Quadrilateral)).call(this, A, B, C, D));
    }

    createClass(Quadrilateral, [{
        key: 'getArea',
        value: function getArea() {
            var A = this.points[0],
                B = this.points[1],
                C = this.points[2],
                D = this.points[3];
            var S1 = new Triangle(A, B, C).getArea();
            var S2 = new Triangle(A, C, D).getArea();
            return S1 + S2;
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            var newObject = get(Quadrilateral.prototype.__proto__ || Object.getPrototypeOf(Quadrilateral.prototype), 'move', this).call(this, dx, dy);
            var A = newObject.points[0],
                B = newObject.points[1],
                C = newObject.points[2],
                D = newObject.points[3];
            return new Quadrilateral(A, B, C, D);
        }
    }, {
        key: 'rotate',
        value: function rotate(rad, center) {
            var newObject = get(Quadrilateral.prototype.__proto__ || Object.getPrototypeOf(Quadrilateral.prototype), 'rotate', this).call(this, rad, center);
            var A = newObject.points[0],
                B = newObject.points[1],
                C = newObject.points[2],
                D = newObject.points[3];
            return new Quadrilateral(A, B, C, D);
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Quadrilateral';
        }
    }]);
    return Quadrilateral;
}(Polygon);

var Triangle = function (_Polygon2) {
    inherits(Triangle, _Polygon2);

    function Triangle(A, B, C) {
        classCallCheck(this, Triangle);

        if (A == null || B == null || C == null) {
            throw new Error('Triangle must have three vertices.');
        }
        if (A.equals(B) || B.equals(C) || A.equals(C)) {
            throw new Error('Triangle must have three vertices.');
        }
        return possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this, A, B, C));
    }

    createClass(Triangle, [{
        key: 'getCircumcircle',
        value: function getCircumcircle() {
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
            var vO = new Vector(0, 0).add(vA.multiple(a * (b + c - a))).add(vB.multiple(b * (c + a - b))).add(vC.multiple(c * (a + b - c))).multiple(1 / (16 * Math.pow(S, 2)));
            var O = new Point(vO.x, vO.y);
            var cosA = vB.substract(vA).product(vC.substract(vA)) / (AB.length * CA.length),
                sinA = Math.sqrt(1 - Math.pow(cosA, 2));
            var R = BC.length / sinA / 2;
            return new Circle(O, R);
        }
    }, {
        key: 'getIncircle',
        value: function getIncircle() {
            var vA = new Vector(this.points[0].x, this.points[0].y),
                vB = new Vector(this.points[1].x, this.points[1].y),
                vC = new Vector(this.points[2].x, this.points[2].y);
            var a = vC.substract(vB).abs(),
                b = vC.substract(vA).abs(),
                c = vB.substract(vA).abs();
            var vO = new Vector(0, 0).add(vA.multiple(a / (a + b + c))).add(vB.multiple(b / (a + b + c))).add(vC.multiple(c / (a + b + c)));
            var O = new Point(vO.x, vO.y);
            var r = 2 * this.getArea() / (a + b + c);
            return new Circle(O, r);
        }
    }, {
        key: 'getCenter',
        value: function getCenter() {
            var A = this.points[0],
                B = this.points[1],
                C = this.points[2];
            return new Point((A.x + B.x + C.x) / 3, (A.y + B.y + C.y) / 3);
        }
    }, {
        key: 'getArea',
        value: function getArea() {
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
    }, {
        key: 'move',
        value: function move(dx, dy) {
            var newObject = get(Triangle.prototype.__proto__ || Object.getPrototypeOf(Triangle.prototype), 'move', this).call(this, dx, dy);
            var A = newObject.points[0],
                B = newObject.points[1],
                C = newObject.points[2];
            return new Triangle(A, B, C);
        }
    }, {
        key: 'rotate',
        value: function rotate(rad, center) {
            if (typeof center === 'undefined') {
                center = this.getCenter();
            }
            var newObject = get(Triangle.prototype.__proto__ || Object.getPrototypeOf(Triangle.prototype), 'rotate', this).call(this, rad, center);
            var A = newObject.points[0],
                B = newObject.points[1],
                C = newObject.points[2];
            return new Triangle(A, B, C);
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Triangle';
        }
    }]);
    return Triangle;
}(Polygon);

var Rect = function (_Polygon3) {
    inherits(Rect, _Polygon3);

    function Rect(A, B) {
        classCallCheck(this, Rect);
        return possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this, A, B));
    }

    createClass(Rect, [{
        key: 'has',
        value: function has(P) {
            var A = this.points[0],
                B = this.points[1];
            return (A.x - P.x) * (B.x - P.x) <= 0 && (A.y - P.y) * (B.y - P.y) <= 0;
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            var newObject = get(Rect.prototype.__proto__ || Object.getPrototypeOf(Rect.prototype), 'move', this).call(this, dx, dy);
            var A = newObject.points[0],
                B = newObject.points[1];
            return new Rect(A, B);
        }
    }, {
        key: 'rotate',
        value: function rotate(rad, center) {
            var newObject = get(Rect.prototype.__proto__ || Object.getPrototypeOf(Rect.prototype), 'rotate', this).call(this, rad, center);
            var A = newObject.points[0],
                B = newObject.points[1];
            return new Rect(A, B);
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Rect';
        }
    }]);
    return Rect;
}(Polygon);

var Text = function (_UnitaryObject8) {
    inherits(Text, _UnitaryObject8);

    function Text(str, P) {
        var align = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';
        var maxWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        classCallCheck(this, Text);

        var _this13 = possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

        _this13.P = P;
        _this13.string = str;
        _this13.text = str;
        _this13.strokesOutline = false;
        _this13.style.align = align;
        _this13.style.maxWidth = maxWidth;
        _this13.style.fillColor = '#000';
        _this13.style.outlineColor = '#000';
        _this13.style.baseline = 'alphabetic';
        _this13.style.font = null;
        return _this13;
    }

    createClass(Text, [{
        key: 'strokeOutline',
        value: function strokeOutline() {
            this.strokesOutline = true;
            return this;
        }
    }, {
        key: 'setAlign',
        value: function setAlign(align) {
            this.style.align = align;
            return this;
        }
    }, {
        key: 'setOutlineColor',
        value: function setOutlineColor(color) {
            this.style.outlineColor = color;
            return this;
        }
    }, {
        key: 'setBaseline',
        value: function setBaseline(base) {
            this.style.baseline = base;
            return this;
        }
    }, {
        key: 'setFont',
        value: function setFont(font) {
            this.style.font = font;
            return this;
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            var newText = new Text(this.string, this.P.move(dx, dy), this.style.align, this.style.maxWidth).setStyle(this.style);
            if (this.strokesOutline) {
                newText.strokeOutline();
            }
            return newText;
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Text';
        }
    }]);
    return Text;
}(UnitaryObject);

var Image = function (_UnitaryObject9) {
    inherits(Image, _UnitaryObject9);

    function Image(src, startPoint) {
        classCallCheck(this, Image);

        var _this14 = possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this));

        _this14.src = src;
        _this14.startPoint = startPoint;
        _this14.dx = startPoint.x;
        _this14.dy = startPoint.y;
        _this14.dw = null;
        _this14.dh = null;
        _this14.sw = null;
        _this14.sh = null;
        _this14.sx = null;
        _this14.sy = null;
        return _this14;
    }

    createClass(Image, [{
        key: 'trim',
        value: function trim(startPoint, sw, sh) {
            var dw = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            var dh = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

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
        }
    }, {
        key: 'resize',
        value: function resize(dw, dh) {
            var newImage = new Image(this.src, this.startPoint);
            newImage.dw = dw;
            newImage.dh = dh;
            newImage.sw = this.sw;
            newImage.sh = this.sh;
            newImage.sx = this.sx;
            newImage.sy = this.sy;
            return newImage;
        }
    }, {
        key: 'equals',
        value: function equals(B) {
            if (!get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), 'equals', this).call(this, B)) {
                return false;
            }
            return this.src === B.src && this.dx === B.dx && this.dy === B.dy && this.dw === B.dw && this.dh === B.dh && this.sw === B.sw && this.sh === B.sh && this.sx === B.sx && this.sy === B.sy;
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            var newImage = new Image(this.src, this.startPoint.move(dx, dy));
            if (this.sx !== null) {
                newImage = newImage.trim(new Point(this.sx, this.sy), this.sw, this.sh, this.dw, this.dh);
            }
            return newImage;
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Image';
        }
    }]);
    return Image;
}(UnitaryObject);

var Group = function (_UnitaryObject10) {
    inherits(Group, _UnitaryObject10);

    function Group() {
        classCallCheck(this, Group);

        var _this15 = possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this));

        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
        }

        if (Object.prototype.toString.call(args[0]) === '[object Array]') _this15.group = args[0];else _this15.group = args;
        return _this15;
    }

    createClass(Group, [{
        key: 'has',
        value: function has(P) {
            for (var i = 0, _i = this.group.length; i < _i; i++) {
                if (this.group[i].has && this.group[i].has(P)) return true;
            }
            return false;
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            var newGroup = this.group.concat();
            for (var i = 0, _i = newGroup.length; i < _i; i++) {
                if (newGroup[i].move) newGroup[i] = newGroup[i].move(dx, dy);
            }
            return new Group(newGroup);
        }
    }, {
        key: 'name',
        value: function name() {
            return 'Group';
        }
    }]);
    return Group;
}(UnitaryObject);

var Graph = function (_UnitaryObject11) {
    inherits(Graph, _UnitaryObject11);

    function Graph(f, scale) {
        classCallCheck(this, Graph);

        var _this16 = possibleConstructorReturn(this, (Graph.__proto__ || Object.getPrototypeOf(Graph)).call(this));

        _this16.f = f;
        _this16.scale = scale;
        _this16.start = null;
        _this16.end = null;
        return _this16;
    }

    createClass(Graph, [{
        key: 'setRange',
        value: function setRange(start, end) {
            this.start = start;
            this.end = end;
            return this;
        }
    }, {
        key: 'equals',
        value: function equals() {
            return false;
        }
    }, {
        key: 'moveX',
        value: function moveX() {}
    }, {
        key: 'moveY',
        value: function moveY() {}
    }, {
        key: 'name',
        value: function name() {
            return 'Graph';
        }
    }]);
    return Graph;
}(UnitaryObject);

var BezierCurve = function (_UnitaryObject12) {
    inherits(BezierCurve, _UnitaryObject12);

    function BezierCurve() {
        classCallCheck(this, BezierCurve);

        var _this17 = possibleConstructorReturn(this, (BezierCurve.__proto__ || Object.getPrototypeOf(BezierCurve)).call(this));

        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
        }

        if (Object.prototype.toString.call(args[0]) === '[object Array]') _this17.controlPoints = args[0];else _this17.controlPoints = args;
        _this17.step = 0.05;
        return _this17;
    }

    createClass(BezierCurve, [{
        key: 'setStep',
        value: function setStep(step) {
            this.step = step;
            return this;
        }
    }, {
        key: 'move',
        value: function move(dx, dy) {
            var newBezier = this.controlPoints.concat();
            for (var i = 0, _i = newBezier.length; i < _i; i++) {
                newBezier[i] = newBezier[i].move(dx, dy);
            }
            return new BezierCurve(newBezier).setStep(this.step);
        }
    }, {
        key: 'name',
        value: function name() {
            return 'BezierCurve';
        }
    }]);
    return BezierCurve;
}(UnitaryObject);

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
