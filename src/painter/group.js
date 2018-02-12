export default function(obj) {
    const groupStyle = {};
    const lineProps = ['Cap', 'Dash', 'DashOffset', 'Join', 'Width'];

    groupStyle.fillStyle = obj.style.fillStyle;
    groupStyle.strokeStyle = obj.style.strokeStyle;

    for (let i = 0, _i = lineProps.length; i < _i; i++) {
        const p = lineProps[i];
        if (obj[`getLine${p}`] && obj[`getLine${p}`]() !== null)
            groupStyle[p] = obj[p]();
    }
    for (let i = 0, _i = obj.group.length; i < _i; i = 0|i+1) {
        // this method sets strokeStyle and fillStyle.
        let _obj = obj.group[i];
        const NULL = [];
        let before = {
            fillStyle: NULL,
            strokeStyle: NULL,
        };

        if (!_obj.style || _obj.style.fillStyle === null) {
            before.fillStyle = _obj.style.fillStyle;
            _obj.style.fillStyle = groupStyle.fillStyle;
        }
        if (!_obj.style || _obj.style.strokeStyle === null) {
            before.strokeStyle = _obj.style.strokeStyle;
            _obj.style.strokeStyle = groupStyle.strokeStyle;
        }
        // for (let i = 0, _i = lineProps.length; i < _i; i++) {
        //     const p = lineProps[i];
        //     if ((!_obj[`getLine${p}`] || _obj[`getLine${p}`]() === null) && groupStyle[p] != null) {
        //         before[p] = _obj[`getLine${p}`]();
        //         _obj[`setLine${p}`](groupStyle[p]);
        //     } else before[p] = NULL;
        // }
        //
        this.__drawHelper__(_obj);
        if (before.fillStyle !== NULL) _obj.style.fillStyle = before.fillStyle;
        if (before.strokeStyle !== NULL) _obj.style.fillStyle = before.fillStyle;
        for (let i = 0, _i = lineProps.length; i < _i; i++) {
            const p = lineProps[i];
            if (before[p] !== NULL) {
                _obj[`setLine${p}`](before[p]);
            }
        }
    }
};
