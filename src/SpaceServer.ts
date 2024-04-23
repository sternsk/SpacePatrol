import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors

class SpaceServer {
    private spacecraftsData: any[] = []; // Declare spacecraftsData property

    constructor() {
        this.app = express();
        this.setupRoutes();
    }

    private app: express.Application;

    private setupRoutes() {
        this.app.use(bodyParser.json());
        this.app.use(cors()); // Use cors middleware

        // POST route to receive spacecraft data
        this.app.post('/sync', (req, res) => {
            const data = req.body;
            if (!data) {
                return res.status(400).send('Data is required');
            }
            this.spacecraftsData.push(data);
            console.log('Received spacecraft data:', data);
            res.status(200).json({ success: true });
        });

        // GET route to send spacecrafts data
        this.app.get('/getSyncData', (req, res) => {
            res.status(200).json(this.spacecraftsData);
        });

        // Start the server
        const PORT = 3000;
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}

new SpaceServer();
