import { Spacecraft } from "./Spacecraft.js";
import { GameEnvironment } from "./GameEnvironment.js";
import { SpacecraftShape } from "./SpacecraftShape.js";
import { keyboardController } from "./gameMenu.js";
import { gameFrame } from "./gameMenu.js";
import { Vector2D } from "./Vector2D.js";
import { fontSize } from "./Spacecraft.js";

export class SpaceGame {
    private spacecraft: Spacecraft
    private spacecrafts: Spacecraft[] = [];
    private gameEnvironment: GameEnvironment;
    //private keyboardController: KeyboardController
    private touchControl = true
    private serverRequestHandler: ServerRequestHandler;

    constructor() {
        this.spacecraft = new Spacecraft();
        this.gameEnvironment = new GameEnvironment(gameFrame);
      //  this.keyboardController = new KeyboardController(gameFrame);
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
       /* 
        setInterval(() => {
            this.syncReality();
        }, 500);
        */
        
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
        
        this.spacecraft.handleKeyboardInput(keyboardController.getKeysPressed());
        
        this.gameEnvironment.handleSpacecraft(this.spacecraft, "pseudoTorus")
        this.updateElements();
        

    }

    private updateElements() {
        this.spacecraft.update()
        
        this.spacecraft.setLabelText(`<tspan x="${this.spacecraft.scale*7}"> 
                                        user position: ${this.spacecraft.location.x.toFixed(0)}, ${this.spacecraft.location.y.toFixed(0)} </tspan>
                                    <tspan x="${this.spacecraft.scale*7}" dy="1em"> 
                                        viewPort position: ${this.spacecraft.gElement.getBoundingClientRect().left.toFixed(0)}, 
                                                            ${this.spacecraft.gElement.getBoundingClientRect().top.toFixed(0)} </tspan>
                                    <tspan x="${this.spacecraft.scale*7}" dy="1em"> 
                                        third line for some more text</tspan>`);
        
        if(this.spacecrafts.length > 0){
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
            // compare all Elements in the spacecrafts-Array with the receivedData and 
            // delete the elements that are not in receivedData
            this.spacecrafts = this.spacecrafts.filter(spacecraft =>{
                const index = receivedData.findIndex(data => data.id === spacecraft.id)
                if(index == -1){
                    spacecraft.vanish();
                    return false //Element entfernen
                }
                return true // Element beibehalten
            })
            
            receivedData.forEach(element => {
                // check if element of receivedData is already in spacecrafts-Array
                const index = this.spacecrafts.findIndex(spacecraft => spacecraft.id === element.id)
                
                // if so update the element in Spacecrafts-Array
                if(index !== -1){
                    this.spacecrafts[index].updateFromJSON
                } 
                else {
                    // otherwise create a new spacecraft and add it to the svg-element
                    const spacecraft = Spacecraft.fromJSON(element)
                    spacecraft.applyLabel(this.gameEnvironment.svgElement)
                    this.spacecrafts.push(spacecraft)
                    this.gameEnvironment.svgElement.appendChild(spacecraft.gElement)
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

