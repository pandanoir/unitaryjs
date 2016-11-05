const __imageCaches = [];
const errorCatcher = e => {
    console.log(e);
};
class Canvas {
    constructor(id) {
        if (document.getElementById(id) === null) {
            if (document.readyState === 'complete') throw new Error('not found canvas.');
            this.ready = new Promise(resolve => {
                window.addEventListener('load', () => {
                    resolve();
                });
            });
        } else {
            this.ready = Promise.resolve();
        }
        this.ready.then(() => {
            const canvas = document.getElementById(id);
            this.canvas = canvas.getContext('2d');
            this.element = canvas;
            this.canvasHeight = canvas.height;
            this.canvasWidth = canvas.width;
        });
        this.id = id;
        this.objects = [];
        this.mode = 'graph';
        this.origin = new Unitary.Point(0, 0);
    }
    listen(type) {
        this.ready.then(() => {
            this.element.addEventListener(type, eventTrigger.bind(this), false)
        });
    }
    add(obj) {
        this.objects[this.objects.length] = obj;
    }
    removeAllObjects() {
        this.objects = [];
    }
    clear() {
        this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    X(x) {
        const res = x + this.origin.x;
        // if (this.mode === 'normal') {
        //     return res;
        // }
        return Math.round(res);
    }
    Y(y) {
        let res = this.canvasHeight - (y + this.origin.y);
        if (this.mode === 'normal') {
            res = y + this.origin.y;
        }
        return Math.round(res);
    }
    draw() {
        const promises = [];
        const load = (src, obj) => {
            promises[promises.length] = new Promise((resolve, rejector) => {
                let image;
                if (!__imageCaches[src]) {
                    // 画像を読み込む回数を抑える
                    image = new Image();
                    image.src = src;
                    __imageCaches[src] = image;
                } else{
                    image = __imageCaches[src];
                }
                if (!image.loaded) {
                    image.addEventListener('load', () => {
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
        }
        const loadImage  = objects => {
            for (let i = 0, _i = objects.length; i < _i; i = 0|i+1){
                const obj = objects[i];
                if (obj.name() === 'Image') {
                    if (!obj.__image__) {
                        load(obj.src, obj);
                    }
                } else if(obj.name() === 'Group') {
                    loadImage(obj.group);
                }
            }
        }
        loadImage(this.objects);
        return Promise.all(promises.concat(this.ready)).then(() => {
            for (let i = 0, _i = this.objects.length; i < _i; i = 0|i+1) {
                const obj = this.objects[i];
                this.__drawHelper__(obj);
            }
        }).catch(errorCatcher);
    }
    __drawHelper__(obj) {
        const name = obj.name();
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
    toDataURL() {
        return document.getElementById(this.id).toDataURL();
    }
};
function eventTrigger(e) {
    const rect = e.target.getBoundingClientRect();
    const x = this.X(e.clientX - rect.left),
        y = this.Y(e.clientY - rect.top);

    let stopPropagationCalled = false;
    e.stopPropagation = () => {stopPropagationCalled = true};
    for (let i = this.objects.length - 1; i >= 0; i = 0|i-1) {
        if (stopPropagationCalled) break;
        if (this.objects[i].has && this.objects[i].has(new Unitary.Point(x, y))) {
            this.objects[i].trigger(e.type, e);
        }
    }
};
Unitary.UnitaryObject.prototype.on = function(name, handler) {
    if (!this.handlers) this.handlers = {};
    if (!this.handlers[name]) this.handlers[name] = [];
    this.handlers[name].push(handler);
    return this;
}
Unitary.UnitaryObject.prototype.trigger = function(name, e) {
    if (!this.handlers || !this.handlers[name]) return this;
    for (let i = 0, _i = this.handlers[name].length; i < _i; i = 0|i+1) {
        this.handlers[name][i](e);
    }
    return this;
};
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
        const O = obj.center,
            r = obj.r;
        this.canvas.beginPath();
        this.canvas.arc(this.X(O.x), this.Y(O.y), r, 0, 2 * Math.PI, false);
        this.canvas.closePath();
        this.canvas.stroke();
        if (obj.style.fillColor !== null) this.canvas.fill();
    },
    CircularSector: function(obj) {
        const center = obj.center,
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
    Rect: function(obj) {
        const x = this.X(obj.points[0].x);
        const y = this.Y(obj.points[0].y);
        const w = obj.points[1].x - obj.points[0].x;
        let h = obj.points[1].y - obj.points[0].y;
        if (this.mode !== 'normal') {
            h = - (obj.points[1].y - obj.points[0].y); // 左下を原点として扱っているからマイナスしないと計算があわない
        }
        if (obj.style.fillColor !== null) this.canvas.fillRect(x, y, w, h); // 上でそれぞれX()、Y()適用済み
        else this.canvas.strokeRect(x, y, w, h);
    },
    Text: function(obj) {
        this.canvas.textAlign = obj.style.align;
        this.canvas.textBaseline = obj.style.baseline;
        const x = obj.P.x;
        const y = obj.P.y;
        const maxWidth = obj.style.maxWidth;
        let defaultFont;
        if (obj.style.font !== null) {
            defaultFont = this.canvas.font;
            this.canvas.font = obj.style.font;
        }
        if (maxWidth === null) {
            if (obj.style.strokesOutline)
                this.canvas.strokeText(obj.text, this.X(x), this.Y(y));
            this.canvas.fillText(obj.text, this.X(x), this.Y(y));
        } else {
            if (obj.style.strokesOutline)
                this.canvas.strokeText(obj.text, this.X(x), this.Y(y), maxWidth);
            this.canvas.fillText(obj.text, this.X(x), this.Y(y), maxWidth);
        }
        if(obj.style.font !== null) this.canvas.font = defaultFont;
    },
    Point: function(obj) {
        this.canvas.fillRect(this.X(obj.x), this.Y(obj.y), 1, 1);
    },
    Image: function(obj) {
        const image = obj.__image__;
        if (obj.dx !== null && obj.sx !== null) this.canvas.drawImage(image, obj.sx, obj.sy, obj.sw, obj.sh, this.X(obj.dx), this.Y(obj.dy), obj.dw, obj.dh);
        else if (obj.dx !== null && obj.sx === null && obj.dw !== null) this.canvas.drawImage(image, this.X(obj.dx), this.Y(obj.dy), obj.dw, obj.dh);
        else if (obj.dx !== null && obj.dw === null) {
            // obj.sx !== null ならば必ず obj.dw !== nullとなるから、
            // 対偶をとり obj.dw === nullならばobj.sx === null
            this.canvas.drawImage(image, this.X(obj.dx), this.Y(obj.dy));
        } else if (obj.dx === null) this.canvas.drawImage(image);
    },
    Group: function(obj) {
        for (let i = 0, _i = obj.group.length; i < _i; i = 0|i+1) this.__drawHelper__(obj.group[i]);
    },
    Graph: function(obj) {
        this.canvas.beginPath();
        let start = obj.start , end = obj.end;
        if (start === null) start = -this.origin.x;
        if (end === null) end = this.canvasWidth - this.origin.x;

        const points = [];
        for (let i = start; i <= end; i = 0|i+1) points[points.length] = new Unitary.Point(i, obj.f(i / obj.scale) * obj.scale);

        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        for (let i = 0, _i = points.length; i < _i; i = 0|i+1) {
            this.canvas.lineTo(this.X(points[i].x), this.Y(points[i].y));
            this.canvas.moveTo(this.X(points[i].x), this.Y(points[i].y));
        }
        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        this.canvas.closePath();
        this.canvas.stroke();
    },
    BezierCurve: function(obj) {
        this.canvas.beginPath();
        const controlPoints = obj.controlPoints;
        let P = controlPoints;
        let nextP = [];
        const points = obj.points || [controlPoints[0]];
        let pointsLength = 1;
        const step = obj.step;

        if (!obj.points) {
            console.log('cache created');
            for (let t = 0; t < 1; t += step) {
                P = controlPoints.concat();
                for (let i = 0, _i = controlPoints.length - 1; i < _i; i = 0|i+1) {
                    for (let j = 0, _j = P.length - 1; j < _j; j = 0|j+1)
                        nextP[j] = new Unitary.Point(P[j + 1].x * t + P[j].x * (1 - t), P[j + 1].y * t + P[j].y * (1 - t));
                    P = nextP;
                    nextP = [];
                }
                points[pointsLength] = P[0];
                pointsLength = 0 | pointsLength + 1;
            }
            points[pointsLength] = controlPoints[controlPoints.length - 1];
        }
        obj.points = points;

        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        for (let i = 0, _i = points.length; i < _i; i = 0|i+1)
            this.canvas.lineTo(this.X(points[i].x), this.Y(points[i].y));
        this.canvas.moveTo(this.X(points[0].x), this.Y(points[0].y));
        this.canvas.closePath();
        this.canvas.stroke();
    }
}
Canvas.preload = (...args) => {
    const promises = [];
    for (let i = 0, _i = args.length; i < _i; i = 0|i+1) {
        const src = args[i];
        if (!__imageCaches[src]) {
            promises[promises.length] = new Promise((resolve, reject) => {
                const image = new Image();
                image.src = src;
                image.addEventListener('load', () => {
                    image.loaded = true;
                    resolve();
                });
                image.addEventListener('error', reject);
                __imageCaches[src] = image;
            }).catch(errorCatcher);
        }
    }
    return Promise.all(promises).catch(errorCatcher);
};
function PolygonDrawFunction(obj) {
    this.canvas.beginPath();
    this.canvas.moveTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    for (let i = 0, _i = obj.points.length; i < _i; i = 0|i+1)
        this.canvas.lineTo(this.X(obj.points[i].x), this.Y(obj.points[i].y));

    this.canvas.lineTo(this.X(obj.points[0].x), this.Y(obj.points[0].y));
    this.canvas.closePath();
    this.canvas.stroke();
    if (obj.style.fillColor !== null) this.canvas.fill();
};
export default Canvas;
