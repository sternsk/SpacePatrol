import { Vector2D } from "./Vector2D.js";

export class Spacecraft {
    private type: string;
    private direction = 0;
    private impuls = new Vector2D();
    private location = new Vector2D();
    id: string;

    constructor(type: string, color: string, id: string) {
        this.id = id;
        this.type = type;
    }

    accelerate(thrust: number) {
        let vector = Vector2D.fromLengthAndAngle(thrust, this.direction);
        this.impuls.add(vector);
    }

    update() {
        this.location.add(this.impuls);
    }

    // Convert Spacecraft object to JSON representation
    toJSON(): Record<string, any> {
        return {
            type: this.type,
            direction: this.direction,
            impuls: this.impuls.toJSON(),
            location: this.location.toJSON(),
            id: this.id
        };
    }

    // Create a Spacecraft object from a JSON representation
    static fromJSON(json: Record<string, any>): Spacecraft {
        const spacecraft = new Spacecraft(json.type, "", json.id); // Assuming color is not necessary for reconstruction
        spacecraft.direction = json.direction;
        // Assuming Vector2D class has a fromJSON method
        spacecraft.impuls = Vector2D.fromJSON(json.impuls);
        spacecraft.location = Vector2D.fromJSON(json.location);
        return spacecraft;
    }

    // Update spacecraft properties from another spacecraft object
    updateFrom(other: Spacecraft) {
        this.direction = other.direction;
        this.impuls = other.impuls;
        this.location = other.location;
    }
}
