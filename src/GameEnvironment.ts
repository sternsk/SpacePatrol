import { Spacecraft } from "./Spacecraft.js";
import { Joystick } from "./Joystick.js";

export let viewBoxWidth = 200;

export class GameEnvironment{
    aspectRatio: number 
    
    viewBoxHeight: number 
    viewBoxWidth: number
    viewBoxLeft: number 
    viewBoxTop: number 

    private label = document.createElement("HTMLLabelElement")
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

        this.label.style.position = "absolute"
        this.label.style.top = "10px"
        this.label.style.left = "10px"
        this.label.style.border = "3px solid darkgreen"
        this.label.style.backgroundColor = "lightgrey"
        this.label.style.opacity = "0.8"
        this.label.innerHTML = `gameFrame.clientWidth: ${gameFrame.clientWidth}, gameFrame.clientHeight: ${gameFrame.clientHeight}<br>
                                    window.innerWidth: ${window.innerWidth}, window.innerHeight: ${window.innerHeight}<br>
                                    this.viewBoxWidth: ${this.viewBoxWidth}, this.viewBoxHeight: ${this.viewBoxHeight}<br>
                                    this._svgElement.getAttribute("viewBox"): ${this._svgElement.getAttribute("viewBox")}`
        gameFrame.appendChild(this.label)

        document.addEventListener(`resize`, this.handleResize) 

    
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

    handleResize(){
        
    }

    handleSpacecraft(spacecraft: Spacecraft, option: string){
        switch (option){
            case "pseudoOrbit":
                spacecraft.pseudoOrbit
                break;
            case "pseudoTorus":
                if(spacecraft.location.x < this.viewBoxLeft)
                    spacecraft.location.x = this.viewBoxLeft + viewBoxWidth
                if(spacecraft.location.x > this.viewBoxLeft + viewBoxWidth)
                    spacecraft.location.x = this.viewBoxLeft
                if (spacecraft.location.y < this.viewBoxTop)
                    spacecraft.location.y = this.viewBoxTop + this.viewBoxHeight
                if(spacecraft.location.y > this.viewBoxTop + this.viewBoxHeight)
                    spacecraft.location.y = this.viewBoxTop

                break;
        }
    }
} 