import { SpaceGame } from "./SpaceGame";
export function initGame(gameFrame, type, color, id) {
    console.log("spaceGame loads");
    const game = new SpaceGame();
    game.init(type, color, id);
}
