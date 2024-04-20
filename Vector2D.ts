export class Vector2D{
    private _x;
    private _y;
    private _length = 0;
    private _angle = 0;

    constructor(x: number = 0, y: number = 0){
        this._x = x;
        this._y = y;

        if(x != 0 || y != 0){
            this._length = Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2))
            this._angle = Math.atan2(this._y, this._x)
        }

    }

    static fromLengthAndAngle(length: number, angle: number): Vector2D { //get angle in degree
        if (angle >= 360 || angle < 0) {
            angle = ((angle % 360) + 360) % 360; //ensure 0 < angle < 360
        }
        const x = Math.cos(angle) * length
        const y = Math.sin(angle) * length

        return new Vector2D(x, y);
      }
    
    add(vector: Vector2D):void{
        this._x += vector._x
        this._y += vector._y

    }

    get length(){
        return(this._length)
    }
    
    get angle(){
        return(this._angle)
    }

}