import { Spacecraft } from "./Spacecraft.js";
import { GameEnvironment } from "./GameEnvironment.js";
import { SpacecraftShape } from "./SpacecraftShape.js";
import { KeyboardController } from "./KeyboardController.js";

export class SpaceGame {
    private spacecraft: Spacecraft
    private spacecrafts: Spacecraft[] = [];
    private gameEnvironment: GameEnvironment;
    private keyboardController = new KeyboardController();
    private serverRequestHandler: ServerRequestHandler;

    constructor(gameFrame: HTMLElement) {
        this.spacecraft = new Spacecraft();
        this.gameEnvironment = new GameEnvironment(gameFrame);
        this.serverRequestHandler = new ServerRequestHandler();
    }

    init(type: string, color: string, id: string) {
        this.spacecraft.type = type
        this.spacecraft.color = color
        this.spacecraft.id = id
        this.spacecraft.gElement = SpacecraftShape.getCraftGElement(this.spacecraft.type);
        this.spacecraft.gElement.setAttribute("tabindex", "0");
        this.spacecraft.gElement.focus(); //doesnt seem to work
        this.spacecraft.handleKeyboardInput(this.keyboardController.getKeysPressed());
        this.spacecrafts.push(this.spacecraft);
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
            this.gameEnvironment.svgElement.appendChild(SpacecraftShape.getCraftGElement(spacecraft.type));
        });
    }

    private async syncReality(): Promise<void> {
        // Send own status to server
        const returnData: Record<string, any>[] = [];
        
            const spacecraftData = this.spacecraft.toJSON();
            try {
                const response = await this.serverRequestHandler.sync(spacecraftData);
                returnData.push(response);
            } catch (error) {
                console.error('Error syncing spacecraft data:', error);
            }
        
        console.log("returnData: "+returnData);
    }
}

class ServerRequestHandler {
    async sync(data: Record<string, any>): Promise<Record<string, any>> {
        try {
            const response = await fetch('http://localhost:3000/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to sync data');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}
