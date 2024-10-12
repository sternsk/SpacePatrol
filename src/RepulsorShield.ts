import { Device } from "./Device";

export class RepulsorShield implements Device{
    name = "repulsorShield";
    _width: number;
    _height: number; 
    _gElem = document.createElementNS("http://www.w3.org/2000/svg", "g");
    activated = false;
    //cycleCount = 0
    
    constructor(shieldWidth: number, shieldHeight: number){
        this._gElem.setAttribute("class", "ovalShield")
        this._width = shieldWidth
        this._height = shieldHeight

    }

    activate(): void {
        const boundingOval = document.createElementNS("http://www.w3.org/2000/svg", "ellipse")
        if(!this.activated){
            boundingOval.setAttribute("cx", "0")
            boundingOval.setAttribute("cy", "0")
            boundingOval.setAttribute("vector-effect", "none-scaling-stroke")
            boundingOval.setAttribute("stroke-width", "2px")
            boundingOval.setAttribute("stroke", "white")
            boundingOval.setAttribute("fill", "none")
            this._gElem.appendChild(boundingOval)
            this.activated = true
        }
        boundingOval.setAttribute("rx", `${this._width}`)
        boundingOval.setAttribute("ry", `${this._height}`)

        //`rgb(${this.cycleCount}, ${Math.floor(this.cycleCount/2)}, ${Math.floor(this.cycleCount/3)})`)
        //this.cycleCount++
        
    }

    deactivate(): void {
        this._gElem.innerHTML = ""
        this.activated = false
    }
    
    dispose(): void {
        this.deactivate()
    }
    set width(width: number){
        this._width = width
    }
    set height(height: number){
        this._height = height
    }
}