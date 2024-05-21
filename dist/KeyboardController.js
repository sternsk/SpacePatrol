import { gameFrame } from "./index";
export class KeyboardController {
    keysPressed = {};
    constructor(svgElement) {
        gameFrame.addEventListener('keydown', this.handleKeyDown.bind(this));
        gameFrame.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    handleKeyDown(event) {
        //event.preventDefault(); // Verhindert Standardverhalten but prevents the access to idInputElement as well
        this.keysPressed[event.key] = true;
    }
    handleKeyUp(event) {
        this.keysPressed[event.key] = false;
        //event.stopPropagation()
    }
    // Methode, um den Zustand einer Taste abzufragen
    isKeyPressed(key) {
        return this.keysPressed[key] || false;
    }
    getKeysPressed() {
        return this.keysPressed;
    }
}
