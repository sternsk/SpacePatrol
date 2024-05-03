import { Spacecraft } from "./Spacecraft.js";
import { GameEnvironment } from "./GameEnvironment.js";
import { SpacecraftShape } from "./SpacecraftShape.js";
import { KeyboardController } from "./KeyboardController.js";
import { Vector2D } from "./Vector2D.js";

export class SpaceGame {
    private spacecraft: Spacecraft
    private spacecrafts: Spacecraft[] = [];
    private gameEnvironment: GameEnvironment;
    private keyboardController: KeyboardController
    private touchControl = true
    private serverRequestHandler: ServerRequestHandler;

    constructor(gameFrame: HTMLElement) {
        this.spacecraft = new Spacecraft();
        this.gameEnvironment = new GameEnvironment(gameFrame);
        this.keyboardController = new KeyboardController(gameFrame);
        gameFrame.focus(); //gameFrame erhält den Keyboard focus
        this.serverRequestHandler = new ServerRequestHandler();
    }

    init(type: string, color: string, id: string) {
        this.spacecraft.type = type
        this.spacecraft.color = color
        this.spacecraft.id = id
        this.spacecraft.gElement = SpacecraftShape.getCraftGElement(this.spacecraft.type);
        this.spacecraft.gElement.setAttribute("tabindex", "0");
        this.spacecraft.gElement.focus(); //doesnt seem to work
        this.gameEnvironment.svgElement.appendChild(this.spacecraft.gElement)
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

        if(this.touchControl){
            this.gameEnvironment.enableTouchControl()
            if(this.gameEnvironment.joystick.isTouched)
            this.spacecraft.handleTouchControl(this.gameEnvironment.joystick.value)
        }
        
        this.spacecraft.handleKeyboardInput(this.keyboardController.getKeysPressed());
        
        this.gameEnvironment.handleSpacecraft(this.spacecraft)
        this.updateElements();
        this.gameEnvironment.setLabel("this is your data: "+JSON.stringify(this.spacecraft.toJSON()))
    }

    private updateElements() {
        this.spacecrafts.forEach((spacecraft) => {
            spacecraft.update();
            });
    }

    private async syncReality(): Promise<void> {
        try {
            // Send own status to server
            // store the feedback in receivedData
            const receivedData = await this.serverRequestHandler.sendData(this.spacecraft.toJSON());
            
            // Überprüfe, ob die empfangenen Daten ein Array sind
            if (!Array.isArray(receivedData)) {
                console.error('Received data is not in the expected format (array)');
                return; // Beende die Funktion, um weitere Fehler zu vermeiden
            }
            receivedData.forEach(element => {
                const index = this.spacecrafts.findIndex(p => p.id === element.id);
                if (index !== -1) {
                    /// spacecraft mit dieser ID bereits vorhanden, aktualisieren
                    this.spacecrafts[index].updateFromJSON(element)
                    
                } else {
                    
                    // Spacecraft mit dieser ID nicht gefunden, hinzufügen
                    const newSpacecraft = Spacecraft.fromJSON(element)
                    this.spacecrafts.push(newSpacecraft);
                    this.gameEnvironment.svgElement.appendChild(newSpacecraft.gElement)
                    
                }

            });
        } catch (error) {
            console.error('Error syncing spacecraft data:', error);
        }
    }
}

class ServerRequestHandler {
    async sendData(data: Record<string, any>) {
        try {
            const response = await fetch('https://spacepatrol.zapto.org/sync', { //http://spacepatrolzone.dynv6.net  http://192.168.2.222:3000  http://localhost https://spacepatrol.zapto.org/sync
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to send data');
            }

            console.log('Data sent successfully, awaiting return');
            return await response.json();
            
        } catch (error) {
            throw error;
        }
    }

    
}

