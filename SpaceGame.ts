import { Spacecraft } from "./Spacecraft";
import { GameEnvironment } from "./GameEnvironment";
import { ServerSimulator } from "./ServerSimulator";

export class SpaceGame {
    private serverSimulator = new ServerSimulator();
    private spacecrafts: Spacecraft[] = [];
    private gameEnvironment: GameEnvironment;

    constructor(gameFrame: HTMLElement) {
        this.gameEnvironment = new GameEnvironment(gameFrame);
    }

    init(type: string, color: string, id: string) {
        const spacecraft = new Spacecraft(type, color, id);
        this.spacecrafts.push(spacecraft);

        this.gameLoop();
        setInterval(() => {
            this.syncWithAllTheOtherPlayersThatAreConnectedToTheServer();
        }, 100);
    }

    private gameLoop() {
        requestAnimationFrame(() => {
            this.gameLoop();
        });
        this.updateElements();
    }

    private updateElements() {
        this.spacecrafts.forEach((spacecraft) => {
            spacecraft.update();
        });
    }

    private syncWithAllTheOtherPlayersThatAreConnectedToTheServer() {
        // Send own status to server
        // Get statuses of other players from the server
    }
}
