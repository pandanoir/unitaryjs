export default function(obj) {
    const center = obj.center,
        x = this.X(center.x),
        y = this.Y(center.y),
        innerRadius = obj.innerRadius,
        outerRadius = obj.outerRadius;
    if (obj.style.fillStyle !== null) {
        this.canvas.beginPath();
        this.canvas.arc(x, y, outerRadius, 0, 2 * Math.PI, false);
        this.canvas.arc(x, y, innerRadius, 0, 2 * Math.PI, true);
        this.canvas.fill();
    }

    this.canvas.beginPath();
    this.canvas.arc(x, y, outerRadius, 0, 2 * Math.PI, false);
    this.canvas.stroke();

    this.canvas.beginPath();
    this.canvas.arc(x, y, innerRadius, 0, 2 * Math.PI, true);
    this.canvas.stroke();

};
