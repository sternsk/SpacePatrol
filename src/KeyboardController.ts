export class KeyboardController {
    private keysPressed: {[key: string]: boolean} = {};

    constructor(svgElement: HTMLElement) {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    private handleKeyDown(event: KeyboardEvent): void {
        console.log("this.isInputFocused: "+this.isInputFocused())
            
        //event.preventDefault(); // Verhindert Standardverhalten but prevents the access to idInputElement as well
        
        this.keysPressed[event.key] = true;
        //
        //event.stopPropagation()
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
    private isInputFocused(): boolean {
        const activeElement = document.activeElement;
        
        return activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;
    }
}

