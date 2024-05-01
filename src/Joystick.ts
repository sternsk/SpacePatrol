import { Vector2D } from "./Vector2D.js";

export class Joystick {
    private _container: SVGElement;
    private bgCircle: SVGCircleElement;
    private baseElement: SVGCircleElement;
    private knobElement: SVGCircleElement;
    private detail1: SVGCircleElement;
    private detail2: SVGPathElement;
    private detail3: SVGPathElement;
    private _value = new Vector2D()

    constructor() {
        this._container = document.createElementNS("http://www.w3.org/2000/svg","SVG")
        this._container.setAttribute("id", "joystick")
        this._container.setAttribute("viewBox", "-100 -100 200 200")
        this._container.setAttribute("tabindex", "0")
        //this._container.setAttribute("transform", "translate(0,0)")
        

        this.bgCircle = document.createElementNS("http://www.w3.org/2000/svg","circle")
        this.bgCircle.setAttribute("cx", `0`)
        this.bgCircle.setAttribute("cy", `0`)
        this.bgCircle.setAttribute("r", `100`)
        this.bgCircle.setAttribute("fill", `lightgray`) 
        this._container.appendChild(this.bgCircle);

        this.baseElement = document.createElementNS("http://www.w3.org/2000/svg","circle")
        this.baseElement.setAttribute("cx", `0`)
        this.baseElement.setAttribute("cy", `0`)
        this.baseElement.setAttribute("r", `80`)
        this.baseElement.setAttribute("stroke", `gray`)
        this.baseElement.setAttribute("stroke-width", `5`)
        this._container.appendChild(this.baseElement);
        
        this.knobElement = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        this.knobElement.setAttribute("cx", `0`)
        this.knobElement.setAttribute("cy", `-80`)
        this.knobElement.setAttribute("r", `20`)
        this.knobElement.setAttribute("fill", `darkgray`)
        this._container.appendChild(this.knobElement); 
                                                
        this.detail1 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        this.detail1.setAttribute("cx", `0`)
        this.detail1.setAttribute("cy", `0`)
        this.detail1.setAttribute("r", `100`)
        this.detail1.setAttribute("fill", `lightgray`) 
        this.container.appendChild(this.detail1)

        this.detail2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
        this.detail2.setAttribute("d", `M -20 20 Q -30 50, -20 80 Q -10 70, -10 60 Q -10 75, 0 90 Q 10 75, 10 60 Q 10 70, 20 80 Q 30 50, 20 20 Q 0 15, -20 20`)
        this.detail2.setAttribute("fill", `none`)
        this.detail2.setAttribute("stroke", `gray`)
        this.detail2.setAttribute("stroke-width", `5`) 
        this._container.appendChild(this.detail2);

        this.detail3 = document.createElementNS("http://www.w3.org/2000/svg", "path")
        this.detail3.setAttribute("d", `M -10 -40 Q -5 -20, 0 -10 Q 5 -20, 10 -40`)
        this.detail3.setAttribute("fill", `none`)
        this.detail3.setAttribute("stroke", `gray`)
        this.detail3.setAttribute("stroke-width", `5`) 
        this._container.appendChild(this.detail3);
        
        this.initEvents();
    }
    
    get container(): SVGElement{
        return(this._container)
    }

    get value(): Vector2D{
        return this._value
    }

    private initEvents() {
        this.knobElement.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.knobElement.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.knobElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    }

    private onTouchStart(event: TouchEvent) {
        event.preventDefault();
    }

    private onTouchMove(event: TouchEvent){
        event.preventDefault();
        
        const touch = event.touches[0];
        if(!touch)return// Überprüfen, ob ein Touch vorhanden ist, um Fehler zu vermeiden

        const offsetX = touch.clientX - this.container.getBoundingClientRect().left;
        const offsetY = touch.clientY - this.container.getBoundingClientRect().top;

        const centerX = this.container.clientWidth / 2;
        const centerY = this.container.clientHeight / 2;

        const distance = Math.sqrt((offsetX - centerX) ** 2 + (offsetY - centerY) ** 2);
        const relativDistance = distance / centerX
        const angle = Math.atan2(offsetY - centerY, offsetX - centerX);

        if (distance <= centerX) {
            // Verwende transform: translate() für die Positionierung
            this.knobElement.style.transform = `translate(${offsetX - 10}px, ${offsetY - 10}px)`;
        } else {
            
            const x = centerX + centerX * Math.cos(angle);
            const y = centerY + centerY * Math.sin(angle);
            this.knobElement.style.transform = `translate(${x - 10}px, ${y - 10}px)`; // -10 für die Hälfte der Kreisbreite
        }
        console.log("relativDistance: "+relativDistance+", angle in radians: "+angle)
        this._value = Vector2D.fromLengthAndAngle(relativDistance/100, angle/Math.PI*180)
    }

    private onTouchEnd(event: TouchEvent) {
        event.preventDefault();

        // Reset knob position and value
        this.knobElement.style.transform = 'translate(-10px, -90px)';
        this._value = new Vector2D(0,0)
        
    }
}