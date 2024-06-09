import { Device } from "./Device.js"

export class TriangularBeam implements Device{
    name = "TriangularBeam"
    count: number = 12
    _gElem: SVGGElement = document.createElementNS("http://www.w3.org/2000/svg", "g")
    activated = false
    
    constructor(){
    }

    activate(){
        if(!this.activated){
            for(let i = 0; i < this.count; i++){
                const particle = document.createElementNS("http://www.w3.org/2000/svg", "path")
                particle.setAttribute("class","particle")
                particle.setAttribute("d",`M -2 ${-i*5-2},
                                            L 0 ${-i*5-10}, 
                                            L 2 ${-i*5-2}`)
                particle.setAttribute("stroke",`rgb(${(i+100)/this.count*255}, ${(i*2)/this.count*255}, ${(i/3)/this.count*255}`)
                particle.setAttribute("stroke-width","2px")
                particle.setAttribute("vector-effect","non-scaling-stroke")
                
                particle.setAttribute("fill","none")
                //particle.setAttribute("opacity",`${-i / this.count + this.count}`)
                //console.log(-this.count * i / this.count)
                this._gElem.appendChild(particle)
            }
            this.activated = true
        }
        
    }

    deactivate(){
        this._gElem.innerHTML = ""
        this.activated = false
    }
    
    dispose() {
        if (this._gElem && this._gElem.parentNode) {
            this._gElem.innerHTML = ""
            this._gElem.parentNode.removeChild(this._gElem);
        }
        this.activated = false;
    }
    


    get gElem(){
        return this._gElem
    }
}