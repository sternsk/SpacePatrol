import { SpaceGame } from "./SpaceGame"

export function initGame(gameFrame: HTMLElement, type: string, color: string, id: string) {
    console.log("spaceGame loads")
    
    const game = new SpaceGame()
    game.init(type, color, id)
    

}