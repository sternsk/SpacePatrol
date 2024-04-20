

import { SpaceGame } from "./SpaceGame.js"
import { Spacecraft } from "./Spacecraft.js"


export function initGame(gameFrame: HTMLElement, type: string, color: string, id: string) {
    console.log("spaceGame loads")
    const game = new SpaceGame(gameFrame, type, color, id)
    game.init()
}