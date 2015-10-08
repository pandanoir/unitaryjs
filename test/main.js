var assert = require('assert');
var Unitary = require('../unitary.js');
for (var key in Unitary) {
    global[key] = Unitary[key];
}
global.Image_ = Unitary.Image;
global.Text_ = Unitary.Text;
describe('Unitary', function() {
    var A, AB, B, C, D, SegAB;
    A = new Point(3, 3);
    B = new Point(0, 0);
    C = new Point(4, 5);
    D = new Point(1, 1);
    AB = new Line(A, B);
    SegAB = new Segment(A, B);
    var log = function(result) {
        if (!result) {
            log.fail = log.fail + 1;
        }
    };
    // var log = console.log.bind(console);
    log.fail = 0;

    // distance
    log(distance(AB, C) === 0.7071067811865475);
    log(distance(A, C) === 2.23606797749979);
    log(distance(B, C) === 6.4031242374328485);

    describe('Circle', function() {
        it('moveTo', function() {
            assert.ok(new Circle(A, 3).moveTo(0, 0).equals(new Circle(new Point(0, 0), 3)));
        });
        it('move', function() {
            assert.ok(new Circle(A, 3).move(109, 31).equals(new Circle(new Point(112, 34), 3)));
        });
        it('name', function() {
            assert.equal(new Circle(A, 3).name(), 'Circle');
        });
    });
    describe('Graph', function() {
    });
    describe('Image_', function() {
        it('equals', function() {
            assert.ok(new Image_('./hoge.png', A).equals(new Image_('./hoge.png', A)));
            var newImage = new Image_('./hoge.png', A);
            assert.ok(newImage.equals(newImage));
        });
        it('move', function() {
            assert.ok(new Image_('./hoge.png', A).move(31, 31).equals(new Image_('./hoge.png', A.move(31, 31))));
        });
        it('name', function() {
            assert.equal(new Image_('./hoge.png', A).name(), 'Image');
        });
    });
    describe('Line', function() {
        it('move', function() {
            assert.ok(new Line(A, B).move(31, 31).equals(new Line(A.move(31, 31), B.move(31, 31))));
        });
        it('toString', function() {
            assert.equal(new Line(new Point(1, 44), new Point(68, 12)).toString(), '-32x-67y+2980=0');
            assert.equal(new Line(new Point(90, 31), new Point(90, 94)).toString(), 'x-90=0');
            assert.equal(new Line(new Point(31, 90), new Point(94, 90)).toString(), 'y-90=0');
            assert.equal(new Line(new Point(1, -1), new Point(-2, 2)).toString(), 'x+y=0');
        });
        it('getIntersection', function() {
            assert.equal(new Line(new Point(0, 0), new Point(0, 10)).getIntersection(new Line(new Point(10,0), new Point(10,10))), false);
            assert.equal(new Line(new Point(0, 0), new Point(10, 0)).getIntersection(new Line(new Point(0,10), new Point(10,10))), false);
            assert.ok(new Line(new Point(0, 0), new Point(0, 10)).getIntersection(new Line(new Point(5,10), new Point(10,10))).equals(new Point(0, 10)));
            assert.equal(new Line(new Point(0, 0), new Point(10, 10)).getIntersection(new Line(new Point(0, 0), new Point(10,10))), false);
            assert.ok(new Line(new Point(0, 0), new Point(10, 10)).getIntersection(new Line(new Point(0, 20), new Point(1,19))).equals(new Point(10, 10)));
        });
        it('equals', function() {
            assert.ok(new Line(new Point(-66, 76), new Point(135, -20)).equals(new Line(new Point(1, 44), new Point(68, 12))));
        });
        it('name', function() {
            assert.equal(new Line(new Point(-66, 76), new Point(135, -20)).name(), 'Line');
        });
    });
    describe('Point', function() {
        it('moveTo', function() {
            assert.equal(A.moveTo(9, 9).toString(), '(9, 9)');
        });
        it('move', function() {
            assert.equal(A.move(1, 1).toString(), '(4, 4)');
            assert.equal(A.move(-1, -1).toString(), '(2, 2)');
        });
        it('equals', function() {
            assert.ok(A.equals(A));
            assert.ok(A.move(3, 3).equals(A.move(3, 3)));
        });
        it('name', function() {
            assert.equal(A.name(), 'Point');
        });
    });
    describe('Polygon', function() {
        it('name', function() {
            assert.equal(new Polygon(new Point(48,84), new Point(86,65), new Point(29,43), new Point(64,48), new Point(68,41)).name(), 'Polygon');
        });
    });
    describe('Quadrilateral', function() {
        it('getArea', function() {
        });
        it('name', function() {
            assert.equal(new Quadrilateral(new Point(48,84), new Point(86,65), new Point(64,48), new Point(29,43)).name(), 'Quadrilateral');
        });
    });
    describe('Rect', function() {
        it('has', function() {
            var rect = new Rect(new Point(48,84), new Point(64,48));
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
        it('name', function() {
            assert.equal(new Rect(new Point(48,84), new Point(64,48)).name(), 'Rect');
        });
    });
    describe('Segment', function() {
        it('move', function() {
            assert.ok(SegAB.move(31,19).equals(new Segment(A.move(31, 19), B.move(31, 19))));
        });
        it('has', function() {
            assert.equal(SegAB.has(A), true);
            assert.equal(SegAB.has(B), true);
            assert.equal(SegAB.has(C), false);
            assert.equal(SegAB.has(D), true);
        });
        it('intersects', function() {
            assert.equal(new Segment(new Point(48,84), new Point(86,65)).intersects(new Segment(new Point(64,48), new Point(29,43))), false);
            assert.equal(new Segment(new Point(48,84), new Point(64,48)).intersects(new Segment(new Point(86,65), new Point(29,43))), true);
        });
        it('toLine', function() {
            assert.equal(new Segment(new Point(48,84), new Point(86,65)).toLine().toString(), '-x-2y+216=0');
        });
        it('equals', function() {
            assert.ok(new Segment(new Point(48,84), new Point(64,48)).equals(new Segment(new Point(48,84), new Point(64,48))));
        });
        it('name', function() {
            assert.equal(SegAB.name(), 'Segment');
        });
    });
    describe('Text_', function() {
        it('name', function() {
            assert.equal(new Text_('Text', new Point(3, 3)).name(), 'Text');
        });
    });
    describe('Triangle', function() {
        var EquilateralTriangle = new Triangle(new Point(0, 0), new Point(30, 0), new Point(30 * Math.cos(Math.PI*(1/3)), 30 * Math.sin(Math.PI*(1/3))));
        it('getIncircle', function() {
            assert.ok(EquilateralTriangle.getIncircle().equals(new Circle(new Point(15, 30 * (1/Math.sqrt(3))*Math.sin(Math.PI*(1/6))), 5 * Math.sqrt(3))))});
        it('getArea', function() {
            assert.equal(EquilateralTriangle.getArea(), 30 * 30 * (Math.sqrt(3) / 4));
        });
        it('name', function() {
            assert.equal(EquilateralTriangle.name(), 'Triangle');
        });
    });
    describe('Vector', function() {
        it('add', function() {
            assert.ok(new Vector(A.x - B.x, A.y - B.y).add(new Vector(C.x - D.x, C.y - D.y)).equals(new Vector(6, 7)));
            assert.ok(new Vector(3, 4).add(new Vector(-10, 7)).equals(new Vector(-7, 11)));
        });
        it('minus', function() {
            assert.ok(new Vector(A.x, A.y).minus(new Vector(B.x, B.y)).equals(new Vector(A.x - B.x, A.y - B.y)));
        });
        it('product', function() {
            assert.equal(new Vector(3, 3).product(new Vector(-3, 3)), 0);
            assert.equal(new Vector(1, 3).product(new Vector(7, 10)), 37);
        });
        it('multiple', function() {
            assert.ok(new Vector(48, 84).multiple(86).equals(new Vector(4128, 7224)));
        });
        it('abs', function() {
            assert.equal(new Vector(48, 84).abs(), Math.sqrt(48*48 + 84*84));
        });
        it('equals', function() {
            assert.ok(new Vector(B.x - A.x, B.y - A.y).equals(new Vector(-3, -3)));
        });
        it('move', function() {
            assert.ok(new Vector(48, 84).move(7, 79).equals(new Vector(55, 163)));
        });
        it('name', function() {
            assert.equal(new Vector(48, 84).name(), 'Vector');
        });
    });
    describe('Vector3D', function() {
        it('add', function() {
            assert.ok(new Vector3D(96, 57, 81).add(new Vector3D(42, 74, 55)).equals(new Vector3D(138, 131, 136)));
        });
        it('minus', function() {
            assert.ok(new Vector3D(96, 57, 81).minus(new Vector3D(42, 74, 55)).equals(new Vector3D(54, -17, 26)));
        });
        it('product', function() {
            assert.equal(new Vector3D(3, 3, 3).product(new Vector3D(-3, 3, 0)), 0);
            assert.equal(new Vector3D(34, 39, 90).product(new Vector3D(17, 59, 60)), 8279);
        });
        it('multiple', function() {
            assert.ok(new Vector3D(90, 19, 20).multiple(64).equals(new Vector3D(5760, 1216, 1280)));
        });
        it('abs', function() {
            assert.equal(new Vector3D(64, 33, 38).abs(), Math.sqrt(6629));
        });
        it('equals', function() {
            assert.ok(new Vector3D(64, 33, 38).equals(new Vector3D(64, 33, 38)));
        });
        it('move', function() {
            assert.ok(new Vector3D(96, 57, 81).move(42, 74, 55).equals(new Vector3D(138, 131, 136)));
        });
        it('name', function() {
            assert.equal(new Vector3D(96, 57, 81).name(), 'Vector3D');
        });
    });
});
