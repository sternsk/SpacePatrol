import { SpaceGame } from "./SpaceGame.js"
import { Vector2D } from "./Vector2D.js"

export function initGame(gameFrame: HTMLElement, type: string, color: string, id: string) {
    console.log("spaceGame loads")
    
    const game = new SpaceGame()
    game.init(type, color, id)
}

export interface SpaceObjectStatus {
    location: Vector2D;
    impuls: Vector2D;
    direction: number;
    id: string;
    type: string;
}


