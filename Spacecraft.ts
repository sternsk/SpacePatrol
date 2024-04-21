import { KeyboardController } from "./KeyboardController.js";
import { Vector2D } from "./Vector2D.js";


export class Spacecraft {
    private _gElement: SVGGElement = document.createElementNS("http://www.w3.org/2000/svg", "g")
    private _type: string;
    private direction = 0;
    private _maneuverability = 2
    private _impuls = new Vector2D();
    private location = new Vector2D();
    id: string;

    constructor(_type: string, color: string, id: string) {
        this.id = id;
        this._type = _type;
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
            this._impuls = new Vector2D(0, 0);
        }
    }

    rotate(angle: number){
        this.direction += angle
    }

    get type(): string{
        return this._type
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
        
        // console.log(keysPressed);
        // Weitere Tastenabfragen...
    }

    update() {
        this.location.add(this._impuls);
    }

    // Convert Spacecraft object to JSON representation
    toJSON(): Record<string, any> {
        return {
            _type: this._type,
            direction: this.direction,
            _impuls: this._impuls.toJSON(),
            location: this.location.toJSON(),
            id: this.id
        };
    }

    // Create a Spacecraft object from a JSON representation
    static fromJSON(json: Record<string, any>): Spacecraft {
        const spacecraft = new Spacecraft(json._type, "", json.id); // Assuming color is not necessary for reconstruction
        spacecraft.direction = json.direction;
        // Assuming Vector2D class has a fromJSON method
        spacecraft._impuls = Vector2D.fromJSON(json._impuls);
        spacecraft.location = Vector2D.fromJSON(json.location);
        return spacecraft;
    }

    // Update spacecraft properties from another spacecraft object
    updateFrom(other: Spacecraft) {
        this.direction = other.direction;
        this._impuls = other._impuls;
        this.location = other.location;
    }
}
