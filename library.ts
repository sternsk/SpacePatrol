import { SpaceGame } from "./SpaceGame.js"

export function initGame(gameFrame: HTMLElement, type: string, color: string, id: string) {
    console.log("spaceGame loads")
    
    const game = new SpaceGame(gameFrame)
    game.init(type, color, id)
}