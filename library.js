import { SpaceGame } from "./SpaceGame.js";
export function initGame(gameFrame, type, color, id) {
    console.log("spaceGame loads");
    const game = new SpaceGame(gameFrame);
    game.init(type, color, id);
}
//# sourceMappingURL=library.js.map