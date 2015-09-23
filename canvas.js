var WORLD = Unitary.WORLD;
function Canvas(id) {
    var canvas = document.getElementById(id);
    this.canvas = canvas.getContext('2d');
    this.canvasHeight = canvas.height;
    this.canvasWidth = canvas.width;
    this.id = id;
    this.objects = [];
    this.mode = 'graph';
}
Canvas.fn = Canvas.prototype;
Canvas.fn.add = function(obj) {
    this.objects.push(obj);
};
Canvas.fn.draw = function() {
    var X = function(x) {
        if (this.mode === 'normal') {
            return x + WORLD.ORIGIN.x;
        }
        return x + WORLD.ORIGIN.x;
    }.bind(this);
    var Y = function(y) {
        if (this.mode === 'normal') {
            return y + WORLD.ORIGIN.y;
        }
        return this.canvasHeight - y + WORLD.ORIGIN.y;
    }.bind(this);

    for (var i = 0, _i = this.objects.length; i < _i; i = 0|i+1) {
        this.canvas.beginPath();
        this.canvas.strokeStyle = '#000';
        this.canvas.fillStyle = '#000';
        var obj = this.objects[i];
        var name = obj.name();
        if (name === 'Segment') {
            this.canvas.moveTo(X(obj.points[0].x), Y(obj.points[0].y));
            this.canvas.lineTo(X(obj.points[1].x), Y(obj.points[1].y));
        }
        if (name === 'Line') {
            this.canvas.moveTo(0, Y(-(obj.c / obj.b)));
            this.canvas.lineTo(this.canvasWidth, Y(-(this.canvasWidth + obj.c) / obj.b));
        }
        if (name === 'Circle') {
            var O = obj.Origin,
                r = obj.r;
            this.canvas.arc(X(O.x), Y(O.y), r, 0, 2 * Math.PI, false);
        }
        if (name === 'Polygon' || name === 'Quadrilateral' || name === 'Triangle') {
            this.canvas.moveTo(X(obj.points[0].x), Y(obj.points[0].y));
            for (var j = 0, _j = obj.points.length; j < _j; j = 0|j+1) {
                this.canvas.lineTo(X(obj.points[j].x), Y(obj.points[j].y));
            }
            this.canvas.lineTo(X(obj.points[0].x), Y(obj.points[0].y));
        }
        if (name === 'Rect') {
            var x = X(obj.points[0].x);
            var y = Y(obj.points[0].y);
            var w = obj.points[1].x - obj.points[0].x;
            var h = - (obj.points[1].y - obj.points[0].y); // 左下を原点として扱っているからマイナスしないと計算があわない
            this.canvas.strokeRect(x, y, w, h); // 上でX()、Y()している
        }
        if (name === 'Text') {
            this.canvas.strokeStyle = obj.outlineColor;
            this.canvas.fillStyle = obj.fillColor;
            this.canvas.textAlign = obj.align;
            this.canvas.textBaseline = obj.baseline;
            if (obj.font !== null) {
                var defaultFont = this.canvas.font;
                this.canvas.font = obj.font;
            }
            if (obj.maxWidth === null) {
                if (obj.strokesOutline) {
                    this.canvas.strokeText(obj.text, X(obj.x), Y(obj.y));
                }
                this.canvas.fillText(obj.text, X(obj.x), Y(obj.y));
            } else {
                if (obj.strokesOutline) {
                    this.canvas.strokeText(obj.text, X(obj.x), Y(obj.y), obj.maxWidth);
                }
                this.canvas.fillText(obj.text, X(obj.x), Y(obj.y), obj.maxWidth);
            }
            if(obj.font !== null) {
                this.canvas.font = defaultFont;
            }
        }
        if (name === 'Point') {
            this.canvas.fillRect(X(obj.x), Y(obj.y), 1, 1);
        }
        if (name === 'Image') {
            if (obj.dx !== null && obj.sx !== null) {
                this.canvas.drawImage(obj.src, obj.sx, obj.sy, obj.sw, obj.sh, X(obj.dx), Y(obj.dy), obj.dw, obj.dh);
            } else if (obj.dx !== null && obj.sx === null && obj.dw !== null) {
                this.canvas.drawImage(obj.src, X(obj.dx), Y(obj.dy), obj.dw, obj.dh);
            } else if (obj.dx !== null && obj.dw === null) {
                // obj.sx !== null ならば必ず obj.dw !== nullとなるから、
                // 対偶をとり obj.dw === nullならばobj.sx === null
                var image = new Image();
                image.src = obj.src;
                this.canvas.drawImage(image, X(obj.dx), Y(obj.dy));
            } else if (obj.dx === null) {
                this.canvas.drawImage(obj.src);
            }
        }
        this.canvas.closePath();
        this.canvas.stroke();
    }
};
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
