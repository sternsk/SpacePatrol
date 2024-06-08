import { SpacecraftShape } from "./SpacecraftShape.js"
import { Vector2D } from "./Vector2D.js"
import { viewBoxWidth } from "./GameEnvironment.js"
import { color } from "./GameMenu.js"
import { Device } from "./Device.js"
import { DeviceFactory } from "./DeviceFactory.js"

export let fontSize = viewBoxWidth/45

export class Spacecraft {
    private _gElement: SVGGElement = document.createElementNS("http://www.w3.org/2000/svg", "g")
    private _type: string
    private _color: string
    private _id: string
    private _touchControlType: string
    private easing = false
    private _direction = 0
    private _maneuverability = 2
    private _impuls = new Vector2D()
    private _location = new Vector2D()
    private _npc = false

    _device?: Device

    private _lastUpdate: number = Date.now()

    private _scale = 1
    
    private _label: SVGTextElement | undefined;
    private _labelBorder: SVGRectElement | undefined;
    
    constructor() {
        this._type = "rocket"
        this._color = "flün"
        this._id = "spacecraft"
        this._touchControlType = "spacecraft"
    }

    accelerate(thrust: number) {
        let vector = Vector2D.fromLengthAndAngle(thrust, this.direction);
        this._impuls.add(vector)
    }

    addDevice(type: string){
        this._device = DeviceFactory.createDevice(type)
    }

