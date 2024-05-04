
import { SpacecraftShape } from "./SpacecraftShape.js";
import { Vector2D } from "./Vector2D.js";
import { color } from "./start.js";


export class Spacecraft {
    private _gElement: SVGGElement = document.createElementNS("http://www.w3.org/2000/svg", "g")
    private _type: string;
    private _color: string;
    private _id: string
    private _direction = 0;
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
        
        // Optional: Stoppe die Bewegung vollständig, wenn die Geschwindigkeit einen bestimmten Schwellenwert unterschreitet
         if (this._impuls.length < 0.01) {
            this._impuls = new Vector2D(0, 0);
        }
    }
    
    handleTouchControl(vector: Vector2D){
        this._impuls.add(vector)
        this._direction = vector.angle
    }

    rotate(angle: number){
        this._direction += angle
        this._direction = (this.direction%360+360)%360
    }

    get direction(): number{
        return this._direction
    }

    get impuls(): Vector2D{
        return this._impuls
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
            this.brake(this._maneuverability/10);
        }
        
    }

    update() {
        this._location.add(this._impuls);
        this.gElement.setAttribute("transform", `translate (${this._location.x} ${this._location.y}) rotate (${this.direction + 90} ) `)
    }

    updateFromJSON(json: Record<string, any>): void{
        this._direction = json.direction
        this._impuls = json.impuls
        this._location = json.location
    }

    // Convert Spacecraft object to JSON representation
    toJSON(): Record<string, any> {
        return {
            type: this._type,
            color: this._color,
            id: this._id,
            direction: this._direction,
            impuls: this._impuls.toJSON(),
            location: this._location.toJSON(),
           
            lastUpdate: Date.now()  //apply timestamp each time the vessel is transformed

        };
    }

    // Create a Spacecraft object from a JSON representation
    static fromJSON(json: Record<string, any>): Spacecraft {
        const spacecraft = new Spacecraft()
        spacecraft._type = json.type
        spacecraft._color = json.color
        spacecraft._id = json.id
        
        spacecraft._direction = json.direction;
        spacecraft._impuls = Vector2D.fromJSON(json.impuls);
        spacecraft._location = Vector2D.fromJSON(json.location) 
        
        spacecraft._gElement = SpacecraftShape.getCraftGElement(spacecraft.type)
        return spacecraft;
    }

    // Update spacecraft properties from another spacecraft object
    updateFrom(other: Spacecraft) {
        this._direction = other.direction;
        this._impuls = other._impuls;
        this._location = other._location;
    }
}
