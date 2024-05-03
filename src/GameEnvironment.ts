import { Spacecraft } from "./Spacecraft.js";
import { Joystick } from "./Joystick.js";
import { viewBoxHeight } from "./start.js";


export class GameEnvironment{
    aspectRatio: number 
    // center zero in viewBox
    viewBoxHeight: number 
    viewBoxWidth: number
    viewBoxLeft: number 
    viewBoxTop: number 

    private _svgElement: SVGSVGElement;
    private _label: HTMLLabelElement = document.createElement("label");
    private _joystick = new Joystick()
        
    constructor(gameFrame: HTMLElement){
        
        
        if(gameFrame.offsetHeight != 0){
            console.log("gameFrame.offsetWidth / gameFrame.offsetHeight: "+gameFrame.offsetWidth / gameFrame.offsetHeight)
            this.aspectRatio = gameFrame.offsetWidth / gameFrame.offsetHeight
        }
        else{
            console.log("gameFrame not properly sized")
            this.aspectRatio = .8
        }    
        
        this.viewBoxWidth = 200
        this.viewBoxHeight = this.viewBoxWidth / this.aspectRatio
        this.viewBoxLeft = -this.viewBoxWidth / 2
        this.viewBoxTop = -this.viewBoxHeight / 2
        
        this._svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._svgElement.style.position = "absolute"
        this._svgElement.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${this.viewBoxHeight}` ) 
        this._svgElement.setAttribute("tabindex", "0")

        this._label.style.position = "absolute"
        this._label.setAttribute("width", "100px")
        this._label.setAttribute("height", "40px")
        this._label.setAttribute("top","400px")
        this._label.setAttribute("left","200px")
        this._label.textContent = "label"
        
        //this._svgElement.style.height = `100%`
        
        gameFrame.appendChild(this._svgElement)
        gameFrame.style.position = "relative"
        console.log("window.innerHeight: "+window.innerHeight)
        gameFrame.style.height =  `${window.innerHeight}px`
        
        gameFrame.appendChild(this._label)
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

    setLabel(string: string){
        this._label.textContent = string
    }

    
} 