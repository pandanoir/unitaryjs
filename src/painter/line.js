export default function(obj) {
    const S = Unitary.Segment, P = Unitary.Point;
    const width = this.canvasWidth, height = this.canvasHeight;

    const leftBorder = new S(new P(0, 0), new P(0, height));
    const rightBorder = new S(new P(width, 0), new P(width, height));
    const topBorder = new S(new P(0, 0), new P(width, 0));
    const bottomBorder = new S(new P(0, height), new P(width, height));

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
        this.canvas.stroke();
    }
};
