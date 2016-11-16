(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Canvas = factory());
}(this, (function () { 'use strict';

var BezierCurvePainter = function (obj) {
    var _this = this;

    this.canvas.beginPath();
    var controlPoints = obj.controlPoints;
    var P = controlPoints;
    var nextP = [];
    var points = obj.points || [controlPoints[0]];
    var pointsLength = 1;
    var step = obj.step;

    if (controlPoints.length <= 1) {
        // do nothing
    } else if (2 <= controlPoints.length && controlPoints.length <= 4) {
        var cp = controlPoints.map(function (p) {
            return { x: _this.X(p.x), y: _this.Y(p.y) };
        });
        this.canvas.moveTo(cp[0].x, cp[0].y);

        if (cp.length === 2) this.canvas.lineTo(cp[1].x, cp[1].y);else if (cp.length === 3) this.canvas.quadraticCurveTo(cp[1].x, cp[1].y, cp[2].x, cp[2].y);else if (cp.length === 4) this.canvas.bezierCurveTo(cp[1].x, cp[1].y, cp[2].x, cp[2].y, cp[3].x, cp[3].y);

        this.canvas.stroke();
    } else {
        if (!obj.points) {
            for (var t = 0; t < 1; t += step) {
                P = controlPoints.concat();
                for (var i = 0, _i = controlPoints.length - 1; i < _i; i = 0 | i + 1) {
                    for (var j = 0, _j = P.length - 1; j < _j; j = 0 | j + 1) {
                        nextP[j] = new Unitary.Point(P[j + 1].x * t + P[j].x * (1 - t), P[j + 1].y * t + P[j].y * (1 - t));
                    }P = nextP;
                    nextP = [];
                }
                points[pointsLength] = P[0];
                pointsLength = 0 | pointsLength + 1;
            }
            points[pointsLength] = controlPoints[controlPoints.length - 1];
        }
        obj.points = points;

        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        for (var _i2 = 0, _i3 = points.length; _i2 < _i3; _i2 = 0 | _i2 + 1) {
            this.canvas.lineTo(this.X(points[_i2].x), this.Y(points[_i2].y));
        }this.canvas.stroke();
    }
};

var CirclePainter = function (obj) {
    var center = obj.center,
        r = obj.r;
    this.canvas.beginPath();
    this.canvas.arc(this.X(center.x), this.Y(center.y), r, 0, 2 * Math.PI, obj.anticlockwise);
    if (obj.style.fillStyle !== null) this.canvas.fill();
    this.canvas.stroke();
};

var CircularSectorPainter = function (obj) {
    var center = obj.center,
        r = obj.r,
        startAngle = obj.startAngle,
        endAngle = obj.endAngle;
    this.canvas.beginPath();
    this.canvas.moveTo(this.X(center.x), this.Y(center.y));
    this.canvas.arc(this.X(center.x), this.Y(center.y), r, startAngle, endAngle, obj.anticlockwise);
    this.canvas.closePath();
    if (obj.style.fillStyle !== null) this.canvas.fill();
    this.canvas.stroke();
};

var DoughnutPainter = function (obj) {
    var center = obj.center,
        x = this.X(center.x),
        y = this.Y(center.y),
        innerRadius = obj.innerRadius,
        outerRadius = obj.outerRadius;
    if (obj.style.fillStyle !== null) {
        this.canvas.beginPath();
        this.canvas.arc(x, y, outerRadius, 0, 2 * Math.PI, false);
        this.canvas.arc(x, y, innerRadius, 0, 2 * Math.PI, true);
        this.canvas.fill();
    }

    this.canvas.beginPath();
    this.canvas.arc(x, y, outerRadius, 0, 2 * Math.PI, false);
    this.canvas.stroke();

    this.canvas.beginPath();
    this.canvas.arc(x, y, innerRadius, 0, 2 * Math.PI, true);
    this.canvas.stroke();
};

var GraphPainter = function (obj) {
    this.canvas.beginPath();
    var start = obj.start,
        end = obj.end;
    if (start === null) start = -this.origin.x;
    if (end === null) end = this.canvasWidth - this.origin.x;

    var points = [];
    for (var i = start; i <= end; i = 0 | i + 1) {
        points[points.length] = new Unitary.Point(i, obj.f(i / obj.scale) * obj.scale);
    }this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
    for (var _i2 = 0, _i = points.length; _i2 < _i; _i2 = 0 | _i2 + 1) {
        this.canvas.lineTo(this.X(points[_i2].x), this.Y(points[_i2].y));
        this.canvas.moveTo(this.X(points[_i2].x), this.Y(points[_i2].y));
    }
    this.canvas.closePath();
    this.canvas.stroke();
};

var GroupPainter = function (obj) {
    for (var i = 0, _i = obj.group.length; i < _i; i = 0 | i + 1) {
        this.__drawHelper__(obj.group[i]);
    }
};

var ImagePainter = function (obj) {
    var image = obj.__image__;
    if (obj.dx !== null && obj.sx !== null) this.canvas.drawImage(image, obj.sx, obj.sy, obj.sw, obj.sh, this.X(obj.dx), this.Y(obj.dy), obj.dw, obj.dh);else if (obj.dx !== null && obj.sx === null && obj.dw !== null) this.canvas.drawImage(image, this.X(obj.dx), this.Y(obj.dy), obj.dw, obj.dh);else if (obj.dx !== null && obj.dw === null) {
        // obj.sx !== null ならば必ず obj.dw !== nullとなるから、
        // 対偶をとり obj.dw === nullならばobj.sx === null
        this.canvas.drawImage(image, this.X(obj.dx), this.Y(obj.dy));
    } else if (obj.dx === null) this.canvas.drawImage(image);
};

var LinePainter = function (obj) {
    var leftBorder = new Unitary.Segment(new Unitary.Point(0, 0), new Unitary.Point(0, this.canvasHeight));
    var rightBorder = new Unitary.Segment(new Unitary.Point(this.canvasWidth, 0), new Unitary.Point(this.canvasWidth, this.canvasHeight));
    var topBorder = new Unitary.Segment(new Unitary.Point(0, 0), new Unitary.Point(this.canvasWidth, 0));
    var bottomBorder = new Unitary.Segment(new Unitary.Point(0, this.canvasHeight), new Unitary.Point(this.canvasWidth, this.canvasHeight));

    var leftEndPoint = null,
        rightEndPoint = null;
    if (leftBorder.intersects(obj)) leftEndPoint = leftBorder.toLine().getIntersection(obj);
    if (rightBorder.intersects(obj)) rightEndPoint = rightBorder.toLine().getIntersection(obj);

    if (topBorder.intersects(obj) && bottomBorder.intersects(obj)) {
        var inter1 = topBorder.toLine().getIntersection(obj);
        var inter2 = bottomBorder.toLine().getIntersection(obj);
        if (inter1.x > inter2.x) {
            leftEndPoint = inter1;
            rightEndPoint = inter2;
        } else {
            leftEndPoint = inter2;
            rightEndPoint = inter1;
        }
    } else if (topBorder.intersects(obj) && !bottomBorder.intersects(obj)) {
        var inter = topBorder.toLine().getIntersection(obj);
        if (leftEndPoint == null) {
            leftEndPoint = inter;
        } else {
            rightEndPoint = inter;
        }
    } else if (!topBorder.intersects(obj) && bottomBorder.intersects(obj)) {
        var _inter = bottomBorder.toLine().getIntersection(obj);
        if (rightEndPoint == null) {
            rightEndPoint = _inter;
        } else {
            leftEndPoint = _inter;
        }
    }

    if (leftEndPoint != null && rightEndPoint != null) {
        this.canvas.beginPath();
        this.canvas.moveTo(this.X(leftEndPoint.x), this.Y(leftEndPoint.y));
        this.canvas.lineTo(this.X(rightEndPoint.x), this.Y(rightEndPoint.y));
        this.canvas.stroke();
    }
};

var PointPainter = function (obj) {
    this.canvas.fillRect(this.X(obj.x), this.Y(obj.y), 1, 1);
};

var RectPainter = function (obj) {
    var x = this.X(obj.points[0].x);
    var y = this.Y(obj.points[0].y);
    var w = obj.points[1].x - obj.points[0].x;
    var h = obj.points[1].y - obj.points[0].y;
    if (this.mode !== 'normal') {
        h = -(obj.points[1].y - obj.points[0].y); // 左下を原点として扱っているからマイナスしないと計算があわない
    }
    if (obj.style.fillStyle !== null) this.canvas.fillRect(x, y, w, h); // 上でそれぞれX()、Y()適用済み
    else this.canvas.strokeRect(x, y, w, h);
};

var SegmentPainter = function (obj) {
    this.canvas.beginPath();
    this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    this.canvas.lineTo(this.X(obj.points[1].x), this.Y(obj.points[1].y));
    this.canvas.stroke();
};

var TextPainter = function (obj) {
    this.canvas.textAlign = obj.style.align;
    this.canvas.textBaseline = obj.style.baseline;
    var x = this.X(obj.P.x);
    var y = this.Y(obj.P.y);
    var maxWidth = obj.style.maxWidth;
    var defaultFont = void 0;
    if (obj.style.font !== null) {
        defaultFont = this.canvas.font;
        this.canvas.font = obj.style.font;
    }
    if (maxWidth === null) {
        if (obj.style.strokesOutline) this.canvas.strokeText(obj.text, x, y);
        this.canvas.fillText(obj.text, x, y);
    } else {
        if (obj.style.strokesOutline) this.canvas.strokeText(obj.text, x, y, maxWidth);
        this.canvas.fillText(obj.text, x, y, maxWidth);
    }
    if (obj.style.font !== null) this.canvas.font = defaultFont;
};

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

var __imageCaches = [];
var errorCatcher = function errorCatcher(e) {
    console.log(e);
};
var Canvas = function () {
    function Canvas(id) {
        var _this = this;

        classCallCheck(this, Canvas);

        if (document.getElementById(id) === null) {
            if (document.readyState === 'complete') throw new Error('not found canvas.');
            this.ready = new Promise(function (resolve) {
                return window.addEventListener('load', resolve);
            });
        } else {
            this.ready = Promise.resolve();
        }
        this.ready.then(function () {
            var canvas = document.getElementById(id);
            _this.canvas = canvas.getContext('2d');
            _this.element = canvas;
            _this.canvasHeight = canvas.height;
            _this.canvasWidth = canvas.width;
        });
        this.id = id;
        this.objects = [];
        this.mode = 'graph';
        this.origin = new Unitary.Point(0, 0);
    }

    createClass(Canvas, [{
        key: 'listen',
        value: function listen(type) {
            var _this2 = this;

            this.ready.then(function () {
                return _this2.element.addEventListener(type, eventTrigger.bind(_this2), false);
            });
        }
    }, {
        key: 'add',
        value: function add(obj) {
            this.objects[this.objects.length] = obj;
        }
    }, {
        key: 'removeAllObjects',
        value: function removeAllObjects() {
            this.objects = [];
        }
    }, {
        key: 'clear',
        value: function clear() {
            var _this3 = this;

            this.ready.then(function () {
                return _this3.canvas.clearRect(0, 0, _this3.canvasWidth, _this3.canvasHeight);
            });
        }
    }, {
        key: 'X',
        value: function X(x) {
            return Math.round(x + this.origin.x);
        }
    }, {
        key: 'Y',
        value: function Y(y) {
            if (this.mode === 'normal') return Math.round(y + this.origin.y);else return Math.round(this.canvasHeight - (y + this.origin.y));
        }
    }, {
        key: 'draw',
        value: function draw() {
            var _this4 = this;

            var promises = [];
            var load = function load(src, obj) {
                promises[promises.length] = new Promise(function (resolve, rejector) {
                    var image = void 0;
                    if (!__imageCaches[src]) {
                        // 画像を読み込む回数を抑える
                        image = new Image();
                        image.src = src;
                        __imageCaches[src] = image;
                    } else {
                        image = __imageCaches[src];
                    }
                    if (!image.loaded) {
                        image.addEventListener('load', function () {
                            obj.__image__ = image;
                            image.loaded = true;
                            resolve();
                        });
                        image.addEventListener('error', rejector);
                    } else {
                        obj.__image__ = image;
                        resolve();
                    }
                }).catch(errorCatcher);
            };
            var loadImage = function loadImage(objects) {
                for (var i = 0, _i = objects.length; i < _i; i = 0 | i + 1) {
                    var obj = objects[i];
                    if (obj.name() === 'Image') {
                        if (!obj.__image__) {
                            load(obj.src, obj);
                        }
                    } else if (obj.name() === 'Group') {
                        loadImage(obj.group);
                    }
                }
            };
            loadImage(this.objects);
            return Promise.all(promises.concat(this.ready)).then(function () {
                for (var i = 0, _i = _this4.objects.length; i < _i; i = 0 | i + 1) {
                    _this4.__drawHelper__(_this4.objects[i]);
                }
            }).catch(errorCatcher);
        }
    }, {
        key: '__drawHelper__',
        value: function __drawHelper__(obj) {
            // this method sets strokeStyle and fillStyle.
            var name = obj.name();
            this.canvas.strokeStyle = '#000';
            this.canvas.fillStyle = '#000';
            if (obj.style && obj.style.fillStyle !== null) {
                this.canvas.fillStyle = obj.style.fillStyle;
            }
            if (obj.style && obj.style.strokeStyle !== null) {
                this.canvas.strokeStyle = obj.style.strokeStyle;
            }
            Canvas.painter[name].call(this, obj);
        }
    }, {
        key: 'toDataURL',
        value: function toDataURL() {
            return this.element.toDataURL();
        }
    }]);
    return Canvas;
}();


function eventTrigger(e) {
    var rect = e.target.getBoundingClientRect();
    var x = this.X(e.clientX - rect.left),
        y = this.Y(e.clientY - rect.top);
    var P = new Unitary.Point(x, y);

    var stopPropagationCalled = false;
    e.stopPropagation = function () {
        stopPropagationCalled = true;
    };
    for (var i = this.objects.length - 1; i >= 0; i = 0 | i - 1) {
        if (stopPropagationCalled) break;
        if (this.objects[i].has && this.objects[i].has(P)) {
            this.objects[i].trigger(e.type, e);
        }
    }
}
Unitary.UnitaryObject.prototype.on = function (name, handler) {
    if (!this.handlers) this.handlers = {};
    if (!this.handlers[name]) this.handlers[name] = [];
    this.handlers[name].push(handler);
    return this;
};
Unitary.UnitaryObject.prototype.trigger = function (name, e) {
    if (!this.handlers || !this.handlers[name]) return this;
    for (var i = 0, _i = this.handlers[name].length; i < _i; i = 0 | i + 1) {
        this.handlers[name][i](e);
    }
    return this;
};
Canvas.painter = {};

Canvas.painter.BezierCurve = BezierCurvePainter;
Canvas.painter.Circle = CirclePainter;
Canvas.painter.CircularSector = CircularSectorPainter;
Canvas.painter.Doughnut = DoughnutPainter;
Canvas.painter.Graph = GraphPainter;
Canvas.painter.Group = GroupPainter;
Canvas.painter.Image = ImagePainter;
Canvas.painter.Line = LinePainter;
Canvas.painter.Point = PointPainter;
Canvas.painter.Rect = RectPainter;
Canvas.painter.Segment = SegmentPainter;
Canvas.painter.Text = TextPainter;

Canvas.painter.Polygon = PolygonDrawFunction;
Canvas.painter.Quadrilateral = PolygonDrawFunction;
Canvas.painter.Triangle = PolygonDrawFunction;

function PolygonDrawFunction(obj) {
    this.canvas.beginPath();
    this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    for (var i = 0, _i = obj.points.length; i < _i; i = 0 | i + 1) {
        this.canvas.lineTo(this.X(obj.points[i].x), this.Y(obj.points[i].y));
    }this.canvas.closePath();
    if (obj.style.fillStyle !== null) this.canvas.fill();
    this.canvas.stroke();
}
Canvas.preload = function () {
    var _arguments = arguments;

    var promises = [];

    var _loop = function _loop(i, _i) {
        var src = _arguments.length <= i ? undefined : _arguments[i];
        if (!__imageCaches[src]) {
            promises[promises.length] = new Promise(function (resolve, reject) {
                var image = new Image();
                image.src = src;
                image.addEventListener('load', function () {
                    image.loaded = true;
                    resolve();
                });
                image.addEventListener('error', reject);
                __imageCaches[src] = image;
            }).catch(errorCatcher);
        }
    };

    for (var i = 0, _i = arguments.length; i < _i; i = 0 | i + 1) {
        _loop(i, _i);
    }
    return Promise.all(promises).catch(errorCatcher);
};

return Canvas;

})));
