import { SpacecraftShape } from "./SpacecraftShape.js"
import { viewBoxWidth } from "./index.js"
import { color } from "./GameMenu.js"
import { Device } from "./Device.js"
import { DeviceFactory } from "./DeviceFactory.js"
import { SpaceObjectStatus, polarVector, add, length, angle, distanceBetween, Vector2d, inverse } from "./library.js"
//import { Vector2D } from "./Vector2D.js"

// fontsize should be depending on screenresolution
export let fontSize = window.innerWidth/40
console.log("window.innerWidth: "+window.innerWidth)

export class Spacecraft implements SpaceObjectStatus{

    // ersetze die properties durch objectStatus.property
    //
    //_location = {x: 0, y:0} as Vector2d;
    //_impuls = {x: 0, y:0} as Vector2d;
    //_direction = 0;
    //_id: string = "spacecraft";
    //_type: string = "rokket";

    objectStatus: SpaceObjectStatus = { location: {x:0, y:0} as Vector2d,
                                        impuls: {x:0, y:0} as Vector2d,
                                        direction: 0,
                                        id: "spacecraft",
                                        type: "rokket",
                                        } 
    
    
    private _gElement: SVGGElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
    private _color: string
    private _touchControlType: string
    private easing = false
    private _maneuverability = 2
    private _npc = false

    private _device?: Device

    private _lastUpdate: number = Date.now()

    private _scale = 1
    
    private _label: SVGTextElement | undefined;
    private _labelBorder: SVGRectElement | undefined;
    
    constructor() {
                
        this.objectStatus.type = "rocket"
        this._color = "flün"
        this.objectStatus.id = "spacecraft"
        this._touchControlType = "spacecraft"
    }

    accelerate(thrust: number) {
        let vector = polarVector(thrust, this.direction);
        this.objectStatus.impuls = add(this.objectStatus.impuls, vector)
    }

    addDevice(type: string, args:any[]){
        this._device = DeviceFactory.createDevice(type, ...args)
    }

    getDevice<T extends Device>(deviceType: new (...args: any[]) => T): T | null {
        if (this.device instanceof deviceType) {
            return this.device as T;
        }
        return null;
    }

    operate(){
        //aktiviere das Device
        this._device?.activate()
        
        // füge das gElement des Devices zum gElement des Spacecrafts hinzu.
        if(this._device?._gElem){
            this._gElement.appendChild(this._device._gElem)
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
        this._label.innerHTML = `<tspan x="${this._scale*7}">label text is yet to be written`
        
        setTimeout(()=>{//wait for the textelement to be positioned
            if(this._labelBorder && this._label){
            this._labelBorder.style.width = (this._label.getBBox().width* 1.1).toString()
            this._labelBorder.style.height = (this._label.getBBox().height* 1.1).toString()
            }
        })
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
            this.accelerate(this._maneuverability/100);
        }

        if (keysPressed['ArrowDown']) {
            this.brake(this._maneuverability/10);
        }
        if (keysPressed[' ']) {
            this.operate()
        }
        
    }

    onKeyUp(key: string) {
        switch (key){
            case " ":
                if(this.device)
                    this.device.deactivate()

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
            await new Promise(resolve => setTimeout(resolve, 10)); // 100 ms delay
        }
        this.easing = false
        
    }
    
    easeInOutBack(x:number): number {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return x < 0.5
           ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
           : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    }

    pseudoOrbit(vector: Vector2d){
        const distance = distanceBetween(vector, this.objectStatus.location)
        if (distance < viewBoxWidth/2)
            this._scale = Math.cos(distance/(viewBoxWidth/4) * Math.PI/4)
        if (distance > viewBoxWidth/2){
            inverse(this.impuls)
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

    get direction(): number{
        return this.objectStatus.direction
    }

    get device(): Device | undefined{
        if(this._device) return this._device
        else return undefined
    }

    get label(){
        return(this._label)
    }

    get impuls(): Vector2d{
        return this.objectStatus.impuls
    }
    get lastUpdate(): number{
        return this._lastUpdate
    }

    get location(): Vector2d{
        return this.objectStatus.location
    }

    get npc(){
        return this._npc
    }

    set location(location: Vector2d) {
        this.objectStatus.location = location
    }
    get scale(){
        return(this._scale)
    }
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
        return this.objectStatus.id
    }

    set id(id: string) {
        this.objectStatus.id = id
    }
    
    get gElement(): SVGGElement{
        return(this._gElement)
    }

    set gElement(g:SVGGElement){
        this._gElement = g
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
       // if(this._location instanceof Vector2D && this._impuls instanceof Vector2D)
       this.location = add(this.objectStatus.impuls, this.objectStatus.location);
        
        this.gElement.setAttribute("transform", `translate (${this.objectStatus.location.x} ${this.objectStatus.location.y}) scale (${this._scale}) rotate (${this.direction + 90})`)
        
        if(this._label && this._labelBorder){
            this._label.setAttribute("transform", `translate(${this.objectStatus.location.x} ${this.objectStatus.location.y})`)
            this._labelBorder.setAttribute("transform", `translate(${(this.objectStatus.location.x-7.5)+this.scale*7}, ${this.objectStatus.location.y})`)
        }
        
    }

    vanish(){
        const animate = ()=>{
            if (this._scale > .1){
                this._scale -= this._scale/100
                this.update()
                requestAnimationFrame(animate)

            } else {
                this._gElement.parentNode?.removeChild(this._gElement)
                if(this._label){
                    this._label.parentNode?.removeChild(this._label)
                    this._labelBorder?.parentNode?.removeChild(this._labelBorder)
                }
            } 
        }
        animate()
    }
}
