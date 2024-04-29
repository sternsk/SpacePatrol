export class Joystick {
    private joystickElement: HTMLElement;
    private knobElement: HTMLElement;

    constructor() {
        this.joystickElement = document.createElement("div")
        this.joystickElement.setAttribute("width", "200px")
        this.joystickElement.setAttribute("height", "200px")
        this.joystickElement.setAttribute("background-color", "lightgray")
        this.joystickElement.setAttribute("border-radius", "50%")
        this.joystickElement.setAttribute("position", "relative")
        
        this.knobElement = document.createElement("div");
        this.knobElement.setAttribute("width", "50px")
        this.knobElement.setAttribute("height", "50px")
        this.knobElement.setAttribute("background-color", "darkgray")
        this.knobElement.setAttribute("border-radius", "50%")
        this.knobElement.setAttribute("position", "absolute")
        this.knobElement.setAttribute("top", "50%")
        this.knobElement.setAttribute("left", "50%")
        this.knobElement.setAttribute("transform", "translate(-50%, -50%)")
        
        this.initEvents();
    }

    private initEvents() {
        this.knobElement.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.knobElement.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.knobElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    }

    private onTouchStart(event: TouchEvent) {
        event.preventDefault();
    }

    private onTouchMove(event: TouchEvent) {
        event.preventDefault();
        
        const touch = event.touches[0];
        const offsetX = touch.clientX - this.joystickElement.getBoundingClientRect().left;
        const offsetY = touch.clientY - this.joystickElement.getBoundingClientRect().top;

        const centerX = this.joystickElement.offsetWidth / 2;
        const centerY = this.joystickElement.offsetHeight / 2;

        const distance = Math.sqrt((offsetX - centerX) ** 2 + (offsetY - centerY) ** 2);

        if (distance <= centerX) {
            this.knobElement.style.left = `${offsetX}px`;
            this.knobElement.style.top = `${offsetY}px`;
        } else {
            const angle = Math.atan2(offsetY - centerY, offsetX - centerX);
            const x = centerX + centerX * Math.cos(angle);
            const y = centerY + centerY * Math.sin(angle);
            this.knobElement.style.left = `${x}px`;
            this.knobElement.style.top = `${y}px`;
        }
    }

    private onTouchEnd(event: TouchEvent) {
        event.preventDefault();

        // Reset knob position
        this.knobElement.style.left = '50%';
        this.knobElement.style.top = '50%';
    }
}