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
        }, 100);
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
        try {
            // Send own status to server
            for (const spacecraft of this.spacecrafts) {
                await this.serverRequestHandler.sendData(spacecraft.toJSON());
            }

            // Receive data from server
            const receivedData = await this.serverRequestHandler.receiveData();
            console.log('Received data:', receivedData);
        } catch (error) {
            console.error('Error syncing spacecraft data:', error);
        }
    }
}

class ServerRequestHandler {
    async sendData(data: Record<string, any>) {
        try {
            const response = await fetch('http://192.168.2.222:3000/sync', { //http://spacepatrolzone.dynv6.net  http://192.168.2.222:3000  http://localhost
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to send data');
            }

            console.log('Data sent successfully');
        } catch (error) {
            throw error;
        }
    }

    async receiveData() {
        try {
            const response = await fetch('http://192.168.2.222:3000/receive'); //http://spacepatrolzone.dynv6.net    http://192.168.2.222:3000

            if (!response.ok) {
                throw new Error('Failed to receive data');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

