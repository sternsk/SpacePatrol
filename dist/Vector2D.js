export class Vector2D {
    _x;
    _y;
    // properties length and angle are rather unused - might be deleted
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
        angle = angle / 180 * Math.PI;
        const x = Math.cos(angle) * length;
        const y = Math.sin(angle) * length;
        return new Vector2D(x, y);
    }
    add(vector) {
        this._x += vector.x;
        this._y += vector.y;
    }
    distanceTo(destination) {
        let distanceVector = new Vector2D(destination.x - this._x, destination.y - this._y);
        return (distanceVector.length);
    }
    inverse() {
        this._x = -this._x;
        this._y = -this._y;
    }
    get length() {
        return (Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2)));
    }
    get angle() {
        return (Math.atan2(this._y, this._x) / Math.PI * 180);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(x) {
        this._x = x;
    }
    set y(y) {
        this._y = y;
    }
    // Create a Vector2D object from a JSON representation
    static fromJSON(json) {
        return new Vector2D(json.x, json.y);
    }
    // Convert Vector2D object to JSON representation
    toJSON() {
        return { x: this._x,
            y: this._y };
    }
}
