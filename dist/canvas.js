(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Canvas = factory());
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
                window.addEventListener('load', function () {
                    resolve();
                    console.log('loaded');
                });
            }).then(function () {
                var canvas = document.getElementById(id);
                _this.canvas = canvas.getContext('2d');
                _this.element = canvas;
                _this.canvasHeight = canvas.height;
                _this.canvasWidth = canvas.width;
            });
        } else {
            var canvas = document.getElementById(id);
            this.canvas = canvas.getContext('2d');
            this.element = canvas;
            this.ready = Promise.resolve();
            this.canvasHeight = canvas.height;
            this.canvasWidth = canvas.width;
        }
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
                _this2.element.addEventListener(type, eventTrigger.bind(_this2), false);
            });
        }
    }, {
        key: 'add',
        value: function add(obj) {
            this.objects.push(obj);
        }
    }, {
        key: 'removeAllObjects',
        value: function removeAllObjects() {
            this.objects = [];
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        }
    }, {
        key: 'X',
        value: function X(x) {
            var res = x + this.origin.x;
            // if (this.mode === 'normal') {
            //     return res;
            // }
            return Math.round(res);
        }
    }, {
        key: 'Y',
        value: function Y(y) {
            var res = this.canvasHeight - (y + this.origin.y);
            if (this.mode === 'normal') {
                res = y + this.origin.y;
            }
            return Math.round(res);
        }
    }, {
        key: 'draw',
        value: function draw() {
            var _this3 = this;

            var promises = [];
            var load = function load(src, obj) {
                promises.push(new Promise(function (resolve, rejector) {
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
                }).catch(errorCatcher));
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
                for (var i = 0, _i = _this3.objects.length; i < _i; i = 0 | i + 1) {
                    var obj = _this3.objects[i];
                    _this3.__drawHelper__(obj);
                }
            }).catch(errorCatcher);
        }
    }, {
        key: '__drawHelper__',
        value: function __drawHelper__(obj) {
            var name = obj.name();
            this.canvas.strokeStyle = '#000';
            this.canvas.fillStyle = '#000';
            if (obj.style && obj.style.fillColor !== null) {
                this.canvas.fillStyle = obj.style.fillColor;
            }
            if (obj.style && obj.style.strokeColor !== null) {
                this.canvas.strokeStyle = obj.style.strokeColor;
            }
            Canvas.drawFunction[name].call(this, obj);
        }
    }, {
        key: 'toDataURL',
        value: function toDataURL() {
            return document.getElementById(this.id).toDataURL();
        }
    }]);
    return Canvas;
}();


function eventTrigger(e) {
    var rect = e.target.getBoundingClientRect();
    var x = this.X(e.clientX - rect.left),
        y = this.Y(e.clientY - rect.top);

    var stopPropagationCalled = false;
    e.stopPropagation = function () {
        stopPropagationCalled = true;
    };
    for (var i = this.objects.length - 1; i >= 0; i--) {
        if (stopPropagationCalled) break;
        if (this.objects[i].has && this.objects[i].has(new Unitary.Point(x, y))) {
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
    for (var i = 0, _i = this.handlers[name].length; i < _i; i++) {
        this.handlers[name][i](e);
    }
    return this;
};
Canvas.drawFunction = {
    Segment: function Segment(obj) {
        this.canvas.beginPath();
        this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
        this.canvas.lineTo(this.X(obj.points[1].x), this.Y(obj.points[1].y));
        this.canvas.closePath();
        this.canvas.stroke();
    },
    Line: function Line(obj) {
        this.canvas.beginPath();
        if (obj.b === 0) {
            this.canvas.moveTo(this.X(-obj.c), 0);
            this.canvas.lineTo(this.X(-obj.c), this.canvasHeight);
        } else {
            this.canvas.moveTo(0, this.Y(-(obj.c / obj.b)));
            this.canvas.lineTo(this.canvasWidth, this.Y(-(obj.a * this.canvasWidth + obj.c) / obj.b));
        }
        this.canvas.closePath();
        this.canvas.stroke();
    },
    Circle: function Circle(obj) {
        var O = obj.center,
            r = obj.r;
        this.canvas.beginPath();
        this.canvas.arc(this.X(O.x), this.Y(O.y), r, 0, 2 * Math.PI, false);
        this.canvas.closePath();
        this.canvas.stroke();
        if (obj.style.fillColor !== null) this.canvas.fill();
    },
    CircularSector: function CircularSector(obj) {
        var center = obj.center,
            r = obj.r,
            startAngle = obj.startAngle,
            endAngle = obj.endAngle;
        this.canvas.beginPath();
        this.canvas.moveTo(this.X(center.x), this.Y(center.y));
        this.canvas.arc(this.X(center.x), this.Y(center.y), r, startAngle, endAngle, false);
        this.canvas.lineTo(this.X(center.x), this.Y(center.y));
        this.canvas.closePath();
        this.canvas.stroke();
        if (obj.style.fillColor !== null) this.canvas.fill();
    },
    Polygon: PolygonDrawFunction,
    Quadrilateral: PolygonDrawFunction,
    Triangle: PolygonDrawFunction,
    Rect: function Rect(obj) {
        var x = this.X(obj.points[0].x);
        var y = this.Y(obj.points[0].y);
        var w = obj.points[1].x - obj.points[0].x;
        var h = obj.points[1].y - obj.points[0].y;
        if (this.mode !== 'normal') {
            h = -(obj.points[1].y - obj.points[0].y); // 左下を原点として扱っているからマイナスしないと計算があわない
        }
        if (obj.style.fillColor !== null) this.canvas.fillRect(x, y, w, h); // 上でそれぞれX()、Y()適用済み
        else this.canvas.strokeRect(x, y, w, h);
    },
    Text: function Text(obj) {
        this.canvas.textAlign = obj.style.align;
        this.canvas.textBaseline = obj.style.baseline;
        var x = obj.P.x;
        var y = obj.P.y;
        var maxWidth = obj.style.maxWidth;
        var defaultFont = void 0;
        if (obj.style.font !== null) {
            defaultFont = this.canvas.font;
            this.canvas.font = obj.style.font;
        }
        if (maxWidth === null) {
            if (obj.style.strokesOutline) {
                this.canvas.strokeText(obj.text, this.X(x), this.Y(y));
            }
            this.canvas.fillText(obj.text, this.X(x), this.Y(y));
        } else {
            if (obj.style.strokesOutline) {
                this.canvas.strokeText(obj.text, this.X(x), this.Y(y), maxWidth);
            }
            this.canvas.fillText(obj.text, this.X(x), this.Y(y), maxWidth);
        }
        if (obj.style.font !== null) {
            this.canvas.font = defaultFont;
        }
    },
    Point: function Point(obj) {
        this.canvas.fillRect(this.X(obj.x), this.Y(obj.y), 1, 1);
    },
    Image: function Image(obj) {
        var image = obj.__image__;
        if (obj.dx !== null && obj.sx !== null) {
            this.canvas.drawImage(image, obj.sx, obj.sy, obj.sw, obj.sh, this.X(obj.dx), this.Y(obj.dy), obj.dw, obj.dh);
        } else if (obj.dx !== null && obj.sx === null && obj.dw !== null) {
            this.canvas.drawImage(image, this.X(obj.dx), this.Y(obj.dy), obj.dw, obj.dh);
        } else if (obj.dx !== null && obj.dw === null) {
            // obj.sx !== null ならば必ず obj.dw !== nullとなるから、
            // 対偶をとり obj.dw === nullならばobj.sx === null
            this.canvas.drawImage(image, this.X(obj.dx), this.Y(obj.dy));
        } else if (obj.dx === null) {
            this.canvas.drawImage(image);
        }
    },
    Group: function Group(obj) {
        for (var i = 0, _i = obj.group.length; i < _i; i = 0 | i + 1) {
            this.__drawHelper__(obj.group[i]);
        }
    },
    Graph: function Graph(obj) {
        this.canvas.beginPath();
        var start = obj.start,
            end = obj.end;
        if (start === null) {
            start = -this.origin.x;
        }
        if (end === null) {
            end = this.canvasWidth - this.origin.x;
        }
        var points = [];
        for (var i = start; i <= end; i = 0 | i + 1) {
            points[points.length] = new Unitary.Point(i, obj.f(i / obj.scale) * obj.scale);
        }
        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        for (var _i2 = 0, _i = points.length; _i2 < _i; _i2 = 0 | _i2 + 1) {
            this.canvas.lineTo(this.X(points[_i2].x), this.Y(points[_i2].y));
            this.canvas.moveTo(this.X(points[_i2].x), this.Y(points[_i2].y));
        }
        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        this.canvas.closePath();
        this.canvas.stroke();
    },
    BezierCurve: function BezierCurve(obj) {
        this.canvas.beginPath();
        var controlPoints = obj.controlPoints;
        var P = controlPoints;
        var nextP = [];
        var points = [controlPoints[0]];
        var step = obj.step;

        for (var t = 0; t < 1; t += step) {
            P = controlPoints.concat();
            for (var i = 0, _i = controlPoints.length - 1; i < _i; i++) {
                for (var j = 0, _j = P.length - 1; j < _j; j++) {
                    nextP[j] = new Unitary.Point(P[j + 1].x * t + P[j].x * (1 - t), P[j + 1].y * t + P[j].y * (1 - t));
                }
                P = nextP;
                nextP = [];
            }
            points.push(P[0]);
        }
        points.push(controlPoints[controlPoints.length - 1]);

        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        for (var _i3 = 0, _i4 = points.length; _i3 < _i4; _i3 = 0 | _i3 + 1) {
            this.canvas.lineTo(this.X(points[_i3].x), this.Y(points[_i3].y));
            this.canvas.moveTo(this.X(points[_i3].x), this.Y(points[_i3].y));
        }
        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        this.canvas.closePath();
        this.canvas.stroke();
    }
};
Canvas.preload = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var promises = [];

    var _loop = function _loop(i, _i) {
        var src = args[i];
        if (!__imageCaches[src]) {
            promises.push(new Promise(function (resolve, reject) {
                var image = new Image();
                image.src = src;
                image.addEventListener('load', function () {
                    image.loaded = true;
                    resolve();
                });
                image.addEventListener('error', reject);
                __imageCaches[src] = image;
            }).catch(errorCatcher));
        }
    };

    for (var i = 0, _i = args.length; i < _i; i++) {
        _loop(i, _i);
    }
    return Promise.all(promises).catch(errorCatcher);
};
function PolygonDrawFunction(obj) {
    this.canvas.beginPath();
    this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    for (var i = 0, _i = obj.points.length; i < _i; i = 0 | i + 1) {
        this.canvas.lineTo(this.X(obj.points[i].x), this.Y(obj.points[i].y));
    }
    this.canvas.lineTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    this.canvas.closePath();
    this.canvas.stroke();
    if (obj.style.fillColor !== null) this.canvas.fill();
}

return Canvas;

})));
