export class Vector2D{
    private _x;
    private _y;
    // properties length and angle are rather unused - might be deleted
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
        angle = angle/180*Math.PI
        const x = Math.cos(angle) * length
        const y = Math.sin(angle) * length

        return new Vector2D(x, y);
      }
    
    add(vector: Vector2D):void{
        this._x += vector._x
        this._y += vector._y
    }

    get length(){
        return(Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2)))
    }
    
    get angle(){
        return(Math.atan2(this._y, this._x)/Math.PI*180)
    }

    get x(): number{
        return this._x
    }

    get y(): number{
        return this._y
    }

    // Create a Vector2D object from a JSON representation
    static fromJSON(json: Record<string, number>): Vector2D {
        return new Vector2D(json.x, json.y);
    }
    
    // Convert Vector2D object to JSON representation
    toJSON(): Record<string, number> {
        return { x: this._x, 
                y: this._y };
    }
}