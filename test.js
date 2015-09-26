(function(global){
    var Unitary = require('./unitary.js');
    for (var key in Unitary) {
        global[key] = Unitary[key];
    }
    global.Image_ = Unitary.Image;
    global.Text_ = Unitary.Text;
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

    // Circle
        // moveTo
        log(new Circle(A, 3).moveTo(0, 0).equals(new Circle(new Point(0, 0), 3)));
        // move
        log(new Circle(A, 3).move(109, 31).equals(new Circle(new Point(112, 34), 3)));
        // name
        log(new Circle(A, 3).name() === 'Circle');
    // Graph
    // Image_
        // equals
        log(new Image_('./hoge.png', A).equals(new Image_('./hoge.png', A)));
        var newImage = new Image_('./hoge.png', A);
        log(newImage.equals(newImage));
        // move
        log(new Image_('./hoge.png', A).move(31, 31).equals(new Image_('./hoge.png', A.move(31, 31))));
        // name
        log(new Image_('./hoge.png', A).name() === 'Image');
    // Line
        // move
        log(new Line(A, B).move(31, 31).equals(new Line(A.move(31, 31), B.move(31, 31))));
        // toString
        log(new Line(new Point(1, 44), new Point(68, 12)).toString() === '-32x-67y+2980=0');
        log(new Line(new Point(90, 31), new Point(90, 94)).toString() === 'x-90=0');
        log(new Line(new Point(31, 90), new Point(94, 90)).toString() === 'y-90=0');
        log(new Line(new Point(1, -1), new Point(-2, 2)).toString() === 'x+y=0');
        // getIntersection
        log(new Line(new Point(0, 0), new Point(0, 10)).getIntersection(new Line(new Point(10,0), new Point(10,10))) === false);
        log(new Line(new Point(0, 0), new Point(10, 0)).getIntersection(new Line(new Point(0,10), new Point(10,10))) === false);
        log(new Line(new Point(0, 0), new Point(0, 10)).getIntersection(new Line(new Point(5,10), new Point(10,10))).equals(new Point(0, 10)));
        log(new Line(new Point(0, 0), new Point(10, 10)).getIntersection(new Line(new Point(0, 0), new Point(10,10))) === false);
        log(new Line(new Point(0, 0), new Point(10, 10)).getIntersection(new Line(new Point(0, 20), new Point(1,19))).equals(new Point(10, 10)));
        // equals
        log(new Line(new Point(-66, 76), new Point(135, -20)).equals(new Line(new Point(1, 44), new Point(68, 12))));
        // name
        log(new Line(new Point(-66, 76), new Point(135, -20)).name() === 'Line');
    // Point
        // moveTo
        log(A.moveTo(9, 9).toString() === '(9, 9)');
        // move
        log(A.move(1, 1).toString() === '(4, 4)');
        log(A.move(-1, -1).toString() === '(2, 2)');
        // equals
        log(A.equals(A));
        log(A.move(3, 3).equals(A.move(3, 3)));
        // name
        log(A.name() === 'Point');
    // Polygon
        // name
        log(new Polygon(new Point(48,84), new Point(86,65), new Point(29,43), new Point(64,48), new Point(68,41)).name() === 'Polygon');
    // Quadrilateral
        // getArea
        // name
        log(new Quadrilateral(new Point(48,84), new Point(86,65), new Point(64,48), new Point(29,43)).name() === 'Quadrilateral');
    // Rect
        // name
        log(new Rect(new Point(48,84), new Point(64,48)).name() === 'Rect');
    // Segment
        // move
        log(SegAB.move(31,19).equals(new Segment(A.move(31, 19), B.move(31, 19))));
        // has
        log(SegAB.has(A) === true);
        log(SegAB.has(B) === true);
        log(SegAB.has(C) === false);
        log(SegAB.has(D) === true);
        // intersects
        log(new Segment(new Point(48,84), new Point(86,65)).intersects(new Segment(new Point(64,48), new Point(29,43))) === false);
        log(new Segment(new Point(48,84), new Point(64,48)).intersects(new Segment(new Point(86,65), new Point(29,43))) === true);
        // toLine
        log(new Segment(new Point(48,84), new Point(86,65)).toLine().toString() === '-x-2y+216=0');
        // equals
        log(new Segment(new Point(48,84), new Point(64,48)).equals(new Segment(new Point(48,84), new Point(64,48))));
        // name
        log(SegAB.name() === 'Segment');
    // Text_
        // name
        log(new Text_('Text', new Point(3, 3)).name() === 'Text');
    // Triangle
        // getCircumcircle
        var EquilateralTriangle = new Triangle(new Point(0, 0), new Point(30, 0), new Point(30 * Math.cos(Math.PI*(1/3)), 30 * Math.sin(Math.PI*(1/3))));
        // getIncircle
        log(EquilateralTriangle.getIncircle().equals(new Circle(new Point(15, 30 * (1/Math.sqrt(3)) *Math.sin(Math.PI*(1/6))), 5 * Math.sqrt(3))));
        // getArea
        log(EquilateralTriangle.getArea() === 30 * 30 * (Math.sqrt(3) / 4));
        // name
        log(EquilateralTriangle.name() === 'Triangle');
    // Vector
        // add
        log(new Vector(A.x - B.x, A.y - B.y).add(new Vector(C.x - D.x, C.y - D.y)).equals(new Vector(6, 7)));
        log(new Vector(3, 4).add(new Vector(-10, 7)).equals(new Vector(-7, 11)));
        // minus
        log(new Vector(A.x, A.y).minus(new Vector(B.x, B.y)).equals(new Vector(A.x - B.x, A.y - B.y)));
        // product
        log(new Vector(3, 3).product(new Vector(-3, 3)) === 0);
        log(new Vector(1, 3).product(new Vector(7, 10)) === 37);
        // multiple
        log(new Vector(48, 84).multiple(86).equals(new Vector(4128, 7224)));
        // abs
        log(new Vector(48, 84).abs() === Math.sqrt(48*48 + 84*84));
        // equals
        log(new Vector(B.x - A.x, B.y - A.y).equals(new Vector(-3, -3)));
        // move
        log(new Vector(48, 84).move(7, 79).equals(new Vector(55, 163)));
        // name
        log(new Vector(48, 84).name() === 'Vector');


    console.log(log.fail);
})((this || 0).self || global);
