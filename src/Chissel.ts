import { Device } from "./Device";

interface BlurElement {
    element: SVGGElement;
    opacityValue: number;
  }
  

export class Chissel implements Device{
    
    name = "chissel"
    baseGElem: SVGGElement
    _gElem: SVGGElement
    activated = false

    cycleCount = 0
    blurElements: BlurElement[] = []

    constructor(gElem: SVGGElement){
        this.baseGElem = gElem
        this._gElem = document.createElementNS("http://www.w3.org/2000/svg", "g")
    }

    activate(): void {
        const blurAmount = 1;
        
        requestAnimationFrame(() => {
            if (this.cycleCount < blurAmount) {   
                // add another element of baseGElem to the blurElements array
                const newElement: BlurElement = {
                    element: this.baseGElem.cloneNode(true) as SVGGElement, // Clone base element
                    opacityValue: 1 // Start with full opacity
                };
                this.blurElements.push(newElement);
    
                // decrease the opacity value of the blurElements
                this.blurElements.forEach((blurElem) => {
                    blurElem.opacityValue -= 0.01; // Decrease opacity
                    blurElem.element.style.opacity = blurElem.opacityValue.toString(); // Apply opacity
                });
    
            } else {
                // if cycleCount is bigger than blurAmount remove the oldest elements of blurElements array
                if (this.blurElements.length > 0) {
                    this.blurElements.shift(); // Remove the oldest element
                }
    
                // add another element of baseGElem to the blurElements array
                const newElement: BlurElement = {
                    element: this.baseGElem.cloneNode(true) as SVGGElement,
                    opacityValue: 1 // Start with full opacity
                };
                this.blurElements.push(newElement);
    
                // decrease the opacity value of the blurElements
                this.blurElements.forEach((blurElem) => {
                    blurElem.opacityValue -= 0.01;
                    blurElem.element.style.opacity = blurElem.opacityValue.toString();
                });
            }
            this.cycleCount++;
    
            // iterate over the blurElements array and add each element to this._gElem
            this.blurElements.forEach((blurElem) => {
                if (!this._gElem.contains(blurElem.element)) {
                    this._gElem.appendChild(blurElem.element); // Append only if not already appended
                }
            });
    
            
        });
    }
    

    deactivate(): void {
        this.activated = false
        this.cycleCount = 0
        this._gElem.innerHTML = ""
    }

    dispose(): void {
        this.deactivate()
    }
}