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
            
            console.log('Received spacecraft data:', data); 
            this.updateSpacecrafts(data)
            res.status(200).json({ success: true });
        });

        // GET route to send spacecrafts data
        this.app.get('/receive', (req, res) => {
            console.log('send spacecraft data:', this.spacecraftsData); 
            res.status(200).json(this.spacecraftsData);
        });


        // Start the server
        const PORT = 3000;
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    
    updateSpacecrafts(data){
        console.log("updateSpacecrafts called" + data)
        const index = this.spacecraftsData.findIndex(p => p.id === data.id);
        if (index !== -1) {
            console.log(" Spieler mit dieser ID bereits vorhanden, aktualisieren")
            this.spacecraftsData[index] = data;
            
        } else {
            
            console.log("Spieler mit dieser ID nicht gefunden, hinzufügen")
            this.spacecraftsData.push(data);
            
        }
        
    }
}

// Create an instance of SpaceServer
const server = new SpaceServer();