    operate(){
        
        this._device?.activate()
        if(this._device?._gElem){
            this._gElement.appendChild(this._device?._gElem)
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
        this._label.innerHTML = `<tspan x="${this._scale*7}">label text not set yet, yet to be written`
        
        setTimeout(()=>{//wait for the textelement to be positioned
            if(this._labelBorder && this._label){
            this._labelBorder.style.width = (this._label.getBBox().width* 1.1).toString()
            this._labelBorder.style.height = (this._label.getBBox().height* 1.1).toString()
            }
        })
    }

    brake(dampingFactor: number): void {
        // Verringere die Geschwindigkeit um den Dämpfungsfaktor
        const newLength = this._impuls.length * (1-dampingFactor)
        this._impuls = Vector2D.fromLengthAndAngle(newLength, this._impuls.angle)
        
        //  Stoppe die Bewegung vollständig, wenn die Geschwindigkeit einen bestimmten Schwellenwert unterschreitet
         if (this._impuls.length < 0.01) {
            this._impuls = new Vector2D(0, 0)
        }
    }

    async gradualBrake(){
        
        while(this._impuls.length > .01){
            this.brake(.1)
            await this.delay(100)
        }
        this._impuls = new Vector2D(0, 0)
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
        if (!keysPressed[' ']) {
            if(this._device)
            this._device.dispose()
        }
    }

    handleTouchControl(vector: Vector2D){
        let deltaAngle = this._direction - vector.angle
        switch (this._type){
        case `rokket`:
            this._impuls.add(vector)
            this._direction = vector.angle
            break
        
        case `rainbowRocket`:
            this._impuls.add(vector)
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
            this._impuls.add(vector)

            if(deltaAngle < -180)
                deltaAngle +=360
            if(deltaAngle > 180)
                deltaAngle -=360
            if(Math.abs(deltaAngle) > 8 ){ //prevent twikkling
                this.rotate(-180/deltaAngle)
            }

            break
            
        case `../resources/blizzer.png`:
            this._impuls.add(vector)

            if(!this.easing){
                this.easing = true
                const startDirection = this._direction
                this.ease(startDirection, vector.angle)
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
            this._impuls.add(vector)
            this._direction = vector.angle
        }

        
    }

    async ease(oldDirection: number, target: number){
        const deltaAngle = target - this._direction
        let easeValue: number
        const steps = Math.ceil(Math.abs(deltaAngle))

        for(let i = 1; i <= steps; i++){
            easeValue = this.easeInOutBack(i/steps)
            this._direction = oldDirection + easeValue * deltaAngle
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

    pseudoOrbit(vector: Vector2D){
        const distance = this._location.distanceTo(vector)
        if (distance < viewBoxWidth/2)
            this._scale = Math.cos(distance/(viewBoxWidth/4) * Math.PI/4)
        if (distance > viewBoxWidth/2){
            this.impuls.inverse()
        }
    }

    rotate(angle: number){
        this._direction += angle
        if(this._direction > 180){
            this._direction -= 360
        }else if(this._direction < -180){
            this._direction += 360
        }
    }

    get direction(): number{
        return this._direction
    }
    get label(){
        return(this._label)
    }

    get impuls(): Vector2D{
        return this._impuls
    }
    get lastUpdate(): number{
        return this._lastUpdate
    }

    get location(): Vector2D{
        return this._location
    }

    get npc(){
        return this._npc
    }

    set location(location: Vector2D) {
        this._location = location
    }
    get scale(){
        return(this._scale)
    }
    get type(): string{
        return this._type
    }

    set type(type: string) {
        this._type = type
    }

    get color(): string{
        return this._color
    }

    set color(color: string) {
        this._color = color
    }

    get id(): string{
        return this._id
    }

    set id(id: string) {
        this._id = id
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

    tractorBeam(vector: Vector2D): SVGElement{
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("id", `tractorBeam`)
        line.setAttribute("x1", `${this._location.x}`)
        line.setAttribute("y1", `${this._location.y}`)
        line.setAttribute("x2", `${vector.x}`)
        line.setAttribute("y2", `${vector.y}`)
        line.setAttribute("stroke", "darkgreen")
        line.setAttribute("stroke-width", "5px")
        return line

    }
    
    update() {
       // if(this._location instanceof Vector2D && this._impuls instanceof Vector2D)
        this._location.add(this._impuls);
        
        this.gElement.setAttribute("transform", `translate (${this._location.x} ${this._location.y}) scale (${this._scale}) rotate (${this.direction + 90})`)
        
        if(this._label && this._labelBorder){
            this._label.setAttribute("transform", `translate(${this._location.x} ${this._location.y})`)
            this._labelBorder.setAttribute("transform", `translate(${(this._location.x-7.5)+this.scale*7}, ${this._location.y})`)
        }
        
    }

    updateFromJSON(json: Record<string, any>): void{
        this._direction = json.direction
        this._impuls = Vector2D.fromJSON(json.impuls)
        this._location = new Vector2D(json.location.x, json.location.y)
        this._lastUpdate = json.lastUpdate
    }

    // Convert Spacecraft object to JSON representation
    toJSON(): Record<string, any> {
        this._lastUpdate = Date.now()
        return {
            type: this._type,
            color: this._color,
            id: this._id,
            direction: this._direction,
            impuls: this._impuls.toJSON(),
            location: this._location.toJSON(),
            lastUpdate: this._lastUpdate,  //apply timestamp each time the vessel is transformed to JSON
            npc: this._npc

        };
    }

    // Create a Spacecraft object from a JSON representation
    static fromJSON(json: Record<string, any>): Spacecraft {
        const spacecraft = new Spacecraft()
        spacecraft._type = json.type
        spacecraft._color = json.color
        spacecraft._id = json.id
        spacecraft._npc = json.npc
        
        spacecraft._direction = json.direction;
        spacecraft._impuls = new Vector2D(json.impuls.x, json.impuls.y)
        spacecraft._location = new Vector2D(json.location.x, json.location.y) 
        
        spacecraft._gElement = SpacecraftShape.getCraftGElement(spacecraft.type)
        return spacecraft;
    }

    // Update spacecraft properties from another spacecraft object
    updateFrom(other: Spacecraft) {
        this._direction = other.direction;
        this._impuls = other._impuls;
        this._location = other._location;
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
