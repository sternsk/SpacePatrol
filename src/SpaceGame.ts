import { Spacecraft, fontSize } from "./Spacecraft.js";
import { GameEnvironment, torusWidth, torusHeight } from "./GameEnvironment.js";
import { createGElement, collidablePathElement } from "./SpacecraftShape.js";
import { keyboardController, device, gameFrame, viewBoxWidth, audioContext } from "./GameMenu.js";
import { TractorBeam } from "./TractorBeam.js";
import { evaluate, RequestDefinition, rotatedVector, distanceBetween, distanceVector, pollingRequest} from "./library.js";
import { SpaceObjectStatus, SpacePatrolRequest, Vector2d, Sync, SpaceNotification, SyncResponse} from "./space-patrol-model.js";
import { RepulsorShield } from "./RepulsorShield.js";
import SVGPathCollider from "./svg-path-collider/svg-path-collider.js";
import SAT from "sat";
import { create } from "./library.js";
import { Chissel } from "./Chissel.js";
import { Joystick } from "./Joystick.js";


export class SpaceGame {
    audioBuffer?: AudioBuffer
    private playingSound = true

    private spacecraft: Spacecraft
    private spaceObjects: Spacecraft[] = []
    private request: Sync = {"spaceObject":
                                {"activeDevice":"",
                                "collidable":false,
                                "craftId":"spacecraft",
                                "direction":-60,
                                "focus":"",
                                "impuls":{"x":0,"y":0},
                                "location":{"x":50,"y":50},
                                "mass":10,
                                "npc":false,
                                "rotation":0,
                                "type":"rainbowRocket"},
                                "collides":{},
                                "message":{}} as Sync
    
    private response: SyncResponse = create()
    private requestFlag = true
    
    private gameEnvironment: GameEnvironment;
    private touchControl = true

    private textArea = document.createElement("textArea")
    private taxiValue?: string
    
