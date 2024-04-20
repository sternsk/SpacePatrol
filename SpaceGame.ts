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
        this.spacecrafts.forEach((spacecraft) => {
            // Assuming Spacecraft class has a toJSON() method to convert spacecraft data to JSON
            const spacecraftData = spacecraft.toJSON();
            this.serverSimulator.sendMessage();
        });

        // Get statuses of other players from the server
        const otherSpacecrafts = this.serverSimulator.sendMessage().filter((spacecraft) => {
            // Assuming Spacecraft class has an id property
            return spacecraft.id !== this.spacecrafts[0].id; // Filter out the spacecraft of the current player
        });

        // Update the local spacecrafts array with data received from the server
        otherSpacecrafts.forEach((spacecraftData) => {
            // Assuming Spacecraft class has a static method fromJSON() to create a spacecraft object from JSON data
            const spacecraft = Spacecraft.fromJSON(spacecraftData);
            const existingSpacecraft = this.spacecrafts.find((s) => s.id === spacecraft.id);
            if (existingSpacecraft) {
                // Update existing spacecraft if found
                existingSpacecraft.updateFrom(spacecraft);
            } else {
                // Add new spacecraft if not found
                this.spacecrafts.push(spacecraft);
            }
        });
    }
}
