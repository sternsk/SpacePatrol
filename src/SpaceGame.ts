import { Spacecraft, fontSize } from "./Spacecraft.js";
import { GameEnvironment, torusWidth, torusHeight } from "./GameEnvironment.js";
import { createGElement, collidablePathElement } from "./SpacecraftShape.js";
import { keyboardController, device, gameFrame, viewBoxWidth, audioContext } from "./GameMenu.js";
import { TractorBeam } from "./TractorBeam.js";
import { evaluate, RequestDefinition, syncSpaceObject, rotatedVector, distanceBetween, distanceVector, manipulate, manipulateSpaceObject } from "./library.js";
import { SpaceObjectStatus, SynchronizeSpaceObjects, Vector2d, ManipulateSpaceObject } from "./ReflectionLab.js";
import { OvalShield } from "./OvalShield.js";
import SVGPathCollider from "./svg-path-collider/svg-path-collider.js";
import SAT from "sat";
import { Vector2D } from "./Vector2D.js";


export class SpaceGame {
    audioBuffer?: AudioBuffer
    private playingSound = false

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
        this.textArea.innerHTML = "this label´s text is yet to be written"
        this.textArea.setAttribute("rows", "14")
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
        this.spacecraft.gElement = createGElement(type)


        
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
        
        reality.forEach(async response => {
            const renderDeterminant = this.defineRenderDeterminants(response.location)
            const renderLocation = new Vector2D(response.location.x + renderDeterminant.x * torusWidth, 
                                                response.location.y + renderDeterminant.y * torusHeight
            )

            // check if element of receivedData is already in spaceObjects-Array
            const index = this.spaceObjects.findIndex(spacecraft => spacecraft.id === response.craftId)
                
            // if so and is not an npc, update the element in spaceObjects-Array 
            // update location, impuls, direction and mass
            if(index !== -1 ){
                //adjust the location to apropriate render location
                this.spaceObjects[index].objectStatus.location = renderLocation
                this.spaceObjects[index].objectStatus.impuls = response.impuls
                this.spaceObjects[index].objectStatus.direction = response.direction
                this.spaceObjects[index].objectStatus.mass = response.mass
                // ommit the update of craftId and type for those are fix
            } else if (index === -1){
                const spacecraft = new Spacecraft()
                spacecraft.objectStatus = response
                this.spaceObjects.push(spacecraft)
                // define collidable objects
                if (spacecraft.type === "station02" || spacecraft.type === "station01" ){
                    
                    if(spacecraft.type === "station02"){
                        console.log("path element for "+spacecraft.type+ " will be created")
                    }
                    spacecraft.objectStatus.collidable = true; 
                    let pathElement = await collidablePathElement(spacecraft.type)
                        console.log("path is ready")
                        spacecraft.shape.pathElement = pathElement
                        spacecraft.gElement.appendChild(pathElement)
                }
                // the others get just a normal gElement
                else 
                    spacecraft.gElement = createGElement(spacecraft.type)
                
                spacecraft.gElement.setAttribute("id", `${spacecraft.id}`)
                this.gameEnvironment.svgElement.insertBefore(spacecraft.gElement, this.spacecraft.gElement)
                
                // after the spacecrafts are set to the svg, the collidable ones get a collider
                if (spacecraft.collidable  && spacecraft.shape.pathElement){
                    spacecraft.collider = new SVGPathCollider(spacecraft.shape.pathElement)
                    spacecraft.collider.update()
                }
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
        
        // check for collisions between spacecrafts that have collider
        for (let i = 0; i < this.spaceObjects.length; i++) {
            const spaceObject1 = this.spaceObjects[i];
            if (spaceObject1.collider){
                spaceObject1.collider.update()
                for (let j = i+1; j < this.spaceObjects.length; j++) {
                    const spaceObject2 = this.spaceObjects[j];
                    if (spaceObject2.collider){
                        spaceObject2.collider.update()
                        console.log(spaceObject1.collider.test(spaceObject2.collider))
                    }
                }
            
            }
        }

        /*

        
                this.spaceObjects.forEach((element2)=>{
                    if(element2.collidable && element.collider && element2 != element && element2.collider)
                        element.collider.test(element2.collider)
                })
            }
        })
        /*
        // check collisions between the spacecrafts that have a satPolygon
        for (let i = 0; i < this.spaceObjects.length; i++) {
            const element1 = this.spaceObjects[i];
            if (!element1.satPolygon) {
                //console.log("found an element with SAT Polygon: "+ element1)
           
            for (let j = i + 1; j < this.spaceObjects.length; j++) {
                const element2 = this.spaceObjects[j];
                if (!element2.satPolygon) {
                //console.log("found two elements with SAT Polygon")
                // if two spaceObjects with SAT.Polygons appear, check the collision status between them
                if (SAT.testPolygonPolygon(element1.satPolygon, element2.satPolygon)) {
                    console.log("collision detected between", element1, "and", element2);
                    // optional: break if you want to stop after the first detected collision
                }
            }
            }
            }
        }
*/

        const request = {} as SynchronizeSpaceObjects
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
                    const target = rotatedVector({x: this.spaceObjects[1].location.x + this.spacecraft.location.x,
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
            //let targetDeterminant
            
            if(targetObject){
                //targetDeterminant = this.defineRenderDeterminants(targetObject)
                request.target = targetObject.id
                const targetVector = rotatedVector(distanceVector(this.spacecraft.location, targetObject.location), 
                                    -(this.spacecraft.direction + 90))
                /*const targetVector = rotatedVector(distanceVector(this.spacecraft.location, 
                    {x: targetObject.location.x + targetDeterminant.x * this.torusWidth, 
                        y: targetObject.location.y + targetDeterminant.y * this.torusHeight} as Vector2d), 
                        -(this.spacecraft.direction + 90))
                        */
                device.activate(targetVector)
            }
                
            const gElem = device._gElem
            if(gElem){
                this.spacecraft.gElement.appendChild(gElem)
            }
            
            evaluate(manipulateSpaceObject, request)
        }

        if(device instanceof OvalShield && keyboardController.isKeyPressed(" ")){
            if(audioContext)
                this.playSound()
            // get the device to apply a certain radius to it
            const device = this.spacecraft.device as OvalShield
            // get the closest nugget
            const nuggetList = this.spaceObjects.filter(element => element.type ==="nugget")
            let shortestDistance = torusHeight+torusWidth

            // iterate over nuggetList to track the closest nugget 
            // dont need the nugget let closestNugget: Spacecraft | null = null
            nuggetList.forEach(element =>{
                const distance = distanceBetween(element.location, this.spacecraft.location)
                if( distance < shortestDistance){
                    shortestDistance = distance
                    //closestNugget = element
                }
            })
            device.width = shortestDistance
            device.height = shortestDistance

            const request = {} as ManipulateSpaceObject
            request.method = "ovalShield"
            request.spaceObject = this.spacecraft.objectStatus
            evaluate(manipulateSpaceObject, request)
        }

        this.spacecraft.handleKeyboardInput(keyboardController.getKeysPressed());
        this.updateElements();
        // Find the planet object within the spaceObjects array
        const planet: Spacecraft | undefined = this.spaceObjects.find(obj => obj.id === "planet");
        const station: Spacecraft | undefined = this.spaceObjects.find(obj => obj.id === "station")
        if(planet && station){
            this.textArea.innerHTML = `spacecraft location: ${this.spacecraft.location.x.toFixed(1)}, ${this.spacecraft.location.y.toFixed(1)}
                                        planet location: ${planet.location.x.toFixed(1)}, ${planet.location.y.toFixed(1)}
                                        station location: ${station.location.x.toFixed(1)}, ${station.location.y.toFixed(1)}
                                        distance to planet: ${distanceBetween(this.spacecraft.location, planet.location).toFixed(1)}
                                        number of spaceObjects: ${this.spaceObjects.length}`
                                    
        }
        /*else{}{
            console.log("nop planet found")
            this.textArea.innerHTML = `spacecraft location: ${this.spacecraft.location.x.toFixed(1)}, 
            ${this.spacecraft.location.y.toFixed(1)}`
        }
        */

        // test collision betwen stations


        
    }

    private setupKeyUpListener() {
        keyboardController.onKeyUp((key) => {
            this.spacecraft.onKeyUp(key);
            //this.stopSound()
        });
    }


    private updateElements() {
        this.spacecraft.update()

        this.gameEnvironment.handleSpacecraft(this.spacecraft, "pseudoTorus")
        if(this.spacecraft)
        this.render(this.spacecraft)
        
       /*this stupid Label thats owned by the spacecraft seems to be dependend on the size of the svg that the spacecraft has no access to, what really sucks
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
            this.render(spaceObject)
            });
        }
    }
    
    defineRenderDeterminants(location: Vector2d): {x: number, y:number}{
        let xDeterminant: number = 0
        let yDeterminant: number = 0
        
        if(location.x - this.spacecraft.location.x < -torusWidth / 2){
            xDeterminant = 1
        }
        else if(location.x - this.spacecraft.location.x > torusWidth / 2){
            xDeterminant = -1
        }
        else{
            xDeterminant = 0
        }

        if(location.y - this.spacecraft.location.y < -torusHeight / 2){
            yDeterminant = 1
        }
        else if(location.y - this.spacecraft.location.y > torusHeight / 2){
            yDeterminant = -1
        }
        else{
            yDeterminant  = 0
        }
        return{x: xDeterminant, y: yDeterminant}
           
    }
    render(spacecraft: Spacecraft){
        //const determinant = this.defineRenderDeterminants(spacecraft)
        spacecraft.gElement.setAttribute("transform", `translate (${spacecraft.location.x} 
                                                                    ${spacecraft.location.y}) 
                                                        scale (${spacecraft.scale}) 
                                                        rotate (${spacecraft.direction + spacecraft.directionCorrection})`);
    
        if(spacecraft.label && spacecraft.labelBorder){
        console.log("renderDeterminants not set yet!")
        spacecraft.label.setAttribute("transform", `translate(${spacecraft.objectStatus.location.x} 
                                                                ${spacecraft.objectStatus.location.y})`)
        spacecraft.labelBorder.setAttribute("transform", `translate(${(spacecraft.objectStatus.location.x-7.5)+spacecraft.scale*7}, 
                                            ${spacecraft.objectStatus.location.y})`)
        }
    }

    playSound(){
        if(!this.playingSound){
            console.log("beginning sound")
            this.playingSound = true
            fetch("../resources/Taro03.mp3")
                    .then(response => response.arrayBuffer())
                    .then(buffer => {
                        if (audioContext) {
                            return audioContext.decodeAudioData(buffer)
                        }
                    })
                    .then(decodedBuffer => {
                        if (decodedBuffer) {
                            this.audioBuffer = decodedBuffer;
                        }
                    })
                    .catch(error => {
                        console.error('Error loading audio file:', error)
                    })
                    const source = audioContext!.createBufferSource();
                
                if(this.audioBuffer)
                    source.buffer = this.audioBuffer;
        
                source.connect(audioContext!.destination);
                source.start(0);
        }
    }    
    stopSound(){
       // console.log("stopping sound")
       // this.audioBuffer = undefined
       // this.playingSound = false
    }   
}


interface A extends B{
    
}
interface B{
    
}

namespace B{
    export function create(): B {
        return{} as B
    }
}

B.create