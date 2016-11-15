export default function(obj) {
    const x = this.X(obj.points[0].x);
    const y = this.Y(obj.points[0].y);
    const w = obj.points[1].x - obj.points[0].x;
    let h = obj.points[1].y - obj.points[0].y;
    if (this.mode !== 'normal') {
        h = - (obj.points[1].y - obj.points[0].y); // 左下を原点として扱っているからマイナスしないと計算があわない
    }
    if (obj.style.fillStyle !== null) this.canvas.fillRect(x, y, w, h); // 上でそれぞれX()、Y()適用済み
    else this.canvas.strokeRect(x, y, w, h);
};
