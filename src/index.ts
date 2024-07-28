console.log(" ")
console.log("index.ts says: SpacePatrol0201 ver.0953, and this should be the first statement")
console.log("There is apperently the imports and dependencies loaded first and then the code executed.")
console.log("what seems rather awkward to me")
console.log(" ")
console.log("cause viewBoxWidth ist defined right after this statement")

export let viewBoxWidth = 100

import { GameMenu } from "./GameMenu.js";

let menu = new GameMenu();
menu.loop()