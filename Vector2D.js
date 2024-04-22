export class Vector2D {
    _x;
    _y;
    _length = 0;
    _angle = 0;
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
        if (x != 0 || y != 0) {
            this._length = Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
            this._angle = Math.atan2(this._y, this._x);
        }
    }
    static fromLengthAndAngle(length, angle) {
        if (angle >= 360 || angle < 0) {
            angle = ((angle % 360) + 360) % 360; //ensure 0 < angle < 360
        }
        const x = Math.cos(angle) * length;
        const y = Math.sin(angle) * length;
        return new Vector2D(x, y);
    }
    add(vector) {
        this._x += vector._x;
        this._y += vector._y;
    }
    get length() {
        return (this._length);
    }
    get angle() {
        return (this._angle);
    }
    // Create a Vector2D object from a JSON representation
    static fromJSON(json) {
        return new Vector2D(json.x, json.y);
    }
    // Convert Vector2D object to JSON representation
    toJSON() {
        return { x: this._x, y: this._y };
    }
}
//# sourceMappingURL=Vector2D.js.map