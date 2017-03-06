"use strict";
import UnitaryObject from './classes/unitaryobject.js';
import ContouredObject from './classes/contouredobject.js';

import BezierCurve from './classes/beziercurve.js';
import Circle from './classes/circle.js';
import CircularSector from './classes/circularsector.js';
import Curve from './classes/curve.js';
import Doughnut from './classes/doughnut.js';
import Graph from './classes/graph.js';
import Group from './classes/group.js';
import Image_ from './classes/image.js';
import Line from './classes/line.js';
import Point from './classes/point.js';
import Polygon from './classes/polygon.js';
import Quadrilateral from './classes/quadrilateral.js';
import Rect from './classes/rect.js';
import Segment from './classes/segment.js';
import Text_ from './classes/text.js';
import Triangle from './classes/triangle.js';
import {BaseVector, Vector, Vector3D} from './classes/vector.js';
import {version as VERSION} from '../package.json';

export default {
    distance: (A, B) => {
        let res;
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
    },
    UnitaryObject,
    ContouredObject,
    BaseVector,
    BezierCurve,
    Circle,
    CircularSector,
    Curve,
    Doughnut,
    Donut: Doughnut,
    Graph,
    Group,
    Image: Image_,
    Line,
    Point,
    Polygon,
    Quadrilateral,
    Rect,
    Segment,
    Text: Text_,
    Triangle,
    Vector3D,
    Vector,
    XAxis: new Line(new Point(0, 0), new Point(1, 0)),
    YAxis: new Line(new Point(0, 0), new Point(0, 1)),
    VERSION
};
