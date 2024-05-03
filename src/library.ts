import { SpaceGame } from "./SpaceGame.js"

export function initGame(gameFrame: HTMLElement, type: string, color: string, id: string) {
    console.log("spaceGame loads")
    // DOM-content is already loaded, document.readyState === "complete" returns true
    // is gameFrame sized?
    console.log("gameFrame.offsetWidth: "+gameFrame.offsetWidth)
    console.log("gameFrame.offsetHeight: "+gameFrame.offsetHeight)
    const game = new SpaceGame(gameFrame)
    game.init(type, color, id)
    

}