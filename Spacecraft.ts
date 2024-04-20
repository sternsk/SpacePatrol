import { Vector2D } from "./Vector2D.js"

export class Spacecraft {
    
    private type: string
    private direction = 0
    private impuls = new Vector2D
    private location = new Vector2D
    private _id: string

    constructor(type: string, color: string, id: string){
        this._id = id  
        this.type = type
    }

    accelerate(thrust: number){
        let vector = Vector2D.fromLengthAndAngle(thrust, this.direction)
        this.impuls.add(vector)
    }

    update(){
        this.location.add(this.impuls)
    }

    get id(): string{
        return this._id
    }

    

}