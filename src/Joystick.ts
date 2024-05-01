import { Vector2D } from "./Vector2D.js";

export class Joystick {
    private _joystickElement: HTMLElement;
    private _knobElement: HTMLElement;
    private _value = new Vector2D()

    constructor() {
        this._joystickElement = document.createElement("div")
        this._joystickElement.setAttribute("style", `width: 200px; 
                                                        height: 200px; 
                                                        background-color: lightgray; 
                                                        border-radius: 50%; 
                                                        position: relative`)
        
        
        this._knobElement = document.createElement("div");
        this._knobElement.setAttribute("style", `width: 50px;
                                                height: 50px;
                                                background-color: darkgray;
                                                border-radius: 50%;
                                                position: absolute;
                                                top: 50%;
                                                left: 50%;
                                                transform: translate(-50%, -50%);
                                                `)
        this._joystickElement.appendChild(this._knobElement)
        
        this.initEvents();
    }
    
    get joystickElement(): HTMLElement{
        return(this._joystickElement)
    }

    get knobElement(): HTMLElement{
        return(this._knobElement)
    }

    get value(): Vector2D{
        return this._value
    }

    private initEvents() {
        this._knobElement.addEventListener('touchstart', this.onTouchStart.bind(this));
        this._knobElement.addEventListener('touchmove', this.onTouchMove.bind(this));
        this._knobElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    }

    private onTouchStart(event: TouchEvent) {
        event.preventDefault();
    }

    private onTouchMove(event: TouchEvent){
        event.preventDefault();
        
        const touch = event.touches[0];
        const offsetX = touch.clientX - this._joystickElement.getBoundingClientRect().left;
        const offsetY = touch.clientY - this._joystickElement.getBoundingClientRect().top;

        const centerX = this._joystickElement.offsetWidth / 2;
        const centerY = this._joystickElement.offsetHeight / 2;

        const distance = Math.sqrt((offsetX - centerX) ** 2 + (offsetY - centerY) ** 2);
        const relativDistance = distance / centerX
        const angle = Math.atan2(offsetY - centerY, offsetX - centerX);

        if (distance <= centerX) {
            this._knobElement.style.left = `${offsetX}px`;
            this._knobElement.style.top = `${offsetY}px`;
        } else {
            
            const x = centerX + centerX * Math.cos(angle);
            const y = centerY + centerY * Math.sin(angle);
            this._knobElement.style.left = `${x}px`;
            this._knobElement.style.top = `${y}px`;
        }
        console.log("relativDistance: "+relativDistance+", angle in radians: "+angle)
        this._value = Vector2D.fromLengthAndAngle(relativDistance/100, angle/Math.PI*180)
    }

    private onTouchEnd(event: TouchEvent) {
        event.preventDefault();

        // Reset knob position and value
        this._knobElement.style.left = '50%';
        this._knobElement.style.top = '50%';
        this._value = new Vector2D(0,0)
        
    }
}