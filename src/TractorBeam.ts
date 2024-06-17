import { Device } from "./Device";

export class TractorBeam implements Device{
    name = "tractorBeam";
    target: {x: number, y:number} = {x:0,y:0}
    activated = false
    _gElem: SVGGElement;

    constructor(){
        this._gElem = document.createElementNS("http://www.w3.org/2000/svg", "g")
        
    }

    activate(): void {
        if(!this.activated){
            const beam = document.createElementNS("http://www.w3.org/2000/svg", "line")
            beam.setAttribute("x1", "0")
            beam.setAttribute("y1", "0")
            beam.setAttribute("x2", `${this.target.x}`)
            beam.setAttribute("y2", `${this.target.y}`)
            beam.setAttribute("stroke", "darkgreen")
            beam.setAttribute("stroke-width", "5px")
            beam.setAttribute("vector-effect","non-scaling-stroke")
            
            this._gElem.appendChild(beam)
        }
        
    }
    deactivate(): void {
        this._gElem.innerHTML = ""
        this.activated = false
    }
    dispose(): void {
        if (this._gElem && this._gElem.parentNode) {
            this._gElem.innerHTML = ""
            this._gElem.parentNode.removeChild(this._gElem);
        }
        this.activated = false;
    }
    
    setTarget(target:{x:number, y:number}){
        this.target = target
    }

}