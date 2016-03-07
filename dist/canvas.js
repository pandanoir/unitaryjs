function Canvas(id) {
    var canvas = document.getElementById(id);
    this.canvas = canvas.getContext('2d');
    this.canvasHeight = canvas.height;
    this.canvasWidth = canvas.width;
    this.id = id;
    this.objects = [];
    this.mode = 'graph';
    this.origin = new Unitary.Point(0, 0);
};
Canvas.fn = Canvas.prototype;
Canvas.fn.add = function(obj) {
    this.objects.push(obj);
};
Canvas.fn.removeAllObjects = function() {
    this.objects = [];
};
Canvas.fn.clear = function() {
    this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
};
Canvas.fn.X = function(x) {
    var res = x + this.origin.x;
    // if (this.mode === 'normal') {
    //     return res;
    // }
    return Math.round(res);
};
Canvas.fn.Y = function(y) {
    var res = this.canvasHeight - (y + this.origin.y);
    if (this.mode === 'normal') {
        res = y + this.origin.y;
    }
    return Math.round(res);
};
Canvas.fn.draw = function() {
    var promises = [];
    function load(src, obj) {
        promises.push(new Promise(function(resolve, rejector) {
            var image = new Image();
            image.src = src;
            image.addEventListener('load', function() {
                obj.__image__ = image;
                resolve();
            });
            image.addEventListener('error', rejector);
        }));
    }
    for (var i = 0, _i = this.objects.length; i < _i; i = 0|i+1){
        var obj = this.objects[i];
        if (obj.name() === 'Image') {
            if (!obj.__image__) {
                load(obj.src, obj);
            }
        }
    }
    if (promises.length === 0) {
        return Promise().then(function() {
            for (var i = 0, _i = this.objects.length; i < _i; i = 0|i+1) {
                var obj = this.objects[i];
                this.__drawHelper__(obj);
            }
        }.bind(this));
    } else {
        return Promise.all(promises).then(function(values) {
            for (var i = 0, _i = this.objects.length; i < _i; i = 0|i+1) {
                var obj = this.objects[i];
                this.__drawHelper__(obj);
            }
        }.bind(this));
    }
};
Canvas.fn.__drawHelper__ = function(obj) {
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
Canvas.drawFunction = {
    Segment: function(obj) {
        this.canvas.beginPath();
        this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
        this.canvas.lineTo(this.X(obj.points[1].x), this.Y(obj.points[1].y));
        this.canvas.closePath();
        this.canvas.stroke();
    },
    Line: function(obj) {
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
    Circle: function(obj) {
        var O = obj.Origin,
        r = obj.r;
        this.canvas.beginPath();
        this.canvas.arc(this.X(O.x), this.Y(O.y), r, 0, 2 * Math.PI, false);
        this.canvas.closePath();
        this.canvas.stroke();
        if (obj.style.fillColor !== null) this.canvas.fill();
    },
    Polygon: PolygonDrawFunction,
    Quadrilateral: PolygonDrawFunction,
    Triangle: PolygonDrawFunction,
    Rect: function(obj) {
        var x = this.X(obj.points[0].x);
        var y = this.Y(obj.points[0].y);
        var w = obj.points[1].x - obj.points[0].x;
        var h = obj.points[1].y - obj.points[0].y;
        if (this.mode !== 'normal') {
            var h = - (obj.points[1].y - obj.points[0].y); // 左下を原点として扱っているからマイナスしないと計算があわない
        }
        if (obj.style.fillColor !== null) this.canvas.fillRect(x, y, w, h); // 上でそれぞれX()、Y()適用済み
        else this.canvas.strokeRect(x, y, w, h);
    },
    Text: function(obj) {
        this.canvas.textAlign = obj.style.align;
        this.canvas.textBaseline = obj.style.baseline;
        var x = obj.P.x;
        var y = obj.P.y;
        var maxWidth = obj.style.maxWidth;
        if (obj.style.font !== null) {
            var defaultFont = this.canvas.font;
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
        if(obj.style.font !== null) {
            this.canvas.font = defaultFont;
        }
    },
    Point: function(obj) {
        this.canvas.fillRect(this.X(obj.x), this.Y(obj.y), 1, 1);
    },
    Image: function(obj) {
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
    Group: function(obj) {
        for (var i = 0, _i = obj.group.length; i < _i; i = 0 | i + 1) {
            this.__drawHelper__(obj.group[i]);
        }
    },
    Graph: function(obj) {
        this.canvas.beginPath();
        var start = obj.start , end = obj.end;
        if (start === null) {
            start = -this.origin.x;
        }
        if (end === null) {
            end = this.canvasWidth - this.origin.x;
        }
        var points = [];
        for (var i = start; i <= end; i = 0|i+1) {
            points[points.length] = new Unitary.Point(i, obj.f(i / obj.scale) * obj.scale);
        }
        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        for (var i = 0, _i = points.length; i < _i; i = 0|i+1) {
            this.canvas.lineTo(this.X(points[i].x), this.Y(points[i].y));
            this.canvas.moveTo(this.X(points[i].x), this.Y(points[i].y));
        }
        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        this.canvas.closePath();
        this.canvas.stroke();
    }
}
Canvas.fn.toDataURL = function() {
    return document.getElementById(this.id).toDataURL();
};
function PolygonDrawFunction(obj) {
    this.canvas.beginPath();
    this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    for (var i = 0, _i = obj.points.length; i < _i; i = 0|i+1) {
        this.canvas.lineTo(this.X(obj.points[i].x), this.Y(obj.points[i].y));
    }
    this.canvas.lineTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    this.canvas.closePath();
    this.canvas.stroke();
    if (obj.style.fillColor !== null) this.canvas.fill();
};
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
