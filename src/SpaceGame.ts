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
    private spaceObjects: Spacecraft[] = [];
    private gameEnvironment: GameEnvironment;
    private touchControl = false

    private textArea = document.createElement("textArea")
    
    constructor() {
        this.spacecraft = new Spacecraft();
        this.gameEnvironment = new GameEnvironment();

        //spacecraft gets a convenient Label
        this.textArea.style.position = "absolute"
        this.textArea.style.color = "darkgrey"
        this.textArea.style.backgroundColor = "black"
        this.textArea.innerHTML = "this labels text is to be written yet"
        this.textArea.setAttribute("rows", "10")
        gameFrame.appendChild(this.textArea)
        
        if(this.touchControl){
            this.gameEnvironment.displayTouchControl()
            this.gameEnvironment.joystick.addObserver(() => this.handleTouchEndEvent());
        }
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
                console.error("Failed to update spaceObjects:", error);
            });
        }, 20);
        */
    }

    syncReality(reality: SpaceObjectStatus[]){
        reality.forEach(response => {
            // check if element of receivedData is already in spaceObjects-Array
            const index = this.spaceObjects.findIndex(spacecraft => spacecraft.id === response.craftId)
                
            // if so and is not an npc, update the element in spaceObjects-Array 
            // update location, impuls, direction and mass
            if(index !== -1 ){
                this.spaceObjects[index].objectStatus.location = response.location
                this.spaceObjects[index].objectStatus.impuls = response.impuls
                this.spaceObjects[index].objectStatus.direction = response.direction
                this.spaceObjects[index].objectStatus.mass = response.mass
                // ommit the update of craftId and type for those are fix
            } else if (index === -1){
                const spacecraft = new Spacecraft()
                spacecraft.objectStatus = response
                spacecraft.gElement = SpacecraftShape.getCraftGElement(spacecraft.type)
                this.spaceObjects.push(spacecraft)
                spacecraft.gElement.setAttribute("id", `${spacecraft.id}`)
                this.gameEnvironment.svgElement.appendChild(spacecraft.gElement)
            }
            
        })
        this.spaceObjects = this.spaceObjects.filter(element => {
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
            console.error("Failed to update spaceObjects:", error);
        });
        
        // check if device TractorBeam might be used - theres some specialcases
        const device = this.spacecraft.device
        device?.deactivate()
                
        if(this.touchControl){
            if(this.gameEnvironment.joystick.isTouched){
                this.spacecraft.handleTouchControl(this.gameEnvironment.joystick.value)
            }
            if (this.gameEnvironment.joystick.fires){
                // case the spacecraft has the device tractorBeam 
                // Access and use the setTarget method of the TractorBeam device
                if (device instanceof TractorBeam && this.spaceObjects[1]) {
                   /* tractorBeam.setTarget({x: this.spaceObjects[0].location.x - this.spacecraft.location.x, 
                                            y: this.spaceObjects[0].location.y - this.spacecraft.location.y});
                                            */
                    const target = rotate({x: this.spaceObjects[1].location.x + this.spacecraft.location.x,
                        y: this.spaceObjects[1].location.y + this.spacecraft.location.y} as Vector2d, -90)
                        
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
            const targetObject = this.spaceObjects.find(element => element.id === "planet")
            
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
        // Find the planet object within the spaceObjects array
        const planet: Spacecraft | undefined = this.spaceObjects.find(obj => obj.id === "planet");
        
        if(planet){
            this.textArea.innerHTML = `spacecraft location: ${this.spacecraft.location.x.toFixed(1)}, ${this.spacecraft.location.y.toFixed(1)}
                                        planet location: ${planet.location.x.toFixed(1)}, ${planet.location.y.toFixed(1)}
                                        distance to planet: ${distanceBetween(this.spacecraft.location, planet.location).toFixed(1)}`
                                    
        }
        /*else{}{
            console.log("nop planet found")
            this.textArea.innerHTML = `spacecraft location: ${this.spacecraft.location.x.toFixed(1)}, 
            ${this.spacecraft.location.y.toFixed(1)}`
        }
        */

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
        render(this.spacecraft, 0, 0)

       /*this stupid Label thats owned by the spacecraft seems to be dependendent on the size of the svg that the spacecraft has no access to, what really sucks
        if(this.gameEnvironment.screenAspectRatio < 1){
             this.spacecraft.setFontsize(5000/gameFrame.clientWidth)
            console.log("fontsize set: "+fontSize)
        }
        else 
            this.spacecraft.setFontsize(5000/gameFrame.clientHeight)
*//*
        this.spacecraft.setLabelText(`<tspan x="${this.spacecraft.scale*7}"> 
                                        ${this.spacecraft.id}</tspan>
                                        <tspan x="${this.spacecraft.scale*7}" dy="${fontSize}">
                                        location: ${this.spacecraft.location.x.toFixed(0)}, ${this.spacecraft.location.y.toFixed(0)}</tspan>
                                        <tspan x="${this.spacecraft.scale*7}" dy="${fontSize}">
                                        direction: ${this.spacecraft.direction}</tspan>
                                        `)
    */
        if(this.spaceObjects.length > 0){
            this.spaceObjects.forEach((spaceObject) => {
                /*if(!spacecraft.npc){
                    this.gameEnvironment.handleSpacecraft(spacecraft, "pseudoTorus")
                } /*else if(spacecraft.npc)
                    spacecraft.pseudoOrbit({x: this.spaceObjects[1].location.x, y: this.spaceObjects[1].location.y} as Vector2d)
               
                if(spacecraft.label){
                    spacecraft.setLabelText(`<tspan x="${spacecraft.scale*7}"> 
                                            id: ${spacecraft.id} </tspan>
                                            <tspan x="${spacecraft.scale*7}" dy="${fontSize}">
                                            lastUpdate: ${spacecraft.lastUpdate}</tspan>
                                            <tspan x="${spacecraft.scale*7}" dy="${2*fontSize}">
                                            Date.now(): ${Date.now()}</tspan>`);
                }
    */
            
            let xCorrection: number = 0
            let yCorrection: number = 0
            
            if(spaceObject.location.x < this.spacecraft.location.x - 1000 / 2){
                xCorrection = 1
            }
            else if(spaceObject.location.x > this.spacecraft.location.x + 1000 / 2){
                xCorrection = -1
            }
            else{
                xCorrection = 0
            }

            if(spaceObject.location.y < this.spacecraft.location.y - 1000 / 2){
                yCorrection = 1
            }
            else if(spaceObject.location.y > this.spacecraft.location.x + 1000 / 2){
                yCorrection = -1
            }
            else{
                yCorrection  = 0
            }
           
            render(spaceObject, xCorrection, yCorrection)
            });

        }
  
    }
    
}


function render(spacecraft: Spacecraft, xCorrection: number, yCorrection: number){
    spacecraft.gElement.setAttribute("transform", `translate (${spacecraft.location.x + xCorrection * 1000} 
                                                                ${spacecraft.objectStatus.location.y + yCorrection * 1000}) 
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
