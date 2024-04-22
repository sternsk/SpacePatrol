import { Spacecraft } from "./Spacecraft.js";
import { GameEnvironment } from "./GameEnvironment.js";
import { ServerSimulator } from "./ServerSimulator.js";
import { SpacecraftShape } from "./SpacecraftShape.js";
import { KeyboardController } from "./KeyboardController.js";
export class SpaceGame {
    serverSimulator = new ServerSimulator();
    spacecrafts = [];
    gameEnvironment;
    keyboardController = new KeyboardController;
    constructor(gameFrame) {
        this.gameEnvironment = new GameEnvironment(gameFrame);
    }
    init(type, color, id) {
        const spacecraft = new Spacecraft(type, color, id);
        spacecraft.gElement = SpacecraftShape.getCraftGElement(spacecraft.type);
        spacecraft.gElement.setAttribute("tabindex", "0");
        spacecraft.gElement.focus();
        spacecraft.handleKeyboardInput(this.keyboardController.getKeysPressed());
        this.spacecrafts.push(spacecraft);
        this.gameLoop();
        setInterval(() => {
            this.syncReality();
        }, 1000);
    }
    gameLoop() {
        requestAnimationFrame(() => {
            this.gameLoop();
        });
        this.updateElements();
    }
    updateElements() {
        this.spacecrafts.forEach((spacecraft) => {
            spacecraft.update();
            this.gameEnvironment.svgElement.appendChild(SpacecraftShape.getCraftGElement(spacecraft.type));
        });
    }
    async syncReality() {
        // Send own status to server
        const returnData = [];
        for (const spacecraft of this.spacecrafts) {
            // Assuming Spacecraft class has a toJSON() method to convert spacecraft data to JSON
            const spacecraftData = spacecraft.toJSON();
            const response = await this.serverSimulator.sync(spacecraftData);
            returnData.push(response);
        }
        console.log(returnData);
        return returnData;
    }
}
//# sourceMappingURL=SpaceGame.js.map