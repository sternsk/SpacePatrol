//import { SpacecraftShape } from "./SpacecraftShape.js"
import { viewBoxWidth } from "./GameMenu.js"
import { color } from "./GameMenu.js"
import { Device } from "./Device.js"
import { DeviceFactory } from "./DeviceFactory.js"
import { polarVector, add, length, angle, distanceBetween, inverse } from "./library.js"
import { SpaceObjectStatus, Vector2d } from "./space-patrol-model.js" 
import { TractorBeam } from "./TractorBeam.js"
import { create } from "./library.js"

import SAT from "sat";
import SVGPathCollider from "./svg-path-collider/svg-path-collider.js"
import { SpaceObjectShape } from "./SpacecraftShape.js"
import { Chissel } from "./Chissel.js"

// fontsize should seems to depend on svg-Size
export let fontSize = window.innerHeight/80
console.log("window.innerWidth: "+window.innerWidth)
console.log("fontSize = window.innerHeight/80: "+window.innerHeight/80)
console.log()

export class Spacecraft{

    objectStatus: SpaceObjectStatus = create({ 
                                        
                                        activeDevice:"",
                                        collidable: false,
                                        craftId: "spaßcraft",
                                        direction: -60,
                                        focus: "",
                                        impuls: {x:0, y:0} as Vector2d,
                                        location: {x:50, y:50} as Vector2d,
                                        mass: 10,
                                        npc: false,
                                        rotation:0,
                                        type: "rocket",
                                        } )

    private _shape: SpaceObjectShape
    private _score: number = 0
    
    private _color: string
    private _touchControlType: string
    private easing = false
    private _maneuverability = 7
    private _directionCorrection = 90 
    
    private _device?: Device

    private _lastUpdate: number = Date.now()

    private _scale = 1
    
    private _label: SVGTextElement | undefined;
    private _labelBorder: SVGRectElement | undefined;
    
    constructor() {
                
        this.objectStatus.type = "rokket"
        this._color = "flün"
        this.objectStatus.craftId = "spacecraft"
        this._touchControlType = "spacecraft"
        this._shape = {gElement: document.createElementNS("http://www.w3.org/2000/svg", "g")}
       // this.gElement = this._spacecraftShape.gElement
        
    }

    accelerate(thrust: number) {
        let vector = polarVector(thrust, this.direction);
        this.objectStatus.impuls = add(this.objectStatus.impuls, vector)
    }

    addDevice(type: string, args:any[]){
        this._device = DeviceFactory.createDevice(type, ...args)
    }

    operate(){
        //aktiviere das Device
        this._device?.activate()
    
        // füge das gElement des Devices zum gElement des Spacecrafts hinzu.
        if(this._device?._gElem){
            this._device._gElem.setAttribute("id", "device")
            this._shape.gElement.appendChild(this._device._gElem)
            
        }
    }

    applyLabel(svgElement: SVGElement){
        this._labelBorder = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        svgElement.appendChild(this._labelBorder)
        this._labelBorder.setAttribute("x", `${this.scale*6.7}`)
        this._labelBorder.setAttribute("y", `${-fontSize}`)
        this._labelBorder.setAttribute("stroke-width", "2px")
        this._labelBorder.setAttribute("stroke", "grey")
        this._labelBorder.setAttribute("vector-effect", "non-scaling-stroke")
        this._labelBorder.setAttribute("fill","lightgrey")
        this._labelBorder.setAttribute("fill-opacity",".8")
        
        this._label = document.createElementNS("http://www.w3.org/2000/svg", "text")
        svgElement.appendChild(this._label)
        this._label.setAttribute("font-size", `${fontSize}px`)
        console.log("fontSize: "+fontSize)
        console.log("viewBoxWidth: "+viewBoxWidth)
        this._label.innerHTML = `<tspan x="${this._scale*7}">label text is yet to be written`
        
        setTimeout(()=>{//wait for the textelement to be positioned
            if(this._labelBorder && this._label){
            this._labelBorder.style.width = (this._label.getBBox().width* 1.1).toString()
            this._labelBorder.style.height = (this._label.getBBox().height* 1.1).toString()
            }
        })
    }

    setFontsize(newFontSize: number){
        fontSize = newFontSize
    }

