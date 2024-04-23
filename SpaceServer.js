const express = require('express');
const bodyParser = require('body-parser');
import('node-fetch')
    .then(fetch => {
        // Now you can use fetch here
        class SpaceServer {
            constructor() {
                this.spacecraftsData = []; // Assuming you have spacecrafts data stored somewhere
                this.app = express();
                this.setupRoutes();
            }

            setupRoutes() {
                this.app.use(bodyParser.json());

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

        new SpaceServer(); // Start the server when this file is executed
    })
    .catch(err => {
        console.error('Failed to load node-fetch:', err);
    });

class SpaceServer {
    constructor() {
        this.spacecraftsData = []; // Assuming you have spacecrafts data stored somewhere
        this.app = express();
        this.setupRoutes();
    }

    setupRoutes() {
        this.app.use(bodyParser.json());

        // POST route to receive spacecraft data
        this.app.post('/receive', (req, res) => {
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
        this.app.get('/send', (req, res) => {
            const spacecraftId = req.query.id;
            if (!spacecraftId) {
                return res.status(400).send('Spacecraft ID is required');
            }

            // Filter spacecraftsData to get data for the requested spacecraftId
            const filteredSpacecraftsData = this.spacecraftsData.filter(spacecraft => spacecraft.id !== spacecraftId);
            res.status(200).json(filteredSpacecraftsData);
        });

        // POST route to sync data with the server
        this.app.post('/sync', async (req, res) => {
            const data = req.body;
            if (!data) {
                return res.status(400).send('Data is required');
            }

            try {
                await this.sync(data); // Call sync method to sync data
                res.status(200).json({ success: true });
            } catch (error) {
                console.error('Error syncing data:', error);
                res.status(500).send('Error syncing data');
            }
        });
    }

    async sync(data) {
        try {
            const response = await fetch('http://localhost:3000/receive', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to sync data');
            }

            console.log('Data synced successfully');
        } catch (error) {
            throw error;
        }
    }

    startServer(port) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

