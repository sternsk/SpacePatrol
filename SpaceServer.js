const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

class SpaceServer {
    constructor() {
        this.spacecraftsData = []; // Assuming you have spacecrafts data stored somewhere
        this.app = express();
        this.setupRoutes();
    }

    setupRoutes() {
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
        this.app.get('/sync', (req, res) => {
            res.status(200).json(this.spacecraftsData);
        });

        // Start the server
        const PORT = 3000;
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}

// Create an instance of SpaceServer
const server = new SpaceServer();
