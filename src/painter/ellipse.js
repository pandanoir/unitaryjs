export default function(obj) {
    const {center, a, b} = obj;
    this.canvas.beginPath();
    if (this.canvas.ellipse) {
        this.canvas.ellipse(this.X(center.x), this.Y(center.y), obj.a, obj.b, obj.angle, 0, 2 * Math.PI, obj.anticlockwise);
        if (obj.style.fillStyle !== null) this.canvas.fill();
        this.canvas.stroke();
    } else {
        this.canvas.save();
        this.canvas.setTransform(1, 0, 0, 1, 0, 0);
        this.canvas.translate(this.X(center.x),this.Y(center.y));
        this.canvas.rotate(obj.angle);
        this.canvas.scale(1, obj.b);
        this.canvas.arc(this.X(center.x), this.Y(center.y), obj.a, 0, 2 * Math.PI, obj.anticlockwise);
        if (obj.style.fillStyle !== null) this.canvas.fill();
        this.canvas.stroke();
        this.canvas.restore();
    }
};
