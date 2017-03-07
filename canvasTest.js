const {BezierCurve,Circle, CircularSector, Curve, Donut, Ellipse, Graph, Group, Image: Image_, Line, Point, Polygon, Quadrilateral, Rect, Segment, Text: Text_, Triangle, XAxis, YAxis} = Unitary;

const canvases = {};
for (const name of ['bezier', 'circle', 'circularSector', 'curve', 'donut', 'ellipse', 'graph', 'group', 'image', 'image2', 'line', 'point', 'polygon', 'polygon2', 'quadrilateral', 'rect', 'segment', 'text', 'triangle']) {
    canvases[name] = new Canvas(name);
}

canvases.bezier.add(
    new BezierCurve(new Point(10, 10), new Point(30, 90), new Point(70, 90), new Point(90, 10)).setLineDash([5, 8]),
    new BezierCurve(new Point(10, 10), new Point(50, 90), new Point(90, 10)),
    new BezierCurve(new Point(10, 10), new Point(10, 90), new Point(50, 90), new Point(90, 90), new Point(90, 180)).setLineDash([5, 8])
);
// ====================

canvases.circle.add(
    new Circle(new Point(30, 30), 30),
    new Circle(new Point(60, 90), 20).setFillColor('red').setLineDash([5, 9])
);
// ====================

canvases.circularSector.listen('click');
canvases.circularSector.add(
    new CircularSector(new Point(30, 30), 30, Math.PI / 2).on('click', () => console.log('click')),
    new CircularSector(new Point(30, 30), 30, Math.PI / 2 * 3).move(50, 30).setFillColor('red'),
    new CircularSector(new Point(30, 30), 30, Math.PI / 2 * 3).setAnticlockwise(true).move(100, 30).setFillColor('blue')
);
// ====================

{
    const scale = 10;
    const a = 3;
    const r = 0.5;
    const cos = Math.cos.bind(Math), sin = Math.sin.bind(Math);
    canvases.curve.origin = new Point(100, 100);
    canvases.curve.add(
        XAxis,
        YAxis,
        new Curve(theta => a * (1 + cos(theta)) * cos(theta), theta => a * (1 + cos(theta)) * sin(theta), scale),
        new Curve(theta => r * cos(theta) * theta, theta => r * sin(theta) * theta, scale).setRange(0, 8 * Math.PI),
        new Text_('1', new Point(scale, 6)),
        new Rect(new Point(scale, 0), new Point(scale - 1, 5)).setStrokeColor('transparent').setFillColor('#000'),
        new Text_('1', new Point(6, scale)),
        new Rect(new Point(0, scale), new Point(5, scale - 1)).setStrokeColor('transparent').setFillColor('#000')
    );
}
// ====================

canvases.donut.add(
    new Donut(new Point(50, 50), 30, 40),
    new Donut(new Point(50, 50), 30, 40).moveX(40, 0).setFillColor('red'),
    new Donut(new Point(50, 50), 30, 40).moveX(20, 0).setFillColor('blue')
);
// ====================
const ellipse1 = new Ellipse(new Point(50, 50), 30, 40).rotate(1/2 * Math.PI).setStrokeColor('blue');
const ellipse2 = new Ellipse(new Point(50, 50), 30, 40).move(0, 30).rotate(1/2 * Math.PI);
const ellipse3 = new Ellipse(new Point(50, 50), 40, 30).move(30, 0).setFillColor('yellow');
const ellipse4 = new Ellipse(new Point(50, 50), 40, 40).move(30, 30).setFillColor('red');
canvases.ellipse.add(
    new Donut(new Point(130, 50), 20, 30),
    ellipse1, ellipse2, ellipse3, ellipse4,
    new Donut(new Point(130, 130), 20, 30)
    );
// ====================

canvases.graph.add(
    new Graph(x => x * x, 30),
    new Graph(x => Math.log(x), 30),
    new Text_('1', new Point(27, 6)),
    new Rect(new Point(30, 0), new Point(29, 5)).setStrokeColor('transparent').setFillColor('#000'),
    new Text_('1', new Point(6, 26)),
    new Rect(new Point(0, 30), new Point(5, 29)).setStrokeColor('transparent').setFillColor('#000')
);
// ====================

const starTriangle = new Triangle(new Point(0, 0), new Point(30, 0), new Point(15, 15 * Math.sqrt(3)));
const star = new Group(starTriangle.move(30, 30), starTriangle.move(30, 30).rotate(Math.PI));
const images = new Group([
    new Image_('logo.png', new Point(0, 180)),
    new Image_('logo.png', new Point(20, 160))
]);
canvases.group.add(star, images);
// ====================

