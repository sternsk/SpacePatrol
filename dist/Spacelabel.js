import { gameFrame } from "./index.js";
export class Spacelabel {
    _labelElement = document.createElement("label");
    _location = { x: 0, y: 0 };
    constructor() {
        this._labelElement.style.position = "absolute";
        this._labelElement.style.left = this._location.x + "px";
        this._labelElement.style.top = this._location.y + "px";
        this._labelElement.style.border = "2px solid grey";
        this._labelElement.style.width = "100px";
        gameFrame.appendChild(this._labelElement);
    }
    get htmlElement() {
        return this._labelElement;
    }
    get location() {
        return this._location;
    }
    set location({ x, y }) {
        this._location.x = x;
        this._location.y = y;
        this.updatePosition();
    }
    updatePosition() {
        this._labelElement.style.left = this._location.x + "px";
        this._labelElement.style.top = this._location.y + "px";
    }
}
