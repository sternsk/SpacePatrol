import { Spacecraft } from "./Spacecraft.js";
import { GameEnvironment } from "./GameEnvironment.js";
import { SpacecraftShape } from "./SpacecraftShape.js";
import { keyboardController } from "./GameMenu.js";
import { gameFrame } from "./GameMenu.js";
import { Vector2D } from "./Vector2D.js";
import { fontSize } from "./Spacecraft.js";
import { device } from "./GameMenu.js";
import { TractorBeam } from "./TractorBeam.js";

export class SpaceGame {
    private spacecraft: Spacecraft
    private spacecrafts: Spacecraft[] = [];
    private gameEnvironment: GameEnvironment;
    private touchControl = true
    private serverRequestHandler: ServerRequestHandler;

    constructor() {
        this.spacecraft = new Spacecraft();
        this.gameEnvironment = new GameEnvironment();
        this.gameEnvironment.displayTouchControl()
        this.gameEnvironment.joystick.addObserver(() => this.handleTouchEndEvent());
        this.setupKeyUpListener();
        
        gameFrame.focus(); //gameFrame erhält den Keyboard focus
        this.serverRequestHandler = new ServerRequestHandler();
    }

    init(type: string, color: string, id: string) {
        this.spacecraft.type = type
        this.spacecraft.color = color
        if(id) this.spacecraft.id = id
        this.spacecraft.gElement = SpacecraftShape.getCraftGElement(this.spacecraft.type)
        this.gameEnvironment.svgElement.appendChild(this.spacecraft.gElement)
        console.log("device: "+device)
        this.spacecraft.addDevice(`${device}`, [this.spacecraft.gElement.getBBox().width/3, 
                                                this.spacecraft.gElement.getBBox().height/3,
                                                ])
        

        this.spacecraft.touchControlType = this.spacecraft.type
        this.spacecraft.applyLabel(this.gameEnvironment.svgElement)
        this.gameLoop();
       
        setInterval(() => {
            this.syncReality();
        }, 50);
    }

    async handleTouchEndEvent(){
        this.spacecraft.gradualBrake()
    }

    private gameLoop() {
        requestAnimationFrame(() => {
            this.gameLoop();
        });
        
        if(this.touchControl){
            if(this.gameEnvironment.joystick.isTouched){
                this.spacecraft.handleTouchControl(this.gameEnvironment.joystick.value)
            }
            if(this.gameEnvironment.joystick.fires){
                // case the spacecraft has the device tractorBeam 
                // Access and use the setTarget method of the TractorBeam device
                const tractorBeam = this.spacecraft.getDevice<TractorBeam>(TractorBeam);
                
                if (tractorBeam && this.spacecrafts[0]) {
                    tractorBeam.setTarget({x: this.spacecrafts[0].location.x - this.spacecraft.location.x, 
                                            y: this.spacecrafts[0].location.y - this.spacecraft.location.y});
                }
                this.spacecraft.operate()
                
            }else if(this.spacecraft.device?.activated){
                this.spacecraft.device.deactivate()
            }
            
        }
        
        this.spacecraft.handleKeyboardInput(keyboardController.getKeysPressed());
        this.updateElements();
    }

    private setupKeyUpListener() {
        keyboardController.onKeyUp((key) => {
            this.spacecraft.onKeyUp(key);
        });
    }

    private updateElements() {
        this.spacecraft.update()
        this.gameEnvironment.handleSpacecraft(this.spacecraft, "pseudoTorus")
        this.spacecraft.setLabelText(`<tspan x="${this.spacecraft.scale*7}"> 
                                        ${this.spacecraft.id}</tspan>
                                        `)
        
        if(this.spacecrafts.length > 0){
            this.spacecrafts.forEach((spacecraft) => {
                if(spacecraft.npc){
                    spacecraft.pseudoOrbit(new Vector2D(0,0)) 
                }
                else{
                    this.gameEnvironment.handleSpacecraft(spacecraft, "pseudoTorus")
                }
                spacecraft.update();
               
                if(spacecraft.label){
                    spacecraft.setLabelText(`<tspan x="${spacecraft.scale*7}"> 
                                            id: ${spacecraft.id} </tspan>
                                            <tspan x="${spacecraft.scale*7}" dy="${fontSize}">
                                           lastUpdate: ${spacecraft.lastUpdate}</tspan>
                                           <tspan x="${spacecraft.scale*7}" dy="${2*fontSize}">
                                           Date.now(): ${Date.now()}</tspan>`);
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
                
                // if so and is not an npc, update the element in Spacecrafts-Array 
                if(index !== -1 && !element.npc){
                    this.spacecrafts[index].updateFromJSON(element)
                } 
                
                // otherwise create a new spacecraft and add it to the svg-element
                else if(index === -1){// make sure, not to create too many spacecrafts
                    const spacecraft = Spacecraft.fromJSON(element)
                    if(!spacecraft.npc) //npc dont get a label
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

          //  console.log('Data sent successfully, awaiting return');
            return await response.json();
            
        } catch (error) {
            throw error;
        }
    }

    
}

