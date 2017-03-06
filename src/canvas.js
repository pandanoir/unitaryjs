const __imageCaches = [];
const errorCatcher = e => {
    console.log(e);
};
import BezierCurvePainter from './painter/beziercurve.js';
import CirclePainter from './painter/circle.js';
import CircularSectorPainter from './painter/circularsector.js';
import CurvePainter from './painter/curve.js';
import DoughnutPainter from './painter/doughnut.js';
import GraphPainter from './painter/graph.js';
import GroupPainter from './painter/group.js';
import ImagePainter from './painter/image.js';
import LinePainter from './painter/line.js';
import PointPainter from './painter/point.js';
import RectPainter from './painter/rect.js';
import SegmentPainter from './painter/segment.js';
import TextPainter from './painter/text.js';

class Canvas {
    constructor(id, width = 300, height = 300) {
        this.ready = Promise.resolve();
        if (document.readyState !== 'complete') this.ready = new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
        this.ready.then(() => {
            if (document.getElementById(id) === null) {
                const canvas = document.createElement('canvas');
                canvas.setAttribute('id', id);
                canvas.width = width;
                canvas.height = height;
                this.element = canvas;
            } else this.element = document.getElementById(id);

            this.canvas = this.element.getContext('2d');
            this.canvasWidth = this.element.width;
            this.canvasHeight = this.element.height;
        });
        this.id = id;
        this.objects = [];
        this.mode = 'graph';
        this.origin = new Unitary.Point(0, 0);
        const basicListeners = ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'keypress', 'keydown', 'keyup'];
        for (let i = 0, _i = basicListeners.length; i < _i; i++) {
            this.listen(basicListeners[i]);
        }
    }
    listen(type) {
        this.ready.then(() => this.element.addEventListener(type, eventTrigger.bind(this), false));
    }
    add(...obj) {
        this.objects.push(...obj);
    }
    removeAllObjects() {
        this.objects = [];
    }
    clear() {
        this.ready.then(() => this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight));
    }
    X(x) {
        return Math.round(x + this.origin.x);
    }
    Y(y) {
        if (this.mode === 'normal') return Math.round(y + this.origin.y);
        else return Math.round(this.canvasHeight - (y + this.origin.y));
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
                this.__drawHelper__(this.objects[i]);
            }
        }).catch(errorCatcher);
    }
    __drawHelper__(obj) {
        // this method sets strokeStyle and fillStyle.
        const name = obj.name();
        this.canvas.fillStyle = '#000';
        this.canvas.strokeStyle = '#000';
        if (obj.style && obj.style.fillStyle !== null) {
            this.canvas.fillStyle = obj.style.fillStyle;
        }
        if (obj.style && obj.style.strokeStyle !== null) {
            this.canvas.strokeStyle = obj.style.strokeStyle;
        }
        if (obj.getLineDash && this.canvas.setLineDash) this.canvas.setLineDash(obj.getLineDash());
        if (obj.getLineCap) this.canvas.lineCap = obj.getLineCap();
        if (obj.getLineDashOffset) this.canvas.lineDashOffset = obj.getLineDashOffset();
        if (obj.getLineJoin) this.canvas.lineJoin = obj.getLineJoin();
        if (obj.getLineWidth) this.canvas.lineWidth = obj.getLineWidth();

        Canvas.painter[name].call(this, obj);
    }
    toDataURL() {
        return this.element.toDataURL();
    }
    static preload(...args) {
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
    }
};
function eventTrigger(e) {
    const rect = e.target.getBoundingClientRect();
    const x = this.X(e.clientX - rect.left),
        y = this.Y(e.clientY - rect.top);
    const P = new Unitary.Point(x, y);

    let stopPropagationCalled = false;
    e.stopPropagation = () => {stopPropagationCalled = true};
    for (let i = this.objects.length - 1; i >= 0; i = 0|i-1) {
        if (stopPropagationCalled) break;
        if (this.objects[i].has && this.objects[i].has(P)) {
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
Canvas.painter = {};

Canvas.painter.BezierCurve = BezierCurvePainter;
Canvas.painter.Circle = CirclePainter;
Canvas.painter.CircularSector = CircularSectorPainter;
Canvas.painter.Curve = CurvePainter;
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
    for (let i = 0, _i = obj.points.length; i < _i; i = 0|i+1)
        this.canvas.lineTo(this.X(obj.points[i].x), this.Y(obj.points[i].y));

    this.canvas.closePath();
    if (obj.style.fillStyle !== null) this.canvas.fill();
    this.canvas.stroke();
};
export default Canvas;
