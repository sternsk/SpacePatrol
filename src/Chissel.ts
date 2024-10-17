import { Device } from "./Device";
//import { _svgElement } from "./GameEnvironment";

export class Chissel implements Device{
    
    name = "chissel"
    baseGElem: SVGGElement
    _gElem: SVGGElement
    activated = false

    cycleCount = 0
    blurElements: SVGElement[] = []

    constructor(gElem: SVGGElement){
        this.baseGElem = gElem
        
        this._gElem = document.createElementNS("http://www.w3.org/2000/svg", "g")
//        _svgElement.appendChild(this._gElem)
    }

    activate(): void {
        const blurAmount = 135;
        // add another element of baseGElem to the blurElements array
        const newElement = 
            this.baseGElem.cloneNode(true) as SVGGElement // Clone base element
        this.blurElements.push(newElement);
        this.updateGElement()

        // if cycleCount is bigger than blurAmount remove the oldest elements of blurElements array
        if (this.cycleCount >= blurAmount && this.blurElements.length > 0 ) {
            this.blurElements.shift(); // Remove the oldest element
            this.updateGElement()
        }

        // decrease the opacity value of the blurElements
        this.blurElements.forEach((blurElem) => {
            let opacityValue: number = parseFloat(blurElem.getAttribute("opacity") || "1") //returns undefined
            opacityValue -= 1/blurAmount; // Decrease opacity
            blurElem.setAttribute("opacity", `${opacityValue}`) // Apply opacity
        });

        if(this.cycleCount < blurAmount)
            this.cycleCount++;
/*
        // remove previous blurElements
        const previousElements = document.getElementsByClassName("clonedBaseElement")
        while (previousElements.length > 0) {
            previousElements[0].parentNode?.removeChild(previousElements[0]); // Remove each element from the DOM
        }
  */      
        

    }
    
    updateGElement(){
        //remove the old GElement
        this._gElem.innerHTML = ""
        // iterate over the blurElements array and add each element 
        this.blurElements.forEach((blurElem) => {
            this._gElem.appendChild(blurElem)
        });
    }

    deactivate(): void {
    }

    dispose(): void {
        this.activated = false
        //this.blurElements = []
        this.cycleCount = 0
        //this._gElem.innerHTML = ""
        const animate = () =>{
            if (this.blurElements.length > 0){
                const newElement = 
                this.baseGElem.cloneNode(true) as SVGGElement // Clone base element
                this.blurElements.push(newElement);
                this.blurElements.shift()
                this.blurElements.shift()
                this.updateGElement()
                requestAnimationFrame(animate)
            }
        }
        animate()
    }
}