import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

class SpaceServer {
    private spacecraftsData: Record<string, any>[] = [];
    private app: express.Application;

    constructor() {
        this.app = express();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.app.use(bodyParser.json());

        // POST route to receive spacecraft data
        this.app.post('/receive', (req: Request, res: Response) => {
            const data = req.body;
            // Assuming data has an 'id' property
            if (!data || !data.id) {
                return res.status(400).send('Invalid data');
            }

            // Assuming spacecraftsData is an array of spacecrafts data
            this.spacecraftsData.push(data);
            res.status(200).json({ success: true });
        });

        // GET route to send spacecrafts data
        this.app.get('/send', (req: Request, res: Response) => {
            const spacecraftId = req.query.id as string;
            if (!spacecraftId) {
                return res.status(400).send('Spacecraft ID is required');
            }

            // Filter spacecraftsData to get data for the requested spacecraftId
            const filteredSpacecraftsData = this.spacecraftsData.filter(spacecraft => spacecraft.id !== spacecraftId);
            res.status(200).json(filteredSpacecraftsData);
        });

        // Error handling middleware
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });
    }

    public startServer(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

// Usage example
const spaceServer = new SpaceServer();
spaceServer.startServer(3000); // Start server on port 3000
