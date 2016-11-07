export default function(obj) {
    const leftBorder = new Unitary.Segment(new Unitary.Point(0, 0), new Unitary.Point(0, this.canvasHeight));
    const rightBorder = new Unitary.Segment(new Unitary.Point(this.canvasWidth, 0), new Unitary.Point(this.canvasWidth, this.canvasHeight));
    const topBorder = new Unitary.Segment(new Unitary.Point(0, 0), new Unitary.Point(this.canvasWidth, 0));
    const bottomBorder = new Unitary.Segment(new Unitary.Point(0, this.canvasHeight), new Unitary.Point(this.canvasWidth, this.canvasHeight));

    let leftEndPoint = null, rightEndPoint = null;
    if (leftBorder.intersects(obj)) leftEndPoint = leftBorder.toLine().getIntersection(obj);
    if (rightBorder.intersects(obj)) rightEndPoint = rightBorder.toLine().getIntersection(obj);

    if (topBorder.intersects(obj) && bottomBorder.intersects(obj)) {
        const inter1 = topBorder.toLine().getIntersection(obj);
        const inter2 = bottomBorder.toLine().getIntersection(obj);
        if (inter1.x > inter2.x) {
            leftEndPoint = inter1;
            rightEndPoint = inter2;
        } else {
            leftEndPoint = inter2;
            rightEndPoint = inter1;
        }
    } else if (topBorder.intersects(obj) && !bottomBorder.intersects(obj)) {
        const inter = topBorder.toLine().getIntersection(obj);
        if (leftEndPoint == null) {
            leftEndPoint = inter;
        } else {
            rightEndPoint = inter;
        }
    } else if (!topBorder.intersects(obj) && bottomBorder.intersects(obj)) {
        const inter = bottomBorder.toLine().getIntersection(obj);
        if (rightEndPoint == null) {
            rightEndPoint = inter;
        } else {
            leftEndPoint = inter;
        }
    }

    if (leftEndPoint != null && rightEndPoint != null) {
        this.canvas.beginPath();
        this.canvas.moveTo(this.X(leftEndPoint.x), this.Y(leftEndPoint.y));
        this.canvas.lineTo(this.X(rightEndPoint.x), this.Y(rightEndPoint.y));
        this.canvas.closePath();
        this.canvas.stroke();
    }
};
