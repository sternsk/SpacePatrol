import { Device } from "./Device";

export class OvalShield implements Device{
    name = "ovalShield";
    width: number;
    height: number; 
    _gElem = document.createElementNS("http://www.w3.org/2000/svg", "g");
    activated = false;
    
    constructor(shieldWidth: number, shieldHeight: number){
        this._gElem.setAttribute("class", "ovalShield")
        this.width = shieldWidth
        this.height = shieldHeight

    }

    activate(): void {
        
        if(!this.activated){
            const boundingOval = document.createElementNS("http://www.w3.org/2000/svg", "ellipse")
            boundingOval.setAttribute("cx", "0")
            boundingOval.setAttribute("cy", "0")
            boundingOval.setAttribute("rx", `${this.width*2}`)
            boundingOval.setAttribute("ry", `${this.height*2}`)
            boundingOval.setAttribute("stroke", "green")
            boundingOval.setAttribute("vector-effect", "none-scaling-stroke")
            boundingOval.setAttribute("stroke-width", "2px")
            boundingOval.setAttribute("fill", "none")

            this._gElem.appendChild(boundingOval)
            
            this.activated = true
        }
    }

    deactivate(): void {
        this._gElem.innerHTML = ""
        this.activated = false
    }
    
    dispose(): void {
        throw new Error("Method not implemented.");
    }

}