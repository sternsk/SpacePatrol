export class KeyboardController {
    keysPressed = {};
    constructor() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    handleKeyDown(event) {
        this.keysPressed[event.key] = true;
        event.preventDefault(); // Verhindert Standardverhalten
    }
    handleKeyUp(event) {
        this.keysPressed[event.key] = false;
    }
    // Methode, um den Zustand einer Taste abzufragen
    isKeyPressed(key) {
        return this.keysPressed[key] || false;
    }
    getKeysPressed() {
        return this.keysPressed;
    }
}
//# sourceMappingURL=KeyboardController.js.map