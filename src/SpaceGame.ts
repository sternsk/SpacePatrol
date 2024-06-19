import { Spacecraft, fontSize } from "./Spacecraft.js";
import { GameEnvironment } from "./GameEnvironment.js";
import { SpacecraftShape } from "./SpacecraftShape.js";
import { keyboardController, device, gameFrame } from "./GameMenu.js";
import { Vector2D } from "./Vector2D.js";
import { TractorBeam } from "./TractorBeam.js";
import { evaluate, RequestDefinition, SpaceObjectStatus, Vector2d } from "./library.js";


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
            evaluate<SpaceObjectStatus, SpaceObjectStatus[]>(new RequestDefinition("pathToServer"), this.spacecraft)
            .then(response => {
                this.spacecrafts = response;
            })
            .catch(error => {
                console.error("Failed to update spacecrafts:", error);
            });
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
}
