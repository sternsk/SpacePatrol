import { GameMenu } from "./GameMenu.js";

console.log(" ")
console.log("index.ts says: SpacePatrol0300 ver.0807, and this should be the first statement")
console.log("But there is apperently the imports and dependencies loaded first and then the following code executed.")
console.log("Thats why there is statements above this textblock")
console.log(" ")

let menu = new GameMenu();
menu.loop()