
import { SpacecraftShape } from "./SpacecraftShape.js";
import { Vector2D } from "./Vector2D.js";
import { color } from "./start.js";


export class Spacecraft {
    private _gElement: SVGGElement = document.createElementNS("http://www.w3.org/2000/svg", "g")
    private _type: string;
    private _color: string;
    private _id: string
    private direction = 0;
    private _maneuverability = 2
    private _impuls = new Vector2D();
    private _location = new Vector2D();
    

    constructor() {
        this._type = "rocket"
        this._color = "flün"
        this._id = "spacecraft"
        
    }

    accelerate(thrust: number) {
        let vector = Vector2D.fromLengthAndAngle(thrust, this.direction);
        this._impuls.add(vector);
    }

    brake(dampingFactor: number): void {
        // Verringere die Geschwindigkeit um den Dämpfungsfaktor
        const newLength = this._impuls.length * (1-dampingFactor)
        this._impuls = Vector2D.fromLengthAndAngle(newLength, this._impuls.angle)
        
        // this._impuls.add(new Vector(.5, this.direction.angle))
        // Optional: Stoppe die Bewegung vollständig, wenn die Geschwindigkeit einen bestimmten Schwellenwert unterschreitet
         if (this._impuls.length < 0.01) {
            console.log("stop completely")
            this._impuls = new Vector2D(0, 0);
        }
    }

    rotate(angle: number){
        this.direction += angle
        this.direction = (this.direction%360+360)%360
    }

    get location(): Vector2D{
        return this._location
    }

    set location(location: Vector2D) {
        this._location = location
    }

    get type(): string{
        return this._type
    }

    set type(type: string) {
        this._type = type
    }

    get color(): string{
        return this._color
    }

    set color(color: string) {
        this._color = color
    }

    get id(): string{
        return this._id
    }

    set id(id: string) {
        this._id = id
    }
    
    get gElement(): SVGGElement{
        return(this._gElement)
    }

    set gElement(g:SVGGElement){
        this._gElement = g
    }

    handleKeyboardInput(keysPressed: {[key: string]: boolean}) {
        if (keysPressed['ArrowLeft']) {
            this.rotate(-this._maneuverability);
        }
        
        if (keysPressed['ArrowRight']) {
            this.rotate(this._maneuverability);
        }
        
        if (keysPressed['ArrowUp']) {
            this.accelerate(this._maneuverability/100);
        }

        if (keysPressed['ArrowDown']) {
            this.brake(this._maneuverability/100);
        }
        
    }

    update() {
        this._location.add(this._impuls);
        this.gElement.setAttribute("transform", `translate (${this._location.x} ${this._location.y}) rotate (${this.direction + 90} ) `)
    }

    // Convert Spacecraft object to JSON representation
    toJSON(): Record<string, any> {
        console.log()
        return {
            _type: this._type,
            direction: this.direction,
            _impuls: this._impuls.toJSON(),
            _location: this._location.toJSON(),
            id: this.id,
            lastUpdate: Date.now()

        };
    }

    // Create a Spacecraft object from a JSON representation
    static fromJSON(json: Record<string, any>): Spacecraft {
        const spacecraft = new Spacecraft(); 
        spacecraft.type = json._type
        spacecraft.color = json.color
        spacecraft.id = json.id
        spacecraft.direction = json.direction;
        // Assuming Vector2D class has a fromJSON method
        spacecraft._impuls = Vector2D.fromJSON(json._impuls);
        spacecraft._location = new Vector2D //json._location returns undefined
        spacecraft._gElement = SpacecraftShape.getCraftGElement(spacecraft.type)
        return spacecraft;
    }

    // Update spacecraft properties from another spacecraft object
    updateFrom(other: Spacecraft) {
        this.direction = other.direction;
        this._impuls = other._impuls;
        this._location = other._location;
    }
}
