import UnitaryObject from './unitaryobjcet.js';

class BaseVector extends UnitaryObject {
    constructor(...args) {
        super();
        if (args.length === 1 && Array.isArray(args[0])) {
            this.component = new Array(args[0].length);
            for (let i = 0, _i = args[0].length; i < _i; i = 0|i+1) {
                this.component[i] = args[0][i];
            }
        } else {
            this.component = new Array(args.length);
            for (let i = 0, _i = args.length; i < _i; i = 0|i+1) {
                this.component[i] = args[i];
            }
        }
    }
    add(CD) {
        if (this.component.length !== CD.component.length) {
            throw new Error('dimention of each vector are different.');
        }
        const component = new Array(this.component.length);
        for (let i = 0, _i = this.component.length; i < _i; i = 0|i+1) {
            component[i] = this.component[i] + CD.component[i];
        }
        return new BaseVector(component);
    }
    substract(CD) {
        return this.add(CD.multiple(-1));
    }
    product(CD) {
        if (this.component.length !== CD.component.length) {
            throw new Error('dimention of each vector are different.');
        }
        let product = 0;
        for (let i = 0, _i = this.component.length; i < _i; i = 0|i+1) {
            product += this.component[i] * CD.component[i];
        }
        return product;
    }
    multiple(k) {
        const component = new Array(this.component.length);
        for (let i = 0, _i = this.component.length; i < _i; i = 0|i+1 ) {
            component[i] = k * this.component[i];
        }
        return new BaseVector(component);
    }
    abs() {
        let res = 0;
        for (let i = 0, _i = this.component.length; i < _i; i = 0|i+1) {
            res += this.component[i] * this.component[i];
        }
        return Math.sqrt(res);
    }
    normalize() {
        return this.multiple(1 / this.abs());
    }
    equals(B) {
        if (this.component.length !== B.component.length) {
            return false;
        }
        for (let i = 0, _i = this.component.length; i < _i; i = 0|i+1) {
            if (this.component[i] !== B.component[i]) {
                return false;
            }
        }
        return true;
    }
    move(...component) {
        return this.add(new BaseVector(component));
    }
    name() { return 'BaseVector'; }
}
class Vector extends BaseVector{
    constructor(...args) {
        if (args.length === 2) {
            super(args[0], args[1]);
            this.x = args[0];
            this.y = args[1];
        } else if (args.length === 1) {
            super(args[0].x, args[0].y);
            this.x = args[0].x;
            this.y = args[0].y;
        }
    }
    add(CD) {
        const newVector = super.add(CD);
        return new Vector(newVector.component[0], newVector.component[1]);
    }
    substract(CD) {
        const newVector = super.substract(CD);
        return new Vector(newVector.component[0], newVector.component[1]);
    }
    multiple(k) {
        const newVector = super.multiple(k);
        return new Vector(newVector.component[0], newVector.component[1]);
    }
    equals(B) {
        if (!super.equals(B)) {
            return false;
        }
        return this.x === B.x && this.y === B.y;
    }
    move(dx, dy) { return new Vector(this.x + dx, this.y + dy); }
    name() { return 'Vector'; }
}
class Vector3D extends BaseVector{
    constructor(...args) {
        if (args.length === 3) {
            super(args[0], args[1], args[2]);
            this.x = args[0];
            this.y = args[1];
            this.z = args[2];
        } else if (args.length === 1) {
            super(args[0].x, args[0].y, args[0].z);
            this.x = args[0].x;
            this.y = args[0].y;
            this.z = args[0].z;
        }
    }
    add(CD) {
        const newVector = super.add(CD);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    }
    substract(CD) {
        const newVector = super.substract(CD);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    }
    multiple(k) {
        const newVector = super.multiple(k);
        return new Vector3D(newVector.component[0], newVector.component[1], newVector.component[2]);
    }
    move(dx, dy, dz) { return new Vector3D(this.x + dx, this.y + dy, this.z + dz); }
    name() { return 'Vector3D'; }
}

export { BaseVector, Vector, Vector3D };