    constructor() {
        this.spacecraft = new Spacecraft()
        this.gameEnvironment = new GameEnvironment()

        //spacecraft gets a convenient Label
        this.textArea.style.position = "absolute"
        this.textArea.style.color = "darkgrey"
        this.textArea.style.backgroundColor = "black"
        this.textArea.innerHTML = "connecting to server..."
        this.textArea.setAttribute("rows", "14")
        gameFrame.appendChild(this.textArea)
        
        if(this.touchControl){
            console.log("displaying touch-control: "+ this.touchControl)
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
        if (device == "chissel"){
            this.spacecraft.addDevice("chissel", [this.spacecraft.gElement])
        }else{
            this.spacecraft.addDevice(`${device}`, [this.spacecraft.gElement.getBBox().width/3, 
                                                this.spacecraft.gElement.getBBox().height/3,
                                                ])
        }

        this.spacecraft.touchControlType = this.spacecraft.type
        //this.spacecraft.applyLabel(this.gameEnvironment.svgElement)
        this.gameLoop();
       
        //case the syncSpaceObjects intervall should be less than framerate
       /* setInterval(() => {
            
            

            

        }, 100);
        */
    }

    syncReality(reality: SpaceObjectStatus[]){
        
        reality.forEach(async response => {
            const renderDeterminant = this.defineRenderDeterminants(response.location)
            const renderLocation: Vector2d = create({x: response.location.x + renderDeterminant.x * torusWidth, 
                                               y: response.location.y + renderDeterminant.y * torusHeight })
            

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
                    spacecraft.objectStatus.collidable = true; 
                    let pathElement = await collidablePathElement(spacecraft.type)
                        spacecraft.shape.pathElement = pathElement
                        spacecraft.shape.pathElement.setAttribute("class", "collidablePath")
                        spacecraft.gElement.appendChild(pathElement)
                }
                
                // and a normal gElement
                spacecraft.gElement.appendChild(createGElement(spacecraft.type))
                
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
                //element.vanish()

                // vanish
                const animate = ()=>{
                    if (element.scale > .1){
                        element.scale -= element.scale/100
                        this.render(element)
                        requestAnimationFrame(animate)
                        
                
        
                    } else {
                        element.gElement.parentNode?.removeChild(element.gElement)
                        if(element.label){
                            element.label.parentNode?.removeChild(element.label)
                            element.labelBorder?.parentNode?.removeChild(element.labelBorder)
                            
                
                        }
                    } 
                }
                animate()
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
        
        if(this.requestFlag){
            this.requestFlag = false

            this.request.spaceObject = this.spacecraft.objectStatus
                
                evaluate(pollingRequest, this.request)
                .then(response => {
                    this.syncReality(response.status)
                    this.response = response
                    this.requestFlag = true
                })
                .catch(error => {
                    console.error("Failed to update spaceObjects:", error);
                });
            // reset the request
            this.request = create({
                spaceObject: this.spacecraft.objectStatus, 
                collides: {} as SpaceObjectStatus,   
                message: {} as SpaceNotification

            })
        }        
        
        // check for collisions between spacecrafts that have collider
        let colliderMessage: string = ""
        for (let i = 0; i < this.spaceObjects.length; i++) {
            const spaceObject1 = this.spaceObjects[i];
            if (spaceObject1.collider){
                spaceObject1.collider.update()
                for (let j = i+1; j < this.spaceObjects.length; j++) {
                    const spaceObject2 = this.spaceObjects[j];
                    if (spaceObject2.collider){
                        spaceObject2.collider.update()
                        if (spaceObject1.collider.test(spaceObject2.collider)){
                            this.request.collides = spaceObject1.objectStatus
                            console.log(`spaceObject1: ${spaceObject1} collides with spaceobject2: ${spaceObject2}`)
                            
                            colliderMessage = `${spaceObject1.objectStatus.craftId} collides`
                        }
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
        
        const device = this.spacecraft.device
        device?.deactivate()
        //define the request in scope of gameLoop
        /* should transport following properties: */
        //  to avoid java.lang.NullPointerException: Cannot invoke "java.lang.Boolean.booleanValue()" because the return value of "net.sternski.spacepatrol.space_patrol.model.api.SpacePatrolRequest.getTractor()" is null
	//      at net.sternski.spacepatrol.space_patrol.processing.SpacePatrolProcessor.manipulateSpaceObject(SpacePatrolProcessor.java:51)
       
        
        if(this.touchControl){
            if(this.gameEnvironment.joystick.isTouched){
                this.spacecraft.handleTouchControl(this.gameEnvironment.joystick.value)

            }
            if (!this.gameEnvironment.joystick.fires) {
                this.spacecraft.objectStatus.activeDevice = ""
                this.spacecraft.device?.dispose()
            }
            /*
            if (this.gameEnvironment.joystick.fires){
                // case the spacecraft has the device tractorBeam 
                // Access and use the setTarget method of the TractorBeam device
                if (device instanceof TractorBeam && this.spaceObjects[1]) {
                   /* tractorBeam.setTarget({x: this.spaceObjects[0].location.x - this.spacecraft.location.x, 
                                            y: this.spaceObjects[0].location.y - this.spacecraft.location.y});
                                            
                    //const target = rotatedVector({x: this.spaceObjects[1].location.x + this.spacecraft.location.x,
                    //    y: this.spaceObjects[1].location.y + this.spacecraft.location.y} as Vector2d, -90)
                    const targetVector = rotatedVector(distanceVector(this.spacecraft.location, targetObject.location), 
                                    -(this.spacecraft.direction + 90))
                    device.activate(targetVector)
                    this.request.spaceObject.activeDevice = "tractor"
                    const gElem = device._gElem
                    if(gElem){
                        this.spacecraft.gElement.appendChild(gElem)
                    } 
                }
                else this.spacecraft.operate()
                console.log("opeartes")
            }else if(this.spacecraft.device?.activated){
                this.spacecraft.device.deactivate()
            }
            */
        }

        if (keyboardController.isKeyPressed("w")){
            this.gameEnvironment.viewBoxWidth += this.gameEnvironment.viewBoxWidth / 100
            this.gameEnvironment.viewBoxHeight += this.gameEnvironment.viewBoxHeight / 100
        }

        if (keyboardController.isKeyPressed("s")){
            this.gameEnvironment.viewBoxWidth -= this.gameEnvironment.viewBoxWidth/100
            this.gameEnvironment.viewBoxHeight -= this.gameEnvironment.viewBoxHeight/100
        }

        if(device instanceof TractorBeam && (keyboardController.isKeyPressed(" ") || this.gameEnvironment.joystick.fires)){
            
            const targetObject = this.spaceObjects.find(element => element.id === "planet")
            this.request.spaceObject.activeDevice = "tractor"
                        
            if(targetObject){
                this.request.spaceObject.focus = targetObject.id
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
         
        }

        if(device instanceof RepulsorShield && (keyboardController.isKeyPressed(" ")|| this.gameEnvironment.joystick.fires)){
            if(audioContext)
                this.playSound()
            console.log("repulsor activated")
            // get the device to apply a certain radius to it
            this.spacecraft.objectStatus.activeDevice = "repulsor"
            //const device = this.spacecraft.device as RepulsorShield
            // get the closest nugget
            const nuggetList = this.spaceObjects.filter(element => element.type ==="nugget01")

            //first set shortestDistance to the maxAvailableDistance
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
            //draw the shield in a circle with radius shortestDistance
            device.width = shortestDistance
            device.height = shortestDistance
            const gElem = device._gElem
            if(gElem){
                this.spacecraft.gElement.appendChild(gElem)
            }
        }
        
        if(device instanceof Chissel && (keyboardController.isKeyPressed(" ") || this.gameEnvironment.joystick.fires)){
            device.activate()
            this.request.spaceObject.activeDevice = "chissel"
            
            const gElem = device._gElem
            let targetElement: SVGGraphicsElement
            
            gElem.setAttribute("class", "device")
            if(gElem){
                this.gameEnvironment.svgElement.insertBefore(device._gElem, this.spacecraft.gElement)
            }
            
            // get the viewport position of each blur-Element
            Array.from(gElem.children).forEach((element) => {
                
                const prevSibling = element.previousElementSibling as SVGGraphicsElement
                const nextSibling = element.nextElementSibling as SVGGraphicsElement
                
                if(prevSibling && nextSibling && element instanceof SVGGraphicsElement){
                    const prevRect = prevSibling.getBoundingClientRect()
                    const nextRect = nextSibling.getBoundingClientRect()
                    // when element is typeguarded as SVGGraphicsElement you cann access the bounding box but that returns undefined
                    const elementBBox = element.getBoundingClientRect()

                    const xDistanceRelation = (elementBBox.left - prevRect.left) / (nextRect.left - elementBBox.left)
                 /*   if(Math.abs(xDistanceRelation) > 2){
                        console.log("x-jump detected")
                        targetElement = element
                    //    console.log(`element.getAttribute("x"):`+ element.getAttribute("x")) // returns undefined
                    //    console.log(`prevSibling.getAttribute("x"): `+ prevSibling.getAttribute("x")) // returns undefined
                        element.setAttribute("x", "100")
                    }
                   */ 
                    // Iterate over the children of the gElement
                    for (let i = 0; i < gElem.children.length; i++) {
                        const child = gElem.children[i] 

                        // Stop adjusting positions when the target element is reached
                        if (child === targetElement) {
                            break;
                        }

                        if (child instanceof SVGGraphicsElement) {
                            // Adjust the position of the child element (before the target)
                            const currentX = parseFloat(child.getAttribute("x") || "0");
                            const currentY = parseFloat(child.getAttribute("y") || "0");
                            const deltaX = 2000
                            const deltaY = 0
                            // Apply the delta values to shift the positions
                            child.setAttribute("x", (currentX + deltaX).toString());
                            child.setAttribute("y", (currentY + deltaY).toString());
                        }
                    }
                    

                    this.taxiValue = xDistanceRelation.toString()
                    /*console.log(`Position relative to viewport: 
                                Left: ${elementBBox.left},
                                Top: ${elementBBox.top}`
                    )
                    */
                    
                
                }
            })

        }
        
        this.spacecraft.handleKeyboardInput(keyboardController.getKeysPressed());
        
        // draw the textArea in the upper left corner
        // Find the planet object within the spaceObjects array
        const planet: Spacecraft | undefined = this.spaceObjects.find(obj => obj.id === "planet");
        const station: Spacecraft | undefined = this.spaceObjects.find(obj => obj.id === "station")
        
        // extrahiere aus dem Array nested result die gewünschten Werte
        const nestedResult0 = this.response.nestedResults[0] as { _type: string; value: any[] }

        // Überprüfen, ob `nestedResult0` die erwartete Struktur hat
        if (nestedResult0 && nestedResult0._type === 'flatmap' && Array.isArray(nestedResult0.value)) {
            // Durchlaufe das `value`-Array in Zweierschritten
            for (let i = 0; i < nestedResult0.value.length; i += 2) {
                if (nestedResult0.value[i] === "playerScore" && typeof nestedResult0.value[i + 1] === "object" && "value" in nestedResult0.value[i + 1]) {
                    // Wert extrahieren
                    this.spacecraft.score = parseFloat(nestedResult0.value[i + 1].value);
                    break;
                }
            }
        }
         
        if(planet && station){
/*
            // extrahiere aus dem Array nested result die im server berechnete durchschnittliche Verarbeitungsdauer eines requests
            const nestedResult0 = this.response.nestedResults[0] as { _type: string; value: any[] }
            let averageProcessingTime;
  //          console.log(nestedResult0)
            
            // Überprüfen, ob `nestedResult0` die erwartete Struktur hat
            if (nestedResult0 && nestedResult0._type === 'flatmap' && Array.isArray(nestedResult0.value)) {
                // Durchlaufe das `value`-Array in Zweierschritten
                for (let i = 0; i < nestedResult0.value.length; i += 2) {
                    if (nestedResult0.value[i] === "average ms" && typeof nestedResult0.value[i + 1] === "object" && "value" in nestedResult0.value[i + 1]) {
                        // Wert extrahieren
                        averageProcessingTime = parseFloat(nestedResult0.value[i + 1].value);
                        break;
                    }
                }
            }
            /*reduce is an array method that takes a callback and an initial value (0 in this case).
                sum starts at 0 (the initial value).
                For each element in the array:
                Add element.score to the current sum.
                
*/          const totalScore: number = this.spacecraft.score +
            this.spaceObjects.reduce((sum, element) => sum + element.score, 0);
/*
            let totalScore: number = this.spacecraft.objectStatus.score
            this.spaceObjects.forEach((element) =>{
                totalScore += element.objectStatus.score
            })
*/          
            this.textArea.innerHTML = `total score: ${totalScore} 
                                        number of spaceObjects: ${this.spaceObjects.length}
                                        players online: ${this.response.nestedResults[0].value[5].value}
                                        your craftId: ${this.spacecraft.objectStatus.craftId}
                                        ${colliderMessage}`
        }

        /*else{}{
            console.log("nop planet found")
            this.textArea.innerHTML = `spacecraft location: ${this.spacecraft.location.x.toFixed(1)}, 
            ${this.spacecraft.location.y.toFixed(1)}`
        }
        */
       /*
        evaluate(spacePatrolRequest, request)
        .then(response => {
            this.syncReality(response)
        })
        .catch(error => {
            console.error("Failed to update spaceObjects:", error);
        });
        */
        this.updateElements();
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