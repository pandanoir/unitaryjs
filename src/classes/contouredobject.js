import UnitaryObject from './unitaryobject.js';
export default class ContouredObject extends UnitaryObject {
    constructor() {
        super();
        this.lineDash = [];
        this.lineCap = 'butt';
        this.lineDashOffset = 0;
        this.lineJoin = 'miter';
        this.lineWidth = 1;
    }
    getLineDash() { return this.lineDash; }
    setLineDash(lineDash) { this.lineDash = lineDash; return this; }

    getLineCap() { return this.lineCap; }
    setLineCap(lineCap) { this.lineCap = lineCap; return this; }

    getLineDashOffset() { return this.lineDashOffset; }
    setLineDashOffset(lineDashOffset) { this.lineDashOffset = lineDashOffset; return this; }

    getLineJoin() { return this.lineJoin; }
    setLineJoin(lineJoin) { this.lineJoin = lineJoin; return this; }

    getLineWidth() { return this.lineWidth; }
    setLineWidth(lineWidth) { this.lineWidth = lineWidth; return this; }

    name() { return 'ContouredObject'; }
}
