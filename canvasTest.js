const {BezierCurve, Circle, CircularSector, Donut, Graph, Group, Image: Image_, Line, Point, Polygon, Quadrilateral, Rect, Segment, Text: Text_, Triangle} = Unitary;

const canvases = {};
for (const name of ['bezier', 'circle', 'circularSector', 'donut', 'graph', 'group', 'image', 'image2', 'line', 'point', 'polygon', 'polygon2', 'quadrilateral', 'rect', 'segment', 'text', 'triangle']) {
    canvases[name] = new Canvas(name);
}

canvases.bezier.add(new BezierCurve(new Point(10, 10), new Point(30, 90), new Point(70, 90), new Point(90, 10)).setLineDash([5, 8]));
canvases.bezier.add(new BezierCurve(new Point(10, 10), new Point(50, 90), new Point(90, 10)));
canvases.bezier.add(new BezierCurve(new Point(10, 10), new Point(10, 90), new Point(50, 90), new Point(90, 90), new Point(90, 180)).setLineDash([5, 8]));
// ====================

canvases.circle.add(new Circle(new Point(30, 30), 30));
canvases.circle.add(new Circle(new Point(60, 90), 20).setFillColor('red').setLineDash([5, 9]));
// ====================

canvases.circularSector.listen('click');
canvases.circularSector.add(new CircularSector(new Point(30, 30), 30, Math.PI / 2).on('click', () => console.log('click')));
canvases.circularSector.add(new CircularSector(new Point(30, 30), 30, Math.PI / 2 * 3).move(50, 30).setFillColor('red'));
canvases.circularSector.add(new CircularSector(new Point(30, 30), 30, Math.PI / 2 * 3).setAnticlockwise(true).move(100, 30).setFillColor('blue'));
// ====================

canvases.donut.add(new Donut(new Point(50, 50), 30, 40));
canvases.donut.add(new Donut(new Point(50, 50), 30, 40).moveX(40, 0).setFillColor('red'));
canvases.donut.add(new Donut(new Point(50, 50), 30, 40).moveX(20, 0).setFillColor('blue'));
// ====================

canvases.graph.add(new Graph(x => x * x, 30));
canvases.graph.add(new Graph(x => Math.log(x), 30));
canvases.graph.add(new Text_('1', new Point(27, 6)));
canvases.graph.add(new Rect(new Point(30, 0), new Point(29, 5)).setStrokeColor('transparent').setFillColor('#000'));
canvases.graph.add(new Text_('1', new Point(6, 26)));
canvases.graph.add(new Rect(new Point(0, 30), new Point(5, 29)).setStrokeColor('transparent').setFillColor('#000'));
// ====================

const starTriangle = new Triangle(new Point(0, 0), new Point(30, 0), new Point(15, 15 * Math.sqrt(3)));
const star = new Group(starTriangle.move(30, 30), starTriangle.move(30, 30).rotate(Math.PI));
const images = new Group([
    new Image_('logo.png', new Point(0, 180)),
    new Image_('logo.png', new Point(20, 160))
]);
canvases.group.add(star);
canvases.group.add(images);
// ====================

const logoImage = new Image_('logo.png', new Point(0, 0)),
    logoText = new Text_('Logo', new Point(0, 0)).setFillColor('#fff').setFont('50px bold').setBaseline('top'),
    logoTextBackground = new Rect(new Point(0, 0),new Point(140, 60)).setFillColor('#c00');

canvases.image.mode = 'normal';
canvases.image.add(logoImage);
canvases.image.add(logoTextBackground);
canvases.image.add(logoText);
// ====================

canvases.image2.mode = 'normal';
canvases.image2.add(logoTextBackground);
canvases.image2.add(logoText);
canvases.image2.add(logoImage);
// ====================

canvases.line.add(new Line(new Point(0, 0), new Point(30, 30)));
canvases.line.add(new Line(new Point(0, 50), new Point(10, 50)).setStrokeColor('green').setLineDash([15, 5]));
canvases.line.add(new Line(new Point(50, 50), new Point(50, 0)).setStrokeColor('blue').setLineWidth(3));
canvases.line.add(new Line(new Point(30, 50), new Point(50, 30)).setStrokeColor('red'));
// ====================

canvases.point.add(new Line(new Point(30, 30), new Point(50, 50)));
canvases.point.add(new Point(30, 30).setFillColor('#f00'));
canvases.point.add(new Point(50, 30).setFillColor('#f00'));
// ====================

canvases.polygon.listen('click');
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

canvases.quadrilateral.add(new Quadrilateral(new Point(10, 10), new Point(10, 50), new Point(30, 30), new Point(100, 10)));
canvases.quadrilateral.add(quadrilateral);
canvases.quadrilateral.add(quadrilateral.move(30, 0));
canvases.quadrilateral.add(quadrilateral.move(0, 50));
// ====================

canvases.rect.add(new Rect(new Point(10, 10), new Point(100, 40)));
canvases.rect.add(new Rect(new Point(20, 50), new Point(110, 80)).setFillColor('#000'));
// ====================

canvases.segment.add(new Line(new Point(0, 0), new Point(30, 30)));
canvases.segment.add(new Line(new Point(0, 50), new Point(10, 50)));
canvases.segment.add(new Line(new Point(50, 50), new Point(50, 0)));
canvases.segment.add(new Line(new Point(30, 50), new Point(50, 30)));

canvases.segment.add(new Segment(new Point(0, 0), new Point(30, 30)).setStrokeColor('#f00'));
canvases.segment.add(new Segment(new Point(0, 50), new Point(10, 50)).setStrokeColor('#f00'));
canvases.segment.add(new Segment(new Point(50, 50), new Point(50, 0)).setStrokeColor('#f00'));
canvases.segment.add(new Segment(new Point(30, 50), new Point(50, 30)).setStrokeColor('#f00'));
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
canvases.triangle.add(triangle);
canvases.triangle.add(triangle.getCircumcircle());
canvases.triangle.add(triangle.getIncircle());
canvases.triangle.add(triangle.move(40, 60).setFillColor('#f90'));
// ====================

for (const canvas of Object.values(canvases)) {
    canvas.draw();
}