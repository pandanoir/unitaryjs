export default function(obj) {
    const center = obj.center,
          innerRadius = obj.innerRadius,
          outerRadius = obj.outerRadius;
    this.canvas.beginPath();
    this.canvas.arc(this.X(center.x), this.Y(center.y), outerRadius, 0, 2 * Math.PI, false);
    this.canvas.stroke();

    this.canvas.beginPath();
    this.canvas.arc(this.X(center.x), this.Y(center.y), innerRadius, 0, 2 * Math.PI, true);
    this.canvas.stroke();
    if (obj.style.fillColor !== null) {
        this.canvas.beginPath();
        this.canvas.arc(this.X(center.x), this.Y(center.y), outerRadius, 0, 2 * Math.PI, false);
        this.canvas.arc(this.X(center.x), this.Y(center.y), innerRadius, 0, 2 * Math.PI, true);
        this.canvas.fill();
    }
};
