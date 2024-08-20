import { Spacecraft, fontSize } from "./Spacecraft.js";
import { GameEnvironment } from "./GameEnvironment.js";
import { SpacecraftShape } from "./SpacecraftShape.js";
import { keyboardController, device, gameFrame } from "./GameMenu.js";
//import { Vector2D } from "./Vector2D.js";
import { TractorBeam } from "./TractorBeam.js";
import { evaluate, RequestDefinition, SpaceObjectStatus, SyncronizeSpaceObject, syncSpaceObject, Vector2d } from "./library.js";

export class SpaceGame {
    private spacecraft: Spacecraft
    private spacecrafts: Spacecraft[] = [];
    private gameEnvironment: GameEnvironment;
    private touchControl = true
    
    constructor() {
        this.spacecraft = new Spacecraft();
        this.gameEnvironment = new GameEnvironment();
        this.gameEnvironment.displayTouchControl()
        this.gameEnvironment.joystick.addObserver(() => this.handleTouchEndEvent());
        this.setupKeyUpListener();      
        gameFrame.focus(); //gameFrame erhält den Keyboard focus      
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
            
            const request = {} as SyncronizeSpaceObject
            request.spaceObject = this.spacecraft.objectStatus
            
            evaluate(syncSpaceObject, request)
            .then(response => {
                this.syncReality(response)
            })
            .catch(error => {
                console.error("Failed to update spacecrafts:", error);
            });
        }, 500);
    }

    syncReality(reality: SpaceObjectStatus[]){
        
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
                                        <tspan x="${this.spacecraft.scale*7}" dy="${fontSize}">
                                        location: ${this.spacecraft.location.x.toFixed(0)}, ${this.spacecraft.location.y.toFixed(0)}</tspan>
                                        <tspan x="${this.spacecraft.scale*7}" dy="${fontSize}">
                                        direction: ${this.spacecraft.direction}</tspan>
                                        `)
        
        if(this.spacecrafts.length > 0){
            this.spacecrafts.forEach((spacecraft) => {
                if(spacecraft.npc){
                    spacecraft.pseudoOrbit({x:0, y:0}) 
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
}
