var WORLD = Unitary.WORLD;
function Canvas(id) {
    var canvas = document.getElementById(id);
    this.canvas = canvas.getContext('2d');
    this.canvasHeight = canvas.height;
    this.canvasWidth = canvas.width;
    this.id = id;
    this.objects = [];
    this.mode = 'graph';
};
Canvas.fn = Canvas.prototype;
Canvas.fn.add = function(obj) {
    this.objects.push(obj);
};
Canvas.fn.X = function(x) {
    if (this.mode === 'normal') {
        return x + WORLD.ORIGIN.x;
    }
    return x + WORLD.ORIGIN.x;
};
Canvas.fn.Y = function(y) {
    if (this.mode === 'normal') {
        return y + WORLD.ORIGIN.y;
    }
    return this.canvasHeight - y + WORLD.ORIGIN.y;
};
Canvas.fn.draw = function() {
    for (var i = 0, _i = this.objects.length; i < _i; i = 0|i+1) {
        this.canvas.beginPath();
        this.canvas.strokeStyle = '#000';
        this.canvas.fillStyle = '#000';
        var obj = this.objects[i];
        var name = obj.name();
        Canvas.drawFunction[name].call(this, obj);
        this.canvas.closePath();
        this.canvas.stroke();
    }
};
Canvas.drawFunction = {
    Segment: function(obj) {
        this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
        this.canvas.lineTo(this.X(obj.points[1].x), this.Y(obj.points[1].y));
    },
    Line: function(obj) {
        this.canvas.moveTo(0, this.Y(-(obj.c / obj.b)));
        this.canvas.lineTo(this.canvasWidth, this.Y(-(this.canvasWidth + obj.c) / obj.b));
    },
    Circle: function(obj) {
        var O = obj.Origin,
        r = obj.r;
        this.canvas.arc(this.X(O.x), this.Y(O.y), r, 0, 2 * Math.PI, false);
    },
    Polygon: function(obj) {
        this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
        for (var j = 0, _j = obj.points.length; j < _j; j = 0|j+1) {
            this.canvas.lineTo(this.X(obj.points[j].x), this.Y(obj.points[j].y));
        }
        this.canvas.lineTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    },
    Quadrilateral: function(obj) {
        this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
        for (var j = 0, _j = obj.points.length; j < _j; j = 0|j+1) {
            this.canvas.lineTo(this.X(obj.points[j].x), this.Y(obj.points[j].y));
        }
        this.canvas.lineTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    },
    Triangle: function(obj) {
        this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
        for (var j = 0, _j = obj.points.length; j < _j; j = 0|j+1) {
            this.canvas.lineTo(this.X(obj.points[j].x), this.Y(obj.points[j].y));
        }
        this.canvas.lineTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    },
    Rect: function(obj) {
        var x = this.X(obj.points[0].x);
        var y = this.Y(obj.points[0].y);
        var w = obj.points[1].x - obj.points[0].x;
        var h = - (obj.points[1].y - obj.points[0].y); // 左下を原点として扱っているからマイナスしないと計算があわない
        this.canvas.strokeRect(x, y, w, h); // 上でX()、Y()している
    },
    Text: function(obj) {
        this.canvas.strokeStyle = obj.outlineColor;
        this.canvas.fillStyle = obj.fillColor;
        this.canvas.textAlign = obj.align;
        this.canvas.textBaseline = obj.baseline;
        var x = obj.P.x;
        var y = obj.P.y;
        if (obj.font !== null) {
            var defaultFont = this.canvas.font;
            this.canvas.font = obj.font;
        }
        if (obj.maxWidth === null) {
            if (obj.strokesOutline) {
                this.canvas.strokeText(obj.text, this.X(x), this.Y(y));
            }
            this.canvas.fillText(obj.text, this.X(x), this.Y(y));
        } else {
            if (obj.strokesOutline) {
                this.canvas.strokeText(obj.text, this.X(x), this.Y(y), obj.maxWidth);
            }
            this.canvas.fillText(obj.text, this.X(x), this.Y(y), obj.maxWidth);
        }
        if(obj.font !== null) {
            this.canvas.font = defaultFont;
        }
    },
    Point: function(obj) {
        this.canvas.fillRect(this.X(obj.x), this.Y(obj.y), 1, 1);
    },
    Image: function(obj) {
        if (obj.dx !== null && obj.sx !== null) {
            this.canvas.drawImage(obj.src, obj.sx, obj.sy, obj.sw, obj.sh, this.X(obj.dx), this.Y(obj.dy), obj.dw, obj.dh);
        } else if (obj.dx !== null && obj.sx === null && obj.dw !== null) {
            this.canvas.drawImage(obj.src, this.X(obj.dx), this.Y(obj.dy), obj.dw, obj.dh);
        } else if (obj.dx !== null && obj.dw === null) {
            // obj.sx !== null ならば必ず obj.dw !== nullとなるから、
            // 対偶をとり obj.dw === nullならばobj.sx === null
            var image = new Image();
            image.src = obj.src;
            image.onload = function() {
                this.canvas.drawImage(image, this.X(obj.dx), this.Y(obj.dy));
            }.bind(this);
        } else if (obj.dx === null) {
            this.canvas.drawImage(obj.src);
        }
    },
    Graph: function(obj) {
        var start = obj.start , end = obj.end;
        if (start === null) {
            start = -WORLD.ORIGIN.x;
        }
        if (end === null) {
            end = this.canvasWidth - WORLD.ORIGIN.x;
        }
        var points = [];
        for (var i = start; i <= end; i = 0|i+1) {
            points[points.length] = new Unitary.Point(i, obj.f(i * obj.scale) / obj.scale);
        }
        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        for (var i = 0, _i = points.length; i < _i; i = 0|i+1) {
            this.canvas.lineTo(this.X(points[i].x), this.Y(points[i].y));
        }
        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
    }
}
Canvas.fn.toDataURL = function() {
    return document.getElementById(this.id).toDataURL();
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
