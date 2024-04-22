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
            //     this.syncWithAllTheOtherPlayersThatAreConnectedToTheServer();
        }, 100);
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
}
//# sourceMappingURL=SpaceGame.js.map