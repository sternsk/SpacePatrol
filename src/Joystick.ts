import { Vector2D } from "./Vector2D.js";

export class Joystick {
    private _joystickElement: HTMLElement;
    private _knobElement: HTMLElement;
    private _value = new Vector2D()

    constructor() {
        this._joystickElement = document.createElement("div")
        this._joystickElement.setAttribute("width", "200px")
        this._joystickElement.setAttribute("height", "200px")
        this._joystickElement.setAttribute("background-color", "lightgray")
        this._joystickElement.setAttribute("border-radius", "50%")
        this._joystickElement.setAttribute("position", "relative")
        
        this._knobElement = document.createElement("div");
        this._knobElement.setAttribute("width", "50px")
        this._knobElement.setAttribute("height", "50px")
        this._knobElement.setAttribute("background-color", "darkgray")
        this._knobElement.setAttribute("border-radius", "50%")
        this._knobElement.setAttribute("position", "absolute")
        this._knobElement.setAttribute("top", "50%")
        this._knobElement.setAttribute("left", "50%")
        this._knobElement.setAttribute("transform", "translate(-50%, -50%)")
        
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
        console.log("relativDistance: "+relativDistance+", angle: "+angle)
        this._value = Vector2D.fromLengthAndAngle(relativDistance, angle)
    }

    private onTouchEnd(event: TouchEvent) {
        event.preventDefault();

        // Reset knob position
        this._knobElement.style.left = '50%';
        this._knobElement.style.top = '50%';
    }
}