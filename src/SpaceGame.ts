import { Spacecraft, fontSize } from "./Spacecraft.js";
import { GameEnvironment } from "./GameEnvironment.js";
import { SpacecraftShape } from "./SpacecraftShape.js";
import { keyboardController, device, gameFrame, viewBoxWidth } from "./GameMenu.js";
import { TractorBeam } from "./TractorBeam.js";
import { evaluate, RequestDefinition, SpaceObjectStatus, SyncronizeSpaceObject, syncSpaceObject, Vector2d, rotate, distanceBetween, distanceVector, manipulate, manipulateSpaceObject, ManipulateSpaceObject } from "./library.js";
import { OvalShield } from "./OvalShield.js";

import * as collider from "./SVGPathCollider.js"

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
        this.spacecraft.gElement = SpacecraftShape.getCraftGElement(type)
        if(this.spacecraft.type == "../resources/rocket.svg")
            this.spacecraft.directionCorrection = 45
        this.spacecraft.gElement.setAttribute("id", `${this.spacecraft.id}`)
        this.gameEnvironment.svgElement.appendChild(this.spacecraft.gElement)
        
        console.log("device: "+device)
        this.spacecraft.addDevice(`${device}`, [this.spacecraft.gElement.getBBox().width/3, 
                                                this.spacecraft.gElement.getBBox().height/3,
                                                ])
        this.spacecraft.touchControlType = this.spacecraft.type
        //this.spacecraft.applyLabel(this.gameEnvironment.svgElement)
        this.gameLoop();
       /*case the syncSpaceObjects intervall should be less than framerate
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
        }, 20);
        */
    }

    syncReality(reality: SpaceObjectStatus[]){
        reality.forEach(response => {
            // check if element of receivedData is already in spacecrafts-Array
            const index = this.spacecrafts.findIndex(spacecraft => spacecraft.id === response.craftId)
                
            // if so and is not an npc, update the element in Spacecrafts-Array 
            // update location, impuls, direction and mass
            if(index !== -1 ){
                this.spacecrafts[index].objectStatus.location = response.location
                this.spacecrafts[index].objectStatus.impuls = response.impuls
                this.spacecrafts[index].objectStatus.direction = response.direction
                this.spacecrafts[index].objectStatus.mass = response.mass
                // ommit the update of craftId and type for those are fix
            } else if (index === -1){
                const spacecraft = new Spacecraft()
                spacecraft.objectStatus = response
                spacecraft.gElement = SpacecraftShape.getCraftGElement(spacecraft.type)
                this.spacecrafts.push(spacecraft)
                spacecraft.gElement.setAttribute("id", `${spacecraft.id}`)
                this.gameEnvironment.svgElement.appendChild(spacecraft.gElement)
            }
            
        })
        this.spacecrafts = this.spacecrafts.filter(element => {
            // Check if the element is in the reality-array
            const index = reality.findIndex(response => response.craftId === element.id);
        
            // If the element is not in the reality-server-response, exclude it from the array
            // call the vanish method first
            if (index === -1){
                element.vanish()
                return false
            }
            return true
        });
    }

    async handleTouchEndEvent(){
        this.spacecraft.gradualBrake()
    }

    private gameLoop() {
        requestAnimationFrame(() => {
            this.gameLoop();
        });
        
        const request = {} as SyncronizeSpaceObject
        request.spaceObject = this.spacecraft.objectStatus
        
        evaluate(syncSpaceObject, request)
        .then(response => {
            this.syncReality(response)
        })
        .catch(error => {
            console.error("Failed to update spacecrafts:", error);
        });
        
        // check if device TractorBeam might be used - theres some specialcases
        const device = this.spacecraft.device
                
        if(this.touchControl){
            if(this.gameEnvironment.joystick.isTouched){
                this.spacecraft.handleTouchControl(this.gameEnvironment.joystick.value)
            }
            if (this.gameEnvironment.joystick.fires){
                // case the spacecraft has the device tractorBeam 
                // Access and use the setTarget method of the TractorBeam device
                if (device instanceof TractorBeam && this.spacecrafts[1]) {
                   /* tractorBeam.setTarget({x: this.spacecrafts[0].location.x - this.spacecraft.location.x, 
                                            y: this.spacecrafts[0].location.y - this.spacecraft.location.y});
                                            */
                    const target = rotate({x: this.spacecrafts[1].location.x + this.spacecraft.location.x,
                        y: this.spacecrafts[1].location.y + this.spacecraft.location.y} as Vector2d, -90)
                        
                    device.activate(target)
                                          
                    const gElem = device._gElem
                    if(gElem){
                        this.spacecraft.gElement.appendChild(gElem)
                    } 
                }
                else this.spacecraft.operate()
                
            }else if(this.spacecraft.device?.activated){
                this.spacecraft.device.deactivate()
            }
            
        }
        if (keyboardController.isKeyPressed("w")){
            this.gameEnvironment.viewBoxWidth += this.gameEnvironment.viewBoxWidth / 100
            this.gameEnvironment.viewBoxHeight += this.gameEnvironment.viewBoxHeight / 100
        }

        if (keyboardController.isKeyPressed("s")){
            this.gameEnvironment.viewBoxWidth -= this.gameEnvironment.viewBoxWidth/100
            this.gameEnvironment.viewBoxHeight -= this.gameEnvironment.viewBoxHeight/100
        }

        if(device instanceof TractorBeam && keyboardController.isKeyPressed(" ")){
            const targetObject = this.spacecrafts.find(element => element.id === "planet")
            
            const request = {} as ManipulateSpaceObject
            request.method = "tractorBeam"
            request.spaceObject = this.spacecraft.objectStatus
            if(targetObject)
                request.target = targetObject.id
            evaluate(manipulateSpaceObject, request)

            if(targetObject){
                const targetVector = rotate(distanceVector(this.spacecraft.location, targetObject.location), -(this.spacecraft.direction + 90))
                device.activate(targetVector)
            }
            const gElem = device._gElem
            if(gElem){
                
                this.spacecraft.gElement.appendChild(gElem)
            }
        }
        if(device instanceof OvalShield && keyboardController.isKeyPressed(" ")){
            const request = {} as ManipulateSpaceObject
            request.method = "ovalShield"
            request.spaceObject = this.spacecraft.objectStatus
            evaluate(manipulateSpaceObject, request)
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
        if(this.spacecraft)
        render(this.spacecraft, 0, 0, this.gameEnvironment.viewBoxWidth, this.gameEnvironment.viewBoxHeight)

       /*this stupid Label thats owned by the spacecraft seems to be dependendent on the size of the svg that the spacecraft has no access to, what really sucks
        if(this.gameEnvironment.screenAspectRatio < 1){
             this.spacecraft.setFontsize(5000/gameFrame.clientWidth)
            console.log("fontsize set: "+fontSize)
        }
        else 
            this.spacecraft.setFontsize(5000/gameFrame.clientHeight)
*/
        this.spacecraft.setLabelText(`<tspan x="${this.spacecraft.scale*7}"> 
                                        ${this.spacecraft.id}</tspan>
                                        <tspan x="${this.spacecraft.scale*7}" dy="${fontSize}">
                                        location: ${this.spacecraft.location.x.toFixed(0)}, ${this.spacecraft.location.y.toFixed(0)}</tspan>
                                        <tspan x="${this.spacecraft.scale*7}" dy="${fontSize}">
                                        direction: ${this.spacecraft.direction}</tspan>
                                        `)
        if(this.spacecrafts.length > 0){
            this.spacecrafts.forEach((spacecraft) => {
                /*if(!spacecraft.npc){
                    this.gameEnvironment.handleSpacecraft(spacecraft, "pseudoTorus")
                } /*else if(spacecraft.npc)
                    spacecraft.pseudoOrbit({x: this.spacecrafts[1].location.x, y: this.spacecrafts[1].location.y} as Vector2d)
               
                if(spacecraft.label){
                    spacecraft.setLabelText(`<tspan x="${spacecraft.scale*7}"> 
                                            id: ${spacecraft.id} </tspan>
                                            <tspan x="${spacecraft.scale*7}" dy="${fontSize}">
                                            lastUpdate: ${spacecraft.lastUpdate}</tspan>
                                            <tspan x="${spacecraft.scale*7}" dy="${2*fontSize}">
                                            Date.now(): ${Date.now()}</tspan>`);
                }
    */
            
            let xCorrection: number
            let yCorrection: number
            
            if(spacecraft.location.x < this.spacecraft.location.x - this.gameEnvironment.viewBoxWidth / 2){
                xCorrection = 1
            }
            else if(spacecraft.location.x > this.spacecraft.location.x + this.gameEnvironment.viewBoxWidth / 2){
                xCorrection = -1
            }
            else{
                xCorrection = 0
            }

            if(spacecraft.location.y < this.spacecraft.location.y - this.gameEnvironment.viewBoxHeight / 2){
                yCorrection = 1
            }
            else if(spacecraft.location.y > this.spacecraft.location.x + this.gameEnvironment.viewBoxWidth / 2){
                yCorrection = -1
            }
            else{
                yCorrection  = 0
            }
            
            render(spacecraft, xCorrection, yCorrection, this.gameEnvironment.viewBoxWidth, this.gameEnvironment.viewBoxHeight)
            

            });

        }
  
    }
    
}


function render(spacecraft: Spacecraft, xCorrection: number, yCorrection: number, viewBoxWidth: number, viewBoxHeight: number){
    spacecraft.gElement.setAttribute("transform", `translate (${spacecraft.location.x + xCorrection * viewBoxWidth} 
                                                                ${spacecraft.objectStatus.location.y + yCorrection * viewBoxHeight}) 
                                                    scale (${spacecraft.scale}) 
                                                    rotate (${spacecraft.direction + spacecraft.directionCorrection})`);

    if(spacecraft.label && spacecraft.labelBorder){
    console.log("xCorrection and YCorrection not set yet!")
    spacecraft.label.setAttribute("transform", `translate(${spacecraft.objectStatus.location.x} 
                                                            ${spacecraft.objectStatus.location.y})`)
    spacecraft.labelBorder.setAttribute("transform", `translate(${(spacecraft.objectStatus.location.x-7.5)+spacecraft.scale*7}, 
                                        ${spacecraft.objectStatus.location.y})`)
    }
}
