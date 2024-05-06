import { Spacecraft } from "./Spacecraft.js";
import { Joystick } from "./Joystick.js";

export let viewBoxWidth = 50;

export class GameEnvironment{
    aspectRatio: number 
    
    viewBoxHeight: number 
    viewBoxWidth: number
    viewBoxLeft: number 
    viewBoxTop: number 

    private _svgElement: SVGSVGElement;
    
    private _joystick = new Joystick()
        
    constructor(gameFrame: HTMLElement){
        
        
        if(gameFrame.offsetHeight != 0){
            this.aspectRatio = gameFrame.offsetWidth / gameFrame.offsetHeight
        }
        else{
            console.log("gameFrame not properly sized")
            this.aspectRatio = .8
        }    
        
        this.viewBoxWidth = viewBoxWidth
        this.viewBoxHeight = this.viewBoxWidth / this.aspectRatio
        // center zero in viewBox
        this.viewBoxLeft = -this.viewBoxWidth / 2
        this.viewBoxTop = -this.viewBoxHeight / 2
        
        this._svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._svgElement.style.position = "absolute"
        this._svgElement.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${this.viewBoxHeight}` ) 
        this._svgElement.setAttribute("tabindex", "0")

        gameFrame.appendChild(this._svgElement)
        gameFrame.style.position = "relative"
        gameFrame.style.height =  `${window.innerHeight}px`
        
        gameFrame.appendChild(this._joystick.htmlElement)
        
        this.joystick.htmlElement.style.display = "none"
    
    }

    enableTouchControl(){
        this.joystick.htmlElement.style.display = "block"
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