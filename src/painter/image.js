export default function(obj) {
    const image = obj.__image__;
    if (obj.dx !== null && obj.sx !== null) this.canvas.drawImage(image, obj.sx, obj.sy, obj.sw, obj.sh, this.X(obj.dx), this.Y(obj.dy), obj.dw, obj.dh);
    else if (obj.dx !== null && obj.sx === null && obj.dw !== null) this.canvas.drawImage(image, this.X(obj.dx), this.Y(obj.dy), obj.dw, obj.dh);
    else if (obj.dx !== null && obj.dw === null) {
        // obj.sx !== null ならば必ず obj.dw !== nullとなるから、
        // 対偶をとり obj.dw === nullならばobj.sx === null
        this.canvas.drawImage(image, this.X(obj.dx), this.Y(obj.dy));
    } else if (obj.dx === null) this.canvas.drawImage(image);
};
