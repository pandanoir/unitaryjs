"use strict";
import UnitaryObject from './unitaryobjcet.js';

import BezierCurve from './beziercurve.js';
import Circle from './circle.js';
import CircularSector from './circularsector.js';
import Graph from './graph.js';
import Group from './group.js';
import Image_ from './image.js';
import Line from './line.js';
import Point from './point.js';
import Polygon from './polygon.js';
import Quadrilateral from './quadrilateral.js';
import Rect from './rect.js';
import Segment from './segment.js';
import Text_ from './text.js';
import Triangle from './triangle.js';
import {BaseVector, Vector, Vector3D} from './vector.js';

function distance(A, B) {
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
}

export default {
    distance: distance,
    UnitaryObject: UnitaryObject,
    BaseVector: BaseVector,
    BezierCurve: BezierCurve,
    Circle: Circle,
    CircularSector: CircularSector,
    Graph: Graph,
    Group: Group,
    Image: Image_,
    Line: Line,
    Point: Point,
    Polygon: Polygon,
    Quadrilateral: Quadrilateral,
    Rect: Rect,
    Segment: Segment,
    Text: Text_,
    Triangle: Triangle,
    Vector3D: Vector3D,
    Vector: Vector,
    XAxis: new Line(new Point(0, 0), new Point(1, 0)),
    YAxis: new Line(new Point(0, 0), new Point(0, 1)),
    VERSION: '0.0.6'
};
