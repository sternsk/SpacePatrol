import { gameFrame } from "./GameMenu.js";
export class KeyboardController {
    private keysPressed: {[key: string]: boolean} = {};
    private keyUpCallback?: ((key: string) => void);

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
        if(this.keyUpCallback){
            this.keyUpCallback(event.key);
        }
        
    }

    public onKeyUp(callback: (key: string) => void) {
        this.keyUpCallback = callback;
    }

    public isKeyPressed(key: string): boolean {
        return this.keysPressed[key] || false;
    }

    public getKeysPressed(): {[key: string]: boolean} {
        return this.keysPressed;
    }
}