    brake(dampingFactor: number): void {
        // Verringere die Geschwindigkeit um den Dämpfungsfaktor
        const newLength = length(this.objectStatus.impuls) * (1-dampingFactor)
        this.objectStatus.impuls = polarVector(newLength, angle(this.objectStatus.impuls))
        
        //  Stoppe die Bewegung vollständig, wenn die Geschwindigkeit einen bestimmten Schwellenwert unterschreitet
         if (length(this.objectStatus.impuls) < 0.01) {
            this.objectStatus.impuls.x = 0
            this.objectStatus.impuls.y = 0
        }
    }

    async gradualBrake(){
        
        while(length(this.objectStatus.impuls) > .01){
            this.brake(.1)
            await this.delay(100)
        }
        this.objectStatus.impuls.x = 0
        this.objectStatus.impuls.y = 0
    }

    private delay(ms: number){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    handleKeyboardInput(keysPressed: {[key: string]: boolean}) {
        if (keysPressed['ArrowLeft']) {
            this.rotate(-this._maneuverability);
        }
        
        if (keysPressed['ArrowRight']) {
            this.rotate(this._maneuverability);
        }
        
        if (keysPressed['ArrowUp']) {
            this.accelerate(this._maneuverability/50);
        }

        if (keysPressed['ArrowDown']) {
            this.brake(this._maneuverability/50);
        }
        if (keysPressed[' '] && !(this.device instanceof TractorBeam) && !(this.device instanceof Chissel)) {
            this.operate()
            
        }
        
    }

    onKeyUp(key: string) {
        switch (key){
            case " ":
                if(this.device){
                    this.device.dispose()
                }
        }

    }

    handleTouchControl(vector: Vector2d){
        let deltaAngle = this.objectStatus.direction - angle(vector)
        switch (this.objectStatus.type){
        case `rokket`:
            this.objectStatus.impuls = add(this.objectStatus.impuls, vector)
            this.objectStatus.direction = angle(vector)
            break
        
        case `rainbowRocket`:
            this.objectStatus.impuls = add(this.objectStatus.impuls, vector)
            if((deltaAngle > 0 && 
                deltaAngle < 180) || 
                deltaAngle < -180){
                this.rotate(-5)
            }
            else if(deltaAngle < 0 || 
                    deltaAngle > 180){
                this.rotate(5)
            }

            break
            
        case `../resources/bromber.svg`:
            this.objectStatus.impuls = add(this.objectStatus.impuls, vector)

            if(deltaAngle < -180)
                deltaAngle +=360
            if(deltaAngle > 180)
                deltaAngle -=360
            if(Math.abs(deltaAngle) > 8 ){ //prevent twikkling
                this.rotate(-180/deltaAngle)
            }

            break
            
        case `../resources/blizzer.png`:
            this.objectStatus.impuls = add(this.objectStatus.impuls, vector)

            if(!this.easing){
                this.easing = true
                const startDirection = this.objectStatus.direction
                this.ease(startDirection, angle(vector))
            }
            
            break
            
        case `../resources/eye.svg`:
            // get horizontal and vertical values of the vector
            const horizontalValue = vector.x
            const verticalValue = vector.y

            // add the vertical value to the impuls
            this.accelerate(-verticalValue)

            // adjust the rotation gradually to the horizontal value
            this.rotate(horizontalValue*this._maneuverability*50) 
            break

        default:
            this.objectStatus.impuls = add(this.objectStatus.impuls, vector)
            this.objectStatus.direction = angle(vector)
        }

        
    }

    async ease(oldDirection: number, target: number){
        const deltaAngle = target - this.objectStatus.direction
        let easeValue: number
        const steps = Math.ceil(Math.abs(deltaAngle))

        for(let i = 1; i <= steps; i++){
            easeValue = this.easeInOutBack(i/steps)
            this.objectStatus.direction = oldDirection + easeValue * deltaAngle
            await new Promise(resolve => setTimeout(resolve, 10)); // 10 ms delay
        }
        this.easing = false
        
    }
    
    easeInOutBack(x:number): number {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return x < 0.5 ?
            (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
           :(Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    }

    pseudoOrbit(vector: Vector2d){
        const distance = distanceBetween(vector, this.objectStatus.location)
        if (distance < viewBoxWidth/2)
            this._scale = Math.cos(distance/(viewBoxWidth/4) * Math.PI/4)
        if (distance > viewBoxWidth/2){
            inverse(this.objectStatus.impuls)
        }
    }

    rotate(angle: number){
        this.objectStatus.direction += angle
        if(this.objectStatus.direction > 180){
            this.objectStatus.direction -= 360
        }else if(this.objectStatus.direction < -180){
            this.objectStatus.direction += 360
        }
    }

    get score(): number{
        return this._score
    }

    set score(n: number){
        this._score = n
    }

    get shape(): SpaceObjectShape{
        return this._shape
    }
    set shape(shape: SpaceObjectShape){
        this._shape = shape
    }

    set collidable(coll: boolean){
        this.objectStatus.collidable = coll
    }

    get collidable(): boolean{
        return this.objectStatus.collidable
    }

    get collider(): SVGPathCollider | undefined{
        if(this.shape.collider)
            return this.shape.collider
        else return undefined
    }

    set collider(collider: SVGPathCollider){
        this.shape.collider = collider
    }


    get direction(): number{
        return this.objectStatus.direction
    }

    get directionCorrection(): number{
        return this._directionCorrection
    }

    set direction(x: number) {
        this.objectStatus.direction = x
    }

    get device(): Device | undefined{
        if(this._device) return this._device
        else return undefined
    }

    get label(){
        return(this._label)
    }

    get labelBorder(){
        return(this._labelBorder)
    }
    
    get lastUpdate(): number{
        return this._lastUpdate
    }

    get location(): Vector2d{
        return this.objectStatus.location
    }

    get npc(){
        return this.objectStatus.npc
    }

    set location(location: Vector2d) {
        this.objectStatus.location = location
    }
    get scale(){
        return(this._scale)
    }
/*
    get spacecraftShape(): SpacecraftShape | undefined{
        if(this._spacecraftShape)
            return this._spacecraftShape
    }

    set spacecraftShape(sp: SpacecraftShape){
        this._spacecraftShape = sp
        this.gElement = sp.gElement
    }
*/
    
    get type(): string{
        return this.objectStatus.type
    }

    set type(type: string) {
        this.objectStatus.type = type
    }

    get color(): string{
        return this._color
    }

    set color(color: string) {
        this._color = color
    }

    get id(): string{
        return this.objectStatus.craftId
    }

    set id(id: string) {
        this.objectStatus.craftId = id
    }
    
    get gElement(): SVGGElement{
        return(this.shape.gElement)
    }

    set gElement(g:SVGGElement){
        this.shape.gElement = g
    }

    set directionCorrection(n: number){
        this._directionCorrection = n
    }
    set scale(scale: number){
        this._scale = scale
    }

    set touchControlType(newType: string){
        if(newType === "rokket" || newType === "rainbowRocket")
            this._touchControlType = "spacecraft"
        else this._touchControlType = "butterfly"
    }

    setLabelText(text: string){
        if(this._label){
            this._label.setAttribute("font-family", "Arial")
            this._label.setAttribute("stroke-width", ".05")
            this._label.setAttribute("stroke", `${color}`)
            this._label.innerHTML = text
        }
        //Border rectangle
        if(this._labelBorder && this._label){
            this._labelBorder.style.width = (this._label.getBBox().width* 1.1).toString()
            this._labelBorder.style.height = (this._label.getBBox().height* 1.1).toString()
        }
    }
    
    update() {
        // npcs get updates on the server
        if(!this.npc){
            this.objectStatus.location = add(this.objectStatus.impuls, this.objectStatus.location);
            this.direction += this.objectStatus.rotation
        }
        // but scale must be updated in client
        // there should be a render method somewhere.... in SpaceGame...

       
    }

    vanish(){
        
        
        const animate = ()=>{
            if (this._scale > .1){
                this._scale -= this._scale/100
                this.update()
                requestAnimationFrame(animate)
                console.log("this._scale: "+this.scale)
        

            } else {
                this.gElement.parentNode?.removeChild(this.gElement)
                console.log("removed at: "+this._scale)
                if(this._label){
                    this._label.parentNode?.removeChild(this._label)
                    this._labelBorder?.parentNode?.removeChild(this._labelBorder)
                    
        
                }
            } 
        }
        animate()
    }
}
