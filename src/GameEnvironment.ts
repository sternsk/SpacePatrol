import { Spacecraft } from "./Spacecraft.js";
import { viewBoxHeight } from "./start.js";
import { Joystick } from "./Joystick.js";


export class GameEnvironment{
    viewBoxLeft = -100
    viewBoxTop = -100
    viewBoxWidth = 200
    viewBoxHeight = 200
    private _svgElement: SVGSVGElement;
    private _joystick = new Joystick()
        
    constructor(gameFrame: HTMLElement){
        this._svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        this._svgElement.setAttribute("viewBox", "-100, -100, 200, 350") // different result: `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${viewBoxHeight}`
        
        this._svgElement.setAttribute("tabindex", "0")
        
        //this._svgElement.style.height = `100%`
        
        gameFrame.appendChild(this._svgElement)
        gameFrame.style.position = "relative"
        console.log("window.innerHeight: "+window.innerHeight)
        gameFrame.style.height =  `${window.innerHeight}px`
        
        gameFrame.appendChild(this._joystick.joystickElement)
        //this._joystick.container.setAttribute("x", "0")
        //this._joystick.container.setAttribute("y", "0")
        
        this.joystick.joystickElement.style.display = "none"
    }

    enableTouchControl(){
        this.joystick.joystickElement.style.display = "block"
        //this.joystick.container.setAttribute("transform","translate(0,0)")
    }

    get joystick(){
        return this._joystick
    }
    

    get svgElement(){
        return(this._svgElement);
    }

    handleSpacecraft(spacecraft: Spacecraft){
        //check if spaceCraft is outside the viewBox and do something, place it in again, widen viewbox etc
    }

    
} 