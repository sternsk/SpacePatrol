import { Spacecraft } from "./Spacecraft.js";
import { viewBoxHeight } from "./start.js";


export class GameEnvironment{
    viewBoxLeft = -100
    viewBoxTop = -100
    viewBoxWidth = 200
    viewBoxHeight = 200
    private _svgElement: SVGSVGElement;

    constructor(gameFrame: HTMLElement){
        this._svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._svgElement.setAttribute("viewBox", "-100, -100, 200, 200")// different result: `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${viewBoxHeight}`)
        this._svgElement.setAttribute("tabindex", "0")
        
        gameFrame.appendChild(this._svgElement)
    }

    get svgElement(){
        return(this._svgElement);
    }

    handleSpacecraft(spacecraft: Spacecraft){
        //check if spaceCraft is outside the viewBox and do something, place it in again, widen viewbox etc
    }

    
} 