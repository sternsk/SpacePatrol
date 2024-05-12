import { Spacecraft } from "./Spacecraft.js";
import { GameEnvironment } from "./GameEnvironment.js";
import { SpacecraftShape } from "./SpacecraftShape.js";
import { KeyboardController } from "./KeyboardController.js";
import { gameFrame } from "./gameMenu.js";
import { Vector2D } from "./Vector2D.js";
import { fontSize } from "./Spacecraft.js";

export class SpaceGame {
    private spacecraft: Spacecraft
    private spacecrafts: Spacecraft[] = [];
    private gameEnvironment: GameEnvironment;
    private keyboardController: KeyboardController
    private touchControl = true
    private serverRequestHandler: ServerRequestHandler;

    constructor() {
        this.spacecraft = new Spacecraft();
        this.gameEnvironment = new GameEnvironment(gameFrame);
        this.keyboardController = new KeyboardController(gameFrame);
        gameFrame.focus(); //gameFrame erhält den Keyboard focus
        this.serverRequestHandler = new ServerRequestHandler();
    }

    init(type: string, color: string, id: string) {
        this.spacecraft.type = type
        this.spacecraft.color = color
        if(id) this.spacecraft.id = id
        this.spacecraft.gElement = SpacecraftShape.getCraftGElement(this.spacecraft.type);
        this.spacecraft.gElement.setAttribute("tabindex", "0");
        this.spacecraft.gElement.focus(); //doesnt seem to work
        this.gameEnvironment.svgElement.appendChild(this.spacecraft.gElement)
        this.spacecraft.applyLabel(this.gameEnvironment.svgElement)
        this.gameLoop();
        
        setInterval(() => {
            this.syncReality();
        }, 500);
        
        
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
        
        this.gameEnvironment.handleSpacecraft(this.spacecraft, "pseudoTorus")
        this.updateElements();
        

    }

    private updateElements() {
        this.spacecraft.update()
        if(this.spacecrafts.length>0){
            this.spacecraft.setLabelText(`<tspan x="${this.spacecraft.scale*7}"> 
                                            Other Spacecrafts: ${this.spacecrafts.length} </tspan>
                                        <tspan x="${this.spacecraft.scale*7}" dy="1em"> 
                                            last Spacecraft Location: ${this.spacecrafts[this.spacecrafts.length-1].location.x.toFixed(0)}, 
                                                                        ${this.spacecrafts[this.spacecrafts.length-1].location.y.toFixed(0)} </tspan>)
                                        <tspan x="${this.spacecraft.scale*7}" dy="1em"> 
                                            last Spacecraft type: ${this.spacecrafts[this.spacecrafts.length-1].type}</tspan>`);

            this.spacecrafts.forEach((spacecraft) => {
                
                spacecraft.pseudoOrbit(new Vector2D(0,0)) 
                spacecraft.update();
                if(spacecraft.label){
                    spacecraft.setLabelText(`<tspan x="${spacecraft.scale*7}"> 
                                            id: ${spacecraft.id} </tspan>
                                            <tspan x="${spacecraft.scale*7}" dy="${fontSize}">
                                            time since last update: ${Date.now()-spacecraft.lastUpdate}</tspan>`);
                }
            });

        }
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
                console.log("creatung spicecrafts")
                const spacecraft = Spacecraft.fromJSON(element)
                this.spacecrafts.push(spacecraft)
                this.gameEnvironment.svgElement.appendChild(spacecraft.gElement)
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