const logoImage = new Image_('logo.png', new Point(0, 0)),
    logoText = new Text_('Logo', new Point(0, 0)).setFillColor('#fff').setFont('50px bold').setBaseline('top'),
    logoTextBackground = new Rect(new Point(0, 0),new Point(140, 60)).setFillColor('#c00');

canvases.image.mode = 'normal';
canvases.image.add(logoImage, logoTextBackground, logoText);
// ====================

canvases.image2.mode = 'normal';
canvases.image2.add(logoTextBackground, logoText, logoImage);
// ====================

canvases.line.add(
    new Line(new Point(0, 0), new Point(30, 30)),
    new Line(new Point(0, 50), new Point(10, 50)).setStrokeColor('green').setLineDash([15, 5]),
    new Line(new Point(50, 50), new Point(50, 0)).setStrokeColor('blue').setLineWidth(3),
    new Line(new Point(30, 50), new Point(50, 30)).setStrokeColor('red')
);
// ====================

canvases.point.add(
    new Line(new Point(30, 30), new Point(50, 50)),
    new Point(30, 30).setFillColor('#f00'),
    new Point(50, 30).setFillColor('#f00')
);
// ====================

canvases.polygon.add(new Polygon(new Point(10, 10), new Point(10, 50), new Point(30, 30), new Point(100, 10), new Point(50, 0)).on('click', () => {
    canvases.polygon.clear();
    canvases.polygon.objects[0] = canvases.polygon.objects[0].setFillColor('black');
    canvases.polygon.draw();
    setTimeout(() => {
        canvases.polygon.clear();
        canvases.polygon.objects[0] = canvases.polygon.objects[0].setFillColor('white');
        canvases.polygon.draw();
    }, 100);
}));
// ====================

canvases.polygon2.add(new Polygon(new Point(10, 10), new Point(30, 30), new Point(100, 10), new Point(50, 0), new Point(10, 50)));
// ====================

const quadrilateral = new Quadrilateral(new Point(70, 19), new Point(40, 50), new Point(70, 90), new Point(120, 50));

canvases.quadrilateral.add(
    new Quadrilateral(new Point(10, 10), new Point(10, 50), new Point(30, 30), new Point(100, 10)),
    quadrilateral,
    quadrilateral.move(30, 0),
    quadrilateral.move(0, 50)
);
// ====================

canvases.rect.add(
    new Rect(new Point(10, 10), new Point(100, 40)),
    new Rect(new Point(20, 50), new Point(110, 80)).setFillColor('#000')
);
// ====================

canvases.segment.add(
    new Line(new Point(0, 0), new Point(30, 30)),
    new Line(new Point(0, 50), new Point(10, 50)),
    new Line(new Point(50, 50), new Point(50, 0)),
    new Line(new Point(30, 50), new Point(50, 30))
);

canvases.segment.add(
    new Segment(new Point(0, 0), new Point(30, 30)).setStrokeColor('#f00'),
    new Segment(new Point(0, 50), new Point(10, 50)).setStrokeColor('#f00'),
    new Segment(new Point(50, 50), new Point(50, 0)).setStrokeColor('#f00'),
    new Segment(new Point(30, 50), new Point(50, 30)).setStrokeColor('#f00')
);
// ====================

canvases.text.ready.then(() => {
    const size = canvases.text.canvas.measureText('あ').width;
    canvases.text.mode = 'normal';
    const wagahaiText = '吾輩は猫である。名前はまだ無い。\n' +
        'どこで生れたかとんと見当がつかぬ。\n' +
        '何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。\n' +
        '吾輩はここで始めて人間というものを見た。\n' +
        'しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。\n' +
        'この書生というのは時々我々を捕えて煮て食うという話である。\n' +
        'しかしその当時は何という考もなかったから別段恐しいとも思わなかった。\n' +
        'ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。';
    const splitWagahai = wagahaiText.split('\n');
    for (let i = 0, _i = splitWagahai.length; i < _i; i++) {
        canvases.text.add(new Text_(splitWagahai[i], new Point(0, size * i)).setBaseline('top'));
    }
    canvases.text.draw();
});
// ====================

const triangle = new Triangle(new Point(10, 10), new Point(100, 40), new Point(50, 60));
canvases.triangle.add(
    triangle,
    triangle.getCircumcircle(),
    triangle.getIncircle(),
    triangle.move(40, 60).setFillColor('#f90')
);
// ====================

for (const canvas of Object.values(canvases)) {
    canvas.draw();
}
