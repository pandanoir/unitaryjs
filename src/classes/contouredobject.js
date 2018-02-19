import UnitaryObject from './unitaryobject.js';
const props = ['lineDash', 'lineCap', 'lineDashOffset', 'lineJoin', 'lineWidth'];
export default class ContouredObject extends UnitaryObject {
    constructor() {
        super();
        for (let i = 0, _i = props.length; i < _i; i++) {
            this[props[i]] = null;
        }
        this._propsToCopy = this._propsToCopy.concat(['lineDash', 'lineCap', 'lineDashOffset', 'lineJoin', 'lineWidth']);
    }
    name() { return 'ContouredObject'; }
}
for (let i = 0, _i = props.length; i < _i; i++) {
    const capitalized = props[i].replace(/./, s => s.toUpperCase());
    ContouredObject.prototype[`get${capitalized}`] = function() {
        return this[props[i]];
    };
    ContouredObject.prototype[`set${capitalized}`] = function(val) {
        this[props[i]] = val;
        return this;
    };
}
