import { Spacecraft } from "./Spacecraft.js";
import { GameEnvironment } from "./GameEnvironment.js";
import { SpacecraftShape } from "./SpacecraftShape.js";
import { KeyboardController } from "./KeyboardController.js";

export class SpaceGame {
    
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
            this.sync(spacecraft.toJSON);
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

    // Method to sync data with the server
    async sync(data: Record<string, any>) {
        try {
            const response = await fetch('http://localhost:3000/receive', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to sync data');
            }

            const responseData = await response.json();
            console.log('Server response:', responseData);
            return responseData;
        } catch (error) {
            console.error('Error syncing data:', error);
            throw error; // Rethrow the error to handle it upstream
        }
    }    
}
