import { gameFrame } from "./GameMenu.js";

export class KeyboardController {
    private keysPressed: {[key: string]: boolean} = {};

    constructor(svgElement: HTMLElement) {
        gameFrame.addEventListener('keydown', this.handleKeyDown.bind(this));
        gameFrame.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    private handleKeyDown(event: KeyboardEvent): void {
        //event.preventDefault(); // Verhindert Standardverhalten but prevents the access to idInputElement as well
        this.keysPressed[event.key] = true;
        
    }

    private handleKeyUp(event: KeyboardEvent): void {
        this.keysPressed[event.key] = false;
        //event.stopPropagation()
    }

    // Methode, um den Zustand einer Taste abzufragen
    public isKeyPressed(key: string): boolean {
        return this.keysPressed[key] || false;
    }

    public getKeysPressed(): {[key: string]: boolean} {
        return this.keysPressed;
    }
    
}

