import { Spacecraft } from "./Spacecraft.js";
import { GameEnvironment } from "./GameEnvironment.js";
import { ServerSimulator } from "./ServerSimulator.js";
import { SpacecraftShape } from "./SpacecraftShape.js";
import { KeyboardController } from "./KeyboardController.js";

export class SpaceGame {
    private serverSimulator = new ServerSimulator();
    private spacecrafts: Spacecraft[] = [];
    private gameEnvironment: GameEnvironment
    private keyboardController = new KeyboardController

    constructor(gameFrame: HTMLElement) {
        this.gameEnvironment = new GameEnvironment(gameFrame);
    }

    init(type: string, color: string, id: string) {
        const spacecraft = new Spacecraft(type, color, id);
        spacecraft.gElement = SpacecraftShape.getCraftGElement(spacecraft.type)
        spacecraft.gElement.setAttribute("tabindex", "0")
        spacecraft.gElement.focus()
        spacecraft.handleKeyboardInput(this.keyboardController.getKeysPressed())
        this.spacecrafts.push(spacecraft);
        this.gameLoop();
        setInterval(() => {
            this.syncReality();
        }, 1000);
    }

    private gameLoop() {
        requestAnimationFrame(() => {
            this.gameLoop();
        });
        this.updateElements();
    }

    private updateElements() {
        this.spacecrafts.forEach((spacecraft) => {
            spacecraft.update();
            this.gameEnvironment.svgElement.appendChild(SpacecraftShape.getCraftGElement(spacecraft.type))
        });

    }

    private async syncReality(): Promise<Record<string, any>[]> {
        // Send own status to server
        const returnData: Record<string, any>[] = [];
        
        for (const spacecraft of this.spacecrafts) {
            // Assuming Spacecraft class has a toJSON() method to convert spacecraft data to JSON
            const spacecraftData = spacecraft.toJSON();
            const response = await this.serverSimulator.sync(spacecraftData);
            returnData.push(response);
        }
        console.log(returnData)
        return returnData;
    }
    
        
       /* // Update the local spacecrafts array with data received from the server
        otherSpacecrafts.forEach((spacecraftData) => {
            // Assuming Spacecraft class has a static method fromJSON() to create a spacecraft object from JSON data
            const spacecraft = Spacecraft.fromJSON(spacecraftData);
            const existingSpacecraft = this.spacecrafts.find((s) => s.id === spacecraft.id);
            if (existingSpacecraft) {
                // Update existing spacecraft if found
                existingSpacecraft.updateFrom(spacecraft);
            } else {
                // Add new spacecraft if not found
                this.spacecrafts.push(spacecraft);
            }
        });
        */
    
    
}
