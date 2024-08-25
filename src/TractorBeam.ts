import { Device } from "./Device";
import { Vector2d, length } from "./library";


export class TractorBeam implements Device{
    name = "tractorBeam";
    target: {x: number, y:number} = {x:0,y:0}
    activated = false
    _gElem: SVGGElement;

    constructor(){
        this._gElem = document.createElementNS("http://www.w3.org/2000/svg", "g")
        this._gElem.setAttribute("id", "device")
    }

    activate(target: Vector2d): void {
        this.target = target
        const beam = document.createElementNS("http://www.w3.org/2000/svg", "line")
        if(!this.activated){
            beam.setAttribute("id", "beam")
            beam.setAttribute("x1", "0")
            beam.setAttribute("y1", "0")
            beam.setAttribute("vector-effect","non-scaling-stroke")
            this._gElem.appendChild(beam)
            this.activated = true
        }
        beam.setAttribute("x2", `${this.target.x}`)
        beam.setAttribute("y2", `${this.target.y}`)
        //beam.setAttribute("stroke-width", `20`)
        //beam.setAttribute("stroke", `rgb(${Math.floor(Math.random())*255},${Math.floor(Math.random())*255},${Math.floor(Math.random())*255})`)
        //beam.setAttribute("stroke", `rgb(${250}, ${0}, ${50})`)
        beam.setAttribute("stroke", `rgb(${Math.floor(Math.random()*255)}, 
                                        ${Math.floor(Math.random()*255)}, 
                                        ${Math.floor(Math.random()*255)})`)
        beam.setAttribute("stroke-width", `${100 / length(target)}`)
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