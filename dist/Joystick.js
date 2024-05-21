import { Vector2D } from "./Vector2D";
export class Joystick {
    _htmlElement;
    _knobElement;
    _value = new Vector2D();
    _isTouched = false;
    touchEndObservers = []; // Array von Funktionen, die beim touchend-Ereignis aufgerufen werden
    constructor() {
        this._htmlElement = document.createElement("div");
        this._htmlElement.setAttribute("style", `width: 200px; 
                                                        height: 200px; 
                                                        background-color: gray; 
                                                        opacity: .5;
                                                        border-radius: 50%; 
                                                        position: absolute;
                                                        bottom: 20px;
                                                        left: 10px;`);
        this._knobElement = document.createElement("div");
        this._knobElement.setAttribute("style", `width: 50px;
                                                height: 50px;
                                                background-color: darkgray;
                                                border-radius: 50%;
                                                position: absolute;
                                                top: 50%;
                                                left: 50%;
                                                transform: translate(-50%, -50%);
                                                `);
        this._htmlElement.appendChild(this._knobElement);
        this.initEvents();
    }
    // Methode zum Hinzufügen von touchend-Beobachtern
    addObserver(observer) {
        this.touchEndObservers.push(observer);
    }
    get htmlElement() {
        return (this._htmlElement);
    }
    get isTouched() {
        return this._isTouched;
    }
    get knobElement() {
        return (this._knobElement);
    }
    get value() {
        return this._value;
    }
    initEvents() {
        this._knobElement.addEventListener('touchstart', this.onTouchStart.bind(this));
        this._knobElement.addEventListener('touchmove', this.onTouchMove.bind(this));
        this._knobElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    }
    onTouchStart(event) {
        this._isTouched = true;
        event.preventDefault();
    }
    onTouchMove(event) {
        event.preventDefault();
        const touch = event.touches[0];
        const offsetX = touch.clientX - this._htmlElement.getBoundingClientRect().left;
        const offsetY = touch.clientY - this._htmlElement.getBoundingClientRect().top;
        const centerX = this._htmlElement.offsetWidth / 2;
        const centerY = this._htmlElement.offsetHeight / 2;
        const distance = Math.sqrt((offsetX - centerX) ** 2 + (offsetY - centerY) ** 2);
        const relativDistance = distance / centerX;
        const angle = Math.atan2(offsetY - centerY, offsetX - centerX);
        if (distance <= centerX) {
            this._knobElement.style.left = `${offsetX}px`;
            this._knobElement.style.top = `${offsetY}px`;
        }
        else {
            const x = centerX + centerX * Math.cos(angle);
            const y = centerY + centerY * Math.sin(angle);
            this._knobElement.style.left = `${x}px`;
            this._knobElement.style.top = `${y}px`;
        }
        this._value = Vector2D.fromLengthAndAngle(relativDistance / 10, angle / Math.PI * 180);
    }
    onTouchEnd(event) {
        event.preventDefault();
        this._isTouched = false;
        // Reset knob position and value
        this._knobElement.style.left = '50%';
        this._knobElement.style.top = '50%';
        this._value = new Vector2D(0, 0);
        // Benachrichtige alle Beobachter über das touchend-Ereignis
        this.touchEndObservers.forEach(observer => observer());
    }
}
