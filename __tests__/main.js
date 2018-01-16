const assert = require('assert');
const Unitary = require('../dist/onlyunitary.js');
for (const key of Object.keys(Unitary)) {
    global[key] = Unitary[key];
}
global.Image_ = Unitary.Image;
global.Text_ = Unitary.Text;
describe('Unitary', () => {
    const A = new Point(3, 3);
    const B = new Point(0, 0);
    const C = new Point(4, 5);
    const D = new Point(1, 1);
    const AB = new Line(A, B);
    const SegAB = new Segment(A, B);

    describe('UnitaryObject', () => {
        it('set*', () => {
            const obj = new UnitaryObject();
            assert.strictEqual(obj, obj.setFillColor('#fff'));
            assert.equal(obj.style.fillStyle, '#fff');
            assert.strictEqual(obj, obj.setFillStyle('#000'));
            assert.equal(obj.style.fillStyle, '#000');
            assert.strictEqual(obj, obj.setStrokeColor('#fff'));
            assert.equal(obj.style.strokeStyle, '#fff');
            assert.strictEqual(obj, obj.setStrokeStyle('#000'));
            assert.equal(obj.style.strokeStyle, '#000');
        });
        it('has', () => {
            const obj = new UnitaryObject();
            assert.equal(obj.has(), false);
        });
        it('move', () => {
            const obj = new UnitaryObject();
            assert.strictEqual(obj, obj.move(300, 300));
            assert.strictEqual(obj, obj.moveX(300));
            assert.strictEqual(obj, obj.moveY(300));
        });
        it('name', () => {
            const obj = new UnitaryObject();
            assert.equal(obj.name(), 'UnitaryObject');
        });
    });
    describe('BezierCurve', () => {
        it('name', () => {
            assert.equal(new BezierCurve().name(), 'BezierCurve');
        });
        it('setStep', () => {
            const bezier = new BezierCurve().setStep(1000);
            assert.equal(bezier.step, 1000);
        });
        it('move', () => {
            const bezier = new BezierCurve().setStep(1000);
            assert.strictEqual(bezier, bezier.move(0, 0));
            assert.ok(bezier !== bezier.move(3, 3));
        });
    });
    describe('Circle', () => {
        it('getter', () => {
            const c = new Circle(new Point(0, 0), 3);
            assert.strictEqual(c.Origin, c.center);
            assert.strictEqual(c.radius, c.r);
        });
        it('moveTo', () => {
            assert.ok(new Circle(A, 3).moveTo(0, 0).equals(new Circle(new Point(0, 0), 3)));
            const c = new Circle(new Point(0, 0), 3);
            assert.strictEqual(c, c.moveTo(0, 0));
        });
        it('move', () => {
            assert.ok(new Circle(A, 3).move(109, 31).equals(new Circle(new Point(112, 34), 3)));
            const c = new Circle(new Point(0, 0), 3);
            assert.strictEqual(c, c.move(0, 0));
        });
        it('getEquation', () => {
            assert.equal(new Unitary.Circle(new Unitary.Point(10, 10), 10).getEquation(), '(x-10)^2+(y-10)^2=10^2');
            assert.equal(new Unitary.Circle(new Unitary.Point(-10, 10), 10).getEquation(), '(x+10)^2+(y-10)^2=10^2');
            assert.equal(new Unitary.Circle(new Unitary.Point(10, -10), 10).getEquation(), '(x-10)^2+(y+10)^2=10^2');
            assert.equal(new Unitary.Circle(new Unitary.Point(-10, -10), 10).getEquation(), '(x+10)^2+(y+10)^2=10^2');
            assert.equal(new Unitary.Circle(new Unitary.Point(0, 0), 10).getEquation(), '(x)^2+(y)^2=10^2');
        });
        it('equals', () => {
            const c = new Circle(new Point(0, 0), 3);
            assert.equal(c.equals(new UnitaryObject()), false);
            assert.ok(c.equals(new Circle(new Point(0, 0), 3)));
        });
        it('name', () => {
            assert.equal(new Circle(A, 3).name(), 'Circle');
        });
    });
    describe('CircularSector', () => {
        const rad = Math.PI / 2;
        const A = new Point(3, 3);
        it('moveTo', () => {
            assert.ok(new CircularSector(A, 3, rad).moveTo(0, 0).equals(new CircularSector(new Point(0, 0), 3, rad)));
        });
        it('move', () => {
            assert.ok(new CircularSector(A, 3, rad).move(109, 31).equals(new CircularSector(new Point(112, 34), 3, rad)));
        });
        it('rotate', () => {
            assert.ok(new CircularSector(A, 3, rad, 0).rotate(3).equals(new CircularSector(A, 3, rad + 3, 3)));
            assert.ok(new CircularSector(A, 3, Math.PI / 2, 0).rotate(Math.PI * 2).equals(new CircularSector(A, 3, Math.PI / 2, 0)));
        });
        it('name', () => {
            assert.equal(new CircularSector(A, 3).name(), 'CircularSector');
        });
    });
    describe('Curve', () => {
        it('move', () => {
            const curve = new Curve(()=>{}, ()=>{});
            curve.moveX();
            curve.moveY();
        });
        it('equals', () => {
            const curve = new Curve(()=>{}, ()=>{});
            assert.equal(curve.equals(new UnitaryObject()), false);
            assert.equal(curve.equals(curve), false);
            assert.equal(curve.equals(), false);
        });
        it('name', () => {
            const curve = new Curve(()=>{}, ()=>{});
            assert.equal(curve.name(), 'Curve');
        });
    });
    describe('Doughnut', () => {
        it('move', () => {
            const doughnut = new Doughnut(new Point(0, 0), 2, 3);
            assert.strictEqual(doughnut, doughnut.move(0, 0));
        });
        it('equals', () => {
            const doughnut = new Doughnut(new Point(0, 0), 2, 3);
            assert.equal(doughnut.equals(new UnitaryObject()), false);
            assert.ok(doughnut.equals(new Doughnut(new Point(0, 0), 2, 3)));
        });
        it('name', () => {
            const doughnut = new Doughnut(new Point(0, 0), 2, 3);
            assert.equal(doughnut.name(), 'Doughnut');
        });
    });
    describe('Ellipse', () => {
        const rad = Math.PI / 2;
        const A = new Point(3, 3);
        it('moveTo', () => {
            assert.ok(new Ellipse(A, 3, 4).moveTo(0, 0).equals(new Ellipse(new Point(0, 0), 3, 4)));
        });
        it('move', () => {
            assert.ok(new Ellipse(A, 3, 4).move(109, 31).equals(new Ellipse(new Point(112, 34), 3, 4)));
        });
        it('rotate', () => {
            const ellipse1 = new Ellipse(A, 3, 4);
            ellipse1.angle = 3;
            assert.ok(new Ellipse(A, 3, 4).rotate(3).equals(ellipse1));
        });
        it('has', () => {
            const ellipse1 = new Ellipse(A, 3, 4);
            const ellipse2 = ellipse1.rotate(1 / 2 * Math.PI);
            assert.ok(!ellipse1.has(new Point(3, 3).move(3, 3)));
            assert.ok(!ellipse1.has(new Point(3, 4).move(3, 3)));
            assert.ok(!ellipse1.has(new Point(4, 3).move(3, 3)));
            assert.ok(ellipse1.has(new Point(2, 0).move(3, 3)));
            assert.ok(ellipse1.has(new Point(3, 0).move(3, 3)));
            assert.ok(!ellipse1.has(new Point(4, 0).move(3, 3)));
            assert.ok(ellipse1.has(new Point(0, 2).move(3, 3)));
            assert.ok(ellipse1.has(new Point(0, 3).move(3, 3)));
            assert.ok(ellipse1.has(new Point(0, 4).move(3, 3)));

            assert.ok(!ellipse2.has(new Point(3, 3).move(3, 3)));
            assert.ok(!ellipse2.has(new Point(3, 4).move(3, 3)));
            assert.ok(!ellipse2.has(new Point(4, 3).move(3, 3)));
            assert.ok(ellipse2.has(new Point(2, 0).move(3, 3)));
            assert.ok(ellipse2.has(new Point(2, 0).move(3, 3)));
            assert.ok(ellipse2.has(new Point(3, 0).move(3, 3)));
            assert.ok(ellipse2.has(new Point(4, 0).move(3, 3)));
            assert.ok(ellipse2.has(new Point(0, 2).move(3, 3)));
            assert.ok(ellipse2.has(new Point(0, 3).move(3, 3)));
            assert.ok(!ellipse2.has(new Point(0, 4).move(3, 3)));
        });
        it('name', () => {
            assert.equal(new Ellipse(A, 3, 4).name(), 'Ellipse');
        });
    });
    describe('Graph', () => {
        it('equals', () => {
            const graph = new Graph(()=>{});
            assert.equal(graph.equals(new UnitaryObject()), false);
            assert.equal(graph.equals(graph), false);
            assert.equal(graph.equals(), false);
        });
        it('move', () => {
            const graph = new Graph(()=>{});
            graph.moveX();
            graph.moveY();
        });
        it('name', () => {
            const graph = new Graph(()=>{});
            assert.equal(graph.name(), 'Graph');
        });
    });
    describe('Group', () => {
        it('name', () => {
            assert.equal(new Group().name(), 'Group');
        });
    });
    describe('Image_', () => {
        it('equals', () => {
            assert.ok(new Image_('./hoge.png', A).equals(new Image_('./hoge.png', A)));
            const newImage = new Image_('./hoge.png', A);
            assert.ok(newImage.equals(newImage));
        });
        it('move', () => {
            assert.ok(new Image_('./hoge.png', A).move(31, 31).equals(new Image_('./hoge.png', A.move(31, 31))));
        });
        it('name', () => {
            assert.equal(new Image_('./hoge.png', A).name(), 'Image');
        });
    });
    describe('Line', () => {
        const line1a = new Line(new Point(0, 0), new Point(1, 0)), line1b = new Line(new Point(0, 10), new Point(1, 10)); // parallel to X axis.
        const line2a = new Line(new Point(0, 0), new Point(0, 1)), line2b = new Line(new Point(10, 0), new Point(10, 1)); // parallel to Y axis.
        const line3a = new Line(new Point(0, 0), new Point(1, 1)), line3b = new Line(new Point(0, 10), new Point(1, 11)); // y = x
        const lines = [line1a, line1b, line2a, line2b, line3a, line3b];
        it('constructor', () => {
            assert.throws(() => {
                new Line(new Point(0, 0), new Point(0, 0));
            });
        });
        it('move', () => {
            assert.ok(new Line(A, B).move(31, 31).equals(new Line(A.move(31, 31), B.move(31, 31))));
            const l = new Line(A, B);
            assert.strictEqual(l, l.move(0, 0));
        });
        it('toString', () => {
            assert.equal(new Line(new Point(1, 44), new Point(68, 12)).toString(), '32x+67y-2980=0');
            assert.equal(new Line(new Point(90, 31), new Point(90, 94)).toString(), 'x-90=0');
            assert.equal(new Line(new Point(31, 90), new Point(94, 90)).toString(), 'y-90=0');
            assert.equal(new Line(new Point(1, -1), new Point(-2, 2)).toString(), 'x+y=0');
        });
        it('getIntersection', () => {
            assert.equal(new Line(new Point(0, 0), new Point(0, 10)).getIntersection(new Line(new Point(10,0), new Point(10,10))), false);
            assert.equal(new Line(new Point(0, 0), new Point(10, 0)).getIntersection(new Line(new Point(0,10), new Point(10,10))), false);
            assert.ok(new Line(new Point(0, 0), new Point(0, 10)).getIntersection(new Line(new Point(5,10), new Point(10,10))).equals(new Point(0, 10)));
            assert.equal(new Line(new Point(0, 0), new Point(10, 10)).getIntersection(new Line(new Point(0, 0), new Point(10,10))), false);
            assert.ok(new Line(new Point(0, 0), new Point(10, 10)).getIntersection(new Line(new Point(0, 20), new Point(1,19))).equals(new Point(10, 10)));
        });
        it('equals', () => {
            assert.ok(lines[0].equals(lines[0]));
            assert.ok(!lines[0].equals(lines[1]));
            assert.ok(!lines[0].equals(lines[2]));
            assert.ok(!lines[0].equals(lines[3]));
            assert.ok(!lines[0].equals(lines[4]));
            assert.ok(!lines[0].equals(lines[5]));
            assert.ok(lines[1].equals(lines[1]));
            assert.ok(!lines[1].equals(lines[2]));
            assert.ok(!lines[1].equals(lines[3]));
            assert.ok(!lines[1].equals(lines[4]));
            assert.ok(!lines[1].equals(lines[5]));
            assert.ok(lines[2].equals(lines[2]));
            assert.ok(!lines[2].equals(lines[3]));
            assert.ok(!lines[2].equals(lines[4]));
            assert.ok(!lines[2].equals(lines[5]));
            assert.ok(lines[3].equals(lines[3]));
            assert.ok(!lines[3].equals(lines[4]));
            assert.ok(!lines[3].equals(lines[5]));
            assert.ok(lines[4].equals(lines[4]));
            assert.ok(!lines[4].equals(lines[5]));
            assert.ok(lines[5].equals(lines[5]));
        });
        it('getEquation', () => {
            assert.equal(new Line(new Point(1, 0), new Point(0, 1)).getEquation(), 'x+y-1=0');
            assert.equal(new Line(new Point(1, -1), new Point(0, 1)).getEquation(), '2x+y-1=0');
            assert.equal(new Line(new Point(-1, 0), new Point(0, -1)).getEquation(), 'x+y+1=0');
            assert.equal(new Line(new Point(0, -1), new Point(-1, 0)).getEquation(), 'x+y+1=0');
            assert.equal(new Line(new Point(1, 0), new Point(0, -1)).getEquation(), 'x-y-1=0');
            assert.equal(new Line(new Point(-1, 0), new Point(0, 1)).getEquation(), 'x-y+1=0');
            assert.equal(new Line(new Point(-1, 0), new Point(-1, 1)).getEquation(), 'x+1=0');
            assert.equal(new Line(new Point(0, -1), new Point(1, -1)).getEquation(), 'y+1=0');
        });
        it('isParallelTo', () => {
            assert.ok(line1a.isParallelTo(line1b));
            assert.ok(line2a.isParallelTo(line2b));
            assert.ok(line3a.isParallelTo(line3b));

            assert.ok(!line1a.isParallelTo(line2a));
            assert.ok(!line1a.isParallelTo(line2b));
            assert.ok(!line1a.isParallelTo(line3a));
            assert.ok(!line1a.isParallelTo(line3b));

            assert.ok(!line2a.isParallelTo(line1a));
            assert.ok(!line2a.isParallelTo(line1b));
            assert.ok(!line2a.isParallelTo(line3a));
            assert.ok(!line2a.isParallelTo(line3b));

            assert.ok(!line3a.isParallelTo(line1a));
            assert.ok(!line3a.isParallelTo(line1b));
            assert.ok(!line3a.isParallelTo(line2a));
            assert.ok(!line3a.isParallelTo(line2b));
        });
        it('isPerpendicularTo', () => {
            const line1a = new Line(new Point(0, 0), new Point(1, 0)), line1b = new Line(new Point(0, 10), new Point(1, 10));
            const line2a = new Line(new Point(0, 0), new Point(0, 1)), line2b = new Line(new Point(10, 0), new Point(10, 1));
            const line3a = new Line(new Point(0, 0), new Point(1, 1)), line3b = new Line(new Point(0, 10), new Point(1, 11));

            assert.ok(line1a.isPerpendicularTo(line2a));
            assert.ok(line1a.isPerpendicularTo(line2b));
            assert.ok(line1b.isPerpendicularTo(line2a));
            assert.ok(line1b.isPerpendicularTo(line2b));

            assert.ok(!line1a.isPerpendicularTo(line1b));
            assert.ok(!line2a.isPerpendicularTo(line2b));
            assert.ok(!line3a.isPerpendicularTo(line3b));

            assert.ok(!line3a.isPerpendicularTo(line1a));
            assert.ok(!line3a.isPerpendicularTo(line1b));
            assert.ok(!line3a.isPerpendicularTo(line2a));
            assert.ok(!line3a.isPerpendicularTo(line2b));

        });
        it('name', () => {
            assert.equal(new Line(new Point(-66, 76), new Point(135, -20)).name(), 'Line');
        });
        it('Line.fromVector', () => {
            assert.ok(Line.fromVector(new Point(1, 1), new Point(1, 2)).equals(new Line(new Point(1, 1), new Point(2, 3))));
        });
    });
    describe('Point', () => {
        it('moveTo', () => {
            assert.ok(A.moveTo(9, 9).equals(new Point(9, 9)));
            const p = new Point(100, 100);
            assert.strictEqual(p, p.moveTo(100, 100));
        });
        it('move', () => {
            assert.ok(A.move(1, 1).equals(new Point(4, 4)));
            assert.ok(A.move(-1, -1).equals(new Point(2, 2)));
            const p = new Point(100, 100);
            assert.strictEqual(p, p.move(0, 0));
        });
        it('equals', () => {
            assert.ok(A.equals(A));
            assert.ok(A.move(3, 3).equals(A.move(3, 3)));
            assert.equal(new Point(0, 0).equals(new Vector(0, 0)), false);
        });
        it('name', () => {
            assert.equal(A.name(), 'Point');
        });
        it('toString', () => {
            const p = new Point(100, -100);
            assert.equal(p.toString(), '(100, -100)');
        });
        it('inspect', () => {
            const p = new Point(100, -100);
            assert.equal(p.inspect(), '(100, -100)');
        });
    });
    describe('Polygon', () => {
        it('name', () => {
            assert.equal(new Polygon(new Point(48,84), new Point(86,65), new Point(29,43), new Point(64,48), new Point(68,41)).name(), 'Polygon');
        });
        it('move', () => {
            assert.deepEqual(
                new Polygon(new Point(48,84), new Point(86,65), new Point(29,43), new Point(64,48), new Point(68,41)).move(30, 30),
                new Polygon(new Point(78,114), new Point(116,95), new Point(59,73), new Point(94,78), new Point(98,71))
            );
        });
    });
    describe('Quadrilateral', () => {
        it('getArea', () => {
        });
        it('name', () => {
            assert.equal(new Quadrilateral(new Point(48,84), new Point(86,65), new Point(64,48), new Point(29,43)).name(), 'Quadrilateral');
        });
    });
    describe('Rect', () => {
        it('has', () => {
            const rect = new Rect(new Point(48,84), new Point(64,48));
            assert.ok(!rect.has(new Point(30, 30)));
            assert.ok(!rect.has(new Point(30, 50)));
            assert.ok(!rect.has(new Point(30, 90)));
            assert.ok(!rect.has(new Point(50, 30)));
            assert.ok(rect.has(new Point(50, 50)));
            assert.ok(!rect.has(new Point(50, 90)));
            assert.ok(!rect.has(new Point(70, 30)));
            assert.ok(!rect.has(new Point(70, 50)));
            assert.ok(!rect.has(new Point(70, 90)));
        });
        it('move', () => {
            const rect = new Rect(new Point(1, 1), new Point(3, 3));
            assert.strictEqual(rect, rect.move(0, 0));
            const dx = 3, dy = 3;
            const newRect = rect.move(dx, dy);
            assert.equal(rect.points[0].x + dx, newRect.points[0].x);
            assert.equal(rect.points[0].y + dy, newRect.points[0].y);

            assert.equal(rect.points[1].x + dx, newRect.points[1].x);
            assert.equal(rect.points[1].y + dy, newRect.points[1].y);
        });
        it('name', () => {
            assert.equal(new Rect(new Point(48,84), new Point(64,48)).name(), 'Rect');
        });
    });
    describe('Segment', () => {
        it('move', () => {
            assert.ok(SegAB.move(31,19).equals(new Segment(A.move(31, 19), B.move(31, 19))));
        });
        it('has', () => {
            const seg = new Segment(new Point(0, 0), new Point(100, 100)); // y = x
            const segParallelToXaxis = new Segment(new Point(0, 0), new Point(100, 0));
            const segParallelToYaxis = new Segment(new Point(0, 0), new Point(0, 100));

            assert.equal(SegAB.has(A), true);
            assert.equal(SegAB.has(B), true);
            assert.equal(SegAB.has(C), false);
            assert.equal(SegAB.has(D), true);

            assert.ok(seg.has(new Point(0, 0)));
            assert.ok(!seg.has(new Point(100, 0)));
            assert.ok(!seg.has(new Point(50, 0)));
            assert.ok(!seg.has(new Point(-50, 0)));
            assert.ok(!seg.has(new Point(0, 100)));
            assert.ok(seg.has(new Point(100, 100)));
            assert.ok(seg.has(new Point(50, 50)));

            assert.ok(segParallelToXaxis.has(new Point(0, 0)));
            assert.ok(segParallelToXaxis.has(new Point(100, 0)));
            assert.ok(segParallelToXaxis.has(new Point(50, 0)));
            assert.ok(!segParallelToXaxis.has(new Point(-50, 0)));
            assert.ok(!segParallelToXaxis.has(new Point(0, 100)));
            assert.ok(!segParallelToXaxis.has(new Point(100, 100)));

            assert.ok(segParallelToYaxis.has(new Point(0, 0)));
            assert.ok(segParallelToYaxis.has(new Point(0, 100)));
            assert.ok(segParallelToYaxis.has(new Point(0, 50)));
            assert.ok(!segParallelToYaxis.has(new Point(0, -50)));
            assert.ok(!segParallelToYaxis.has(new Point(100, 0)));
            assert.ok(!segParallelToYaxis.has(new Point(100, 100)));
        });
        it('intersects', () => {
            const A = new Point(10, 10), B = new Point(10, 50), C = new Point(30, 30), D = new Point(100, 10);
            const AB = new Segment(A, B);
            const AC = new Segment(A, C);
            const AD = new Segment(A, D);
            const BC = new Segment(B, C);
            const BD = new Segment(B, D);
            const CD = new Segment(C, D);
            assert.equal(new Segment(new Point(48,84), new Point(86,65)).intersects(new Segment(new Point(64,48), new Point(29,43))), false);
            assert.equal(new Segment(new Point(48,84), new Point(64,48)).intersects(new Segment(new Point(86,65), new Point(29,43))), true);

            assert.ok(AB.intersects(AC));
            assert.ok(AB.intersects(AD));
            assert.ok(AB.intersects(BC));
            assert.ok(AB.intersects(BD));
            assert.ok(!AB.intersects(CD));

            assert.ok(AC.intersects(AD));
            assert.ok(AC.intersects(BC));
            assert.ok(!AC.intersects(BD));
            assert.ok(AC.intersects(CD));

            assert.ok(!AD.intersects(BC));
            assert.ok(AD.intersects(BD));
            assert.ok(AD.intersects(CD));

            assert.ok(BC.intersects(BD));
            assert.ok(BC.intersects(CD));

            assert.ok(BD.intersects(CD));
        });
        it('toLine', () => {
            assert.equal(new Segment(new Point(48,84), new Point(86,65)).toLine().toString(), 'x+2y-216=0');
        });
        it('equals', () => {
            assert.ok(new Segment(new Point(48,84), new Point(64,48)).equals(new Segment(new Point(48,84), new Point(64,48))));
        });
        it('name', () => {
            assert.equal(SegAB.name(), 'Segment');
        });
    });
    describe('Text_', () => {
        it('name', () => {
            assert.equal(new Text_('Text', new Point(3, 3)).name(), 'Text');
        });
    });
    describe('Triangle', () => {
        const EquilateralTriangle = new Triangle(new Point(0, 0), new Point(30, 0), new Point(30 * Math.cos(Math.PI*(1/3)), 30 * Math.sin(Math.PI*(1/3))));
        it('constructor', () => {
            assert.throws(() => {
                new Triangle(new Point(1, 1), new Point(1, 1), new Point(2, 2));
                new Triangle(new Point(1, 1), new Point(2, 2), new Point(1, 1));
                new Triangle(new Point(2, 2), new Point(1, 1), new Point(1, 1));
            });
            assert.throws(() => {
                new Triangle(new Point(1, 1), new Point(2, 2));
            });
        });
        it('getIncircle', () => {
            assert.ok(EquilateralTriangle.getIncircle().equals(new Circle(new Point(15, 30 * (1/Math.sqrt(3))*Math.sin(Math.PI*(1/6))), 5 * Math.sqrt(3))))});
        it('getArea', () => {
            assert.equal(EquilateralTriangle.getArea(), 30 * 30 * (Math.sqrt(3) / 4));
        });
        it('name', () => {
            assert.equal(EquilateralTriangle.name(), 'Triangle');
        });
    });
    describe('BaseVector', () => {
        it('add', () => {
            assert.throws(() => {
                new BaseVector(0, 0).add(new BaseVector(0, 0, 0));
            });
        });
        it('product', () => {
            assert.throws(() => {
                new BaseVector(0, 0).product(new BaseVector(0, 0, 0));
            });
        });
        it('multiple', () => {
            const v = new BaseVector(0, 0);
            assert.strictEqual(v, v.multiple(1));
        });
        it('move', () => {
            const v = new BaseVector(0, 0);
            assert.ok(v.move(1, 0).equals(new BaseVector(1, 0)));
        });
        it('equals', () => {
            const v1 = new BaseVector(0, 0);
            const v2 = new BaseVector(0, 0, 0);
            assert.equal(v1.equals(v2), false);
        });
        it('name', () => {
            assert.equal(new BaseVector(0, 0).name(), 'BaseVector');
        });
    });
    describe('Vector', () => {
        it('constructor', () => {
            const components = [1, 2];
            const v = new Vector(...components);
            const v_from_v = new Vector(v);
            const v_from_p = new Vector(new Point(...components));
            assert.ok(v.equals(v_from_v));
            assert.ok(v.equals(v_from_p));
        });
        it('add', () => {
            assert.ok(new Vector(A.x - B.x, A.y - B.y).add(new Vector(C.x - D.x, C.y - D.y)).equals(new Vector(6, 7)));
            assert.ok(new Vector(3, 4).add(new Vector(-10, 7)).equals(new Vector(-7, 11)));
        });
        it('subtract', () => {
            assert.ok(new Vector(A.x, A.y).subtract(new Vector(B.x, B.y)).equals(new Vector(A.x - B.x, A.y - B.y)));
        });
        it('product', () => {
            assert.equal(new Vector(3, 3).product(new Vector(-3, 3)), 0);
            assert.equal(new Vector(1, 3).product(new Vector(7, 10)), 37);
        });
        it('multiple', () => {
            assert.ok(new Vector(48, 84).multiple(86).equals(new Vector(4128, 7224)));
        });
        it('abs', () => {
            assert.equal(new Vector(48, 84).abs(), Math.sqrt(48*48 + 84*84));
        });
        it('equals', () => {
            assert.ok(new Vector(B.x - A.x, B.y - A.y).equals(new Vector(-3, -3)));
        });
        it('normalize', () => {
            assert.ok(new Vector(3, 0).normalize().equals(new Vector(1, 0)));
            assert.strictEqual(1, new Vector(3, 3).normalize().abs());
        });
        it('move', () => {
            const v = new Vector(48, 84);
            assert.ok(v.move(7, 79).equals(new Vector(55, 163)));
            assert.strictEqual(v, v.move(0, 0));
        });
        it('toPoint', () => {
            assert.ok(new Point(3, 3).equals(new Vector(3, 3).toPoint()));
        });
        it('name', () => {
            assert.equal(new Vector(48, 84).name(), 'Vector');
        });
    });
    describe('Vector3D', () => {
        it('constructor', () => {
            const v = new Vector3D(1, 2, 3);
            const v_from_v = new Vector3D(v);
            assert.ok(v.equals(v_from_v));
        });
        it('add', () => {
            assert.ok(new Vector3D(96, 57, 81).add(new Vector3D(42, 74, 55)).equals(new Vector3D(138, 131, 136)));
        });
        it('subtract', () => {
            assert.ok(new Vector3D(96, 57, 81).subtract(new Vector3D(42, 74, 55)).equals(new Vector3D(54, -17, 26)));
        });
        it('product', () => {
            assert.equal(new Vector3D(3, 3, 3).product(new Vector3D(-3, 3, 0)), 0);
            assert.equal(new Vector3D(34, 39, 90).product(new Vector3D(17, 59, 60)), 8279);
        });
        it('multiple', () => {
            assert.ok(new Vector3D(90, 19, 20).multiple(64).equals(new Vector3D(5760, 1216, 1280)));
        });
        it('abs', () => {
            assert.equal(new Vector3D(64, 33, 38).abs(), Math.sqrt(6629));
        });
        it('equals', () => {
            assert.ok(new Vector3D(64, 33, 38).equals(new Vector3D(64, 33, 38)));
        });
        it('move', () => {
            assert.ok(new Vector3D(96, 57, 81).move(42, 74, 55).equals(new Vector3D(138, 131, 136)));
            const v = new Vector3D(1, 2, 3);
            assert.strictEqual(v, v.move(0, 0, 0));
        });
        it('name', () => {
            assert.equal(new Vector3D(96, 57, 81).name(), 'Vector3D');
        });
    });
});
