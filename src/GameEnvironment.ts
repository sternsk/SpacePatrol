import { Spacecraft } from "./Spacecraft.js";
import { Joystick } from "./Joystick.js";
import { gameFrame } from "./GameMenu.js";
import { polarVector, length, angle } from "./library.js";

export class GameEnvironment{
    screenAspectRatio: number
    viewBoxToScreenRatio: number 
    viewBoxWidth: number
    viewBoxHeight: number 
    viewBoxLeft: number 
    viewBoxTop: number 

    private label = document.createElement("HTMLLabelElement")
    private _svgElement: SVGSVGElement;
    //private _viewBoxBorder: SVGRectElement;
    
    private _joystick = new Joystick()
        
    constructor(){
        
        if(gameFrame.offsetHeight != 0){
            this.screenAspectRatio = gameFrame.offsetWidth / gameFrame.offsetHeight
            console.log("gameFrame.offsetWidth: "+gameFrame.offsetWidth)
            console.log("gameFrame.clientWidth: "+gameFrame.clientWidth)
            console.log("window.innerWidth: "+window.innerWidth)
            console.log("this.screenAspectRatio: "+this.screenAspectRatio)

        }
        else{
            console.log("gameFrame not properly sized")
            this.screenAspectRatio = .8
        }    
        
        this.viewBoxWidth = 300 //convenient viewBoxWidth
        this.viewBoxToScreenRatio = this.viewBoxWidth / window.innerWidth
        this.viewBoxHeight = this.viewBoxWidth / this.screenAspectRatio
        // center zero in viewBox
        this.viewBoxLeft = -this.viewBoxWidth / 2
        this.viewBoxTop = -this.viewBoxHeight / 2
        
        this._svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.insertBackgroundImage()
        this._svgElement.style.position = "absolute"
       //prevent a focus border around the svg-Element
        // this._svgElement.style.outline = "none"
       //draw a border around the svg-Element 
       //this._svgElement.style.border = "5px solid red"
        
        this._svgElement.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${this.viewBoxHeight}` ) 
        this._svgElement.setAttribute("tabindex", "0")

        /* viewBox seems to be resized by Chrome at windowresize 
        
        this._viewBoxBorder = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        this._viewBoxBorder.setAttribute("id", "_viewBoxBorder")
        this._viewBoxBorder.setAttribute("x", `${this.viewBoxLeft}`)
        this._viewBoxBorder.setAttribute("y", `${this.viewBoxTop}`)
        this._viewBoxBorder.setAttribute("width", `${this.viewBoxWidth}`)
        this._viewBoxBorder.setAttribute("height", `${this.viewBoxHeight}`)
        this._viewBoxBorder.setAttribute("fill", `none`)
        this._viewBoxBorder.setAttribute("stroke-width", `2px`)
        this._viewBoxBorder.setAttribute("stroke", `green`)
        this._svgElement.appendChild(this._viewBoxBorder)
        */
        gameFrame.appendChild(this._svgElement)
        gameFrame.style.height = `${window.innerHeight}px`
        gameFrame.appendChild(this._joystick.htmlElement)
        gameFrame.appendChild(this._joystick.fireButton)
        
        this.joystick.htmlElement.style.display = "none"
        /*
        this.label.style.position = "absolute"
        this.label.style.top = "10px"
        this.label.style.left = "10px"
        this.label.style.border = "2px solid darkgreen"
        this.label.style.backgroundColor = "lightgrey"
        this.label.style.opacity = "0.8"
        this.label.innerHTML = `Steuere dein Raumschiff mit dem linken Feld, aktiviere den Strahl durch Druck auf das rechte Feld! <br>Andere online-Spieler erkennst du an ihrem Schild.`
        gameFrame.appendChild(this.label)
        /*
        window.addEventListener(`resize`, this.handleResize.bind(this)) 
        */
    }

    displayTouchControl(){
        this.joystick.htmlElement.style.display = "block"
    }

    get joystick(){
        return this._joystick
    }
    
    get svgElement(){
        return(this._svgElement);
    }
    
    handleResize(){
        //always apply fullscreen mode
        this.updateLabel()
        gameFrame.style.width = `${window.innerWidth}px`
        gameFrame.style.height = `${window.innerHeight}px`
        this._svgElement.style.width = `${window.innerWidth}px`
        this._svgElement.style.height = `${window.innerHeight}px`

        this.viewBoxWidth = window.innerWidth * this.viewBoxToScreenRatio
        this.viewBoxHeight = this.viewBoxWidth / this.screenAspectRatio
        this._svgElement.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${this.viewBoxHeight}` ) 
    }

    updateLabel(){
        this.label.innerHTML = `gameFrame.clientWidth doesnt change: ${gameFrame.clientWidth}, gameFrame.clientHeight: ${gameFrame.clientHeight}<br>
                                    window.innerWidth is dynamic: ${window.innerWidth}, window.innerHeight: ${window.innerHeight}<br>
                                    this.viewBoxWidth: ${this.viewBoxWidth}, this.viewBoxHeight: ${this.viewBoxHeight}<br>
                                    this._svgElement.getAttribute("viewBox"): ${this._svgElement.getAttribute("viewBox")}`
    }

    setLabel(text: string){
        this.label.innerHTML = text
    }

    handleSpacecraft(spacecraft: Spacecraft, option: string){
        switch (option){
            case "pseudoOrbit":
                spacecraft.pseudoOrbit({x:0, y:0})
                break;
            case "staticTorus":
                if(spacecraft.location.x < this.viewBoxLeft)
                    spacecraft.location.x = this.viewBoxLeft + this.viewBoxWidth
                else if(spacecraft.location.x > this.viewBoxLeft + this.viewBoxWidth)
                    spacecraft.location.x = this.viewBoxLeft
                if (spacecraft.location.y < this.viewBoxTop)
                    spacecraft.location.y = this.viewBoxTop + this.viewBoxHeight
                else if(spacecraft.location.y > this.viewBoxTop + this.viewBoxHeight)
                    spacecraft.location.y = this.viewBoxTop

                break;
            case "scroll":
                this.viewBoxLeft = spacecraft.location.x - this.viewBoxWidth/2
                this.viewBoxTop = spacecraft.location.y - this.viewBoxHeight / 2
                this._svgElement.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${this.viewBoxHeight}` ) 
                break;
            
            case "pseudoTorus":
                this.viewBoxLeft = spacecraft.location.x - this.viewBoxWidth/2
                this.viewBoxTop = spacecraft.location.y - this.viewBoxHeight / 2
                this._svgElement.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${this.viewBoxHeight}` ) 
                if (spacecraft.location.x > 500){
                    spacecraft.location.x = -500
                }
                else if ( spacecraft.location.x < -500){
                    spacecraft.location.x =  500
                }
                if (spacecraft.location.y > 500){
                    spacecraft.location.y = -500
                }
                else if(spacecraft.location.y < -500){
                    spacecraft.location.y = 500
                }
                break;
        }
        if(Math.abs(spacecraft.location.x) > 500 || Math.abs(spacecraft.location.y) > 500){
            spacecraft.objectStatus.impuls = polarVector(length(spacecraft.objectStatus.impuls)*.5, angle(spacecraft.objectStatus.impuls))
        }
    }

    insertBackgroundImage(){
        //load and center an image-file over 0,0 in the viewBox
        const bgImage = document.createElementNS("http://www.w3.org/2000/svg", "image")
        const bgImagWidth = 2000
        const bgImageHeight = 2000
        this._svgElement.appendChild(bgImage)
        bgImage.href.baseVal = ("../resources/background05.jpg")
        bgImage.onload = () =>{
            const imageWidth = bgImage.getBBox().width
            const imageHeight = bgImage.getBBox().height
            bgImage.style.width = bgImagWidth.toString()
            bgImage.style.height = bgImageHeight.toString()
            bgImage.style.x = `${-bgImagWidth/2}`
            bgImage.style.y = `${-bgImageHeight/2}` 
            bgImage.style.zIndex = "-1"
        }

    }
} 