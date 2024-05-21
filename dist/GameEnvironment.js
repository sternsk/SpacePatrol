import { Joystick } from "./Joystick.js";
import { gameFrame } from "./index.js";
export let viewBoxWidth = 200;
export class GameEnvironment {
    screenAspectRatio;
    viewBoxToScreenRatio;
    viewBoxWidth;
    viewBoxHeight;
    viewBoxLeft;
    viewBoxTop;
    label = document.createElement("HTMLLabelElement");
    _svgElement;
    _joystick = new Joystick();
    constructor() {
        if (gameFrame.offsetHeight != 0) {
            this.screenAspectRatio = gameFrame.offsetWidth / gameFrame.offsetHeight;
        }
        else {
            console.log("gameFrame not properly sized");
            this.screenAspectRatio = .8;
        }
        this.viewBoxWidth = viewBoxWidth;
        this.viewBoxToScreenRatio = this.viewBoxWidth / window.innerWidth;
        this.viewBoxHeight = this.viewBoxWidth / this.screenAspectRatio;
        // center zero in viewBox
        this.viewBoxLeft = -this.viewBoxWidth / 2;
        this.viewBoxTop = -this.viewBoxHeight / 2;
        this._svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._svgElement.style.position = "absolute";
        console.log(gameFrame.clientHeight);
        this._svgElement.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${this.viewBoxHeight}`);
        this._svgElement.setAttribute("tabindex", "0");
        const viewBoxBorder = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        viewBoxBorder.setAttribute("x", `${this.viewBoxLeft}`);
        viewBoxBorder.setAttribute("y", `${this.viewBoxTop}`);
        viewBoxBorder.setAttribute("width", `${this.viewBoxWidth}`);
        viewBoxBorder.setAttribute("height", `${this.viewBoxHeight}`);
        viewBoxBorder.setAttribute("fill", `none`);
        viewBoxBorder.setAttribute("stroke-width", `2px`);
        viewBoxBorder.setAttribute("stroke", `green`);
        this._svgElement.appendChild(viewBoxBorder);
        gameFrame.appendChild(this._svgElement);
        gameFrame.style.height = `${window.innerHeight}px`;
        gameFrame.appendChild(this._joystick.htmlElement);
        this.joystick.htmlElement.style.display = "none";
        this.label.style.position = "absolute";
        this.label.style.top = "10px";
        this.label.style.left = "10px";
        this.label.style.border = "3px solid darkgreen";
        this.label.style.backgroundColor = "lightgrey";
        this.label.style.opacity = "0.8";
        this.label.innerHTML = `Steuer dein Raumschiff mit den Pfeiltasten oder Touchfeld! <br>Andere online-Spieler erkennst du an ihrem Schild.`;
        gameFrame.appendChild(this.label);
        window.addEventListener(`resize`, this.handleResize.bind(this));
    }
    displayTouchControl() {
        this.joystick.htmlElement.style.display = "block";
    }
    get joystick() {
        return this._joystick;
    }
    get svgElement() {
        return (this._svgElement);
    }
    handleResize() {
        this.updateLabel();
        gameFrame.style.width = `${window.innerWidth}px`;
        gameFrame.style.height = `${window.innerHeight}px`;
        this._svgElement.style.width = `${window.innerWidth}px`;
        this._svgElement.style.height = `${window.innerHeight}px`;
        this.viewBoxWidth = window.innerWidth * this.viewBoxToScreenRatio;
        this.viewBoxHeight = this.viewBoxWidth / this.screenAspectRatio;
        this._svgElement.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${this.viewBoxHeight}`);
    }
    updateLabel() {
        this.label.innerHTML = `gameFrame.clientWidth doesnt change: ${gameFrame.clientWidth}, gameFrame.clientHeight: ${gameFrame.clientHeight}<br>
                                    window.innerWidth is dynamic: ${window.innerWidth}, window.innerHeight: ${window.innerHeight}<br>
                                    this.viewBoxWidth: ${this.viewBoxWidth}, this.viewBoxHeight: ${this.viewBoxHeight}<br>
                                    this._svgElement.getAttribute("viewBox"): ${this._svgElement.getAttribute("viewBox")}`;
    }
    setLabel(text) {
        this.label.innerHTML = text;
    }
    handleSpacecraft(spacecraft, option) {
        switch (option) {
            case "pseudoOrbit":
                spacecraft.pseudoOrbit;
                break;
            case "pseudoTorus":
                if (spacecraft.location.x < this.viewBoxLeft)
                    spacecraft.location.x = this.viewBoxLeft + viewBoxWidth;
                if (spacecraft.location.x > this.viewBoxLeft + viewBoxWidth)
                    spacecraft.location.x = this.viewBoxLeft;
                if (spacecraft.location.y < this.viewBoxTop)
                    spacecraft.location.y = this.viewBoxTop + this.viewBoxHeight;
                if (spacecraft.location.y > this.viewBoxTop + this.viewBoxHeight)
                    spacecraft.location.y = this.viewBoxTop;
                break;
        }
    }
}
