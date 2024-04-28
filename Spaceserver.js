const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const https = require('https');
const fs = require('fs');

class SpaceServer {
    constructor() {
        this.spacecraftsData = []; // Assuming you have spacecrafts data stored somewhere
        this.app = express();
        this.setupRoutes();

        // Lade SSL-Zertifikat und privaten Schlüssel
        const privateKey = fs.readFileSync('/home/adrian/certs/privkey1.pem', 'utf8');
        const certificate = fs.readFileSync('/home/adrian/certs/fullchain1.pem', 'utf8');
        const credentials = { key: privateKey, cert: certificate };

        // Starten Sie den HTTPS-Server
        const httpsServer = https.createServer(credentials, this.app);

        // Port für den HTTPS-Server
        const PORT_HTTPS = 3001;

        httpsServer.listen(PORT_HTTPS, () => {
            console.log(`HTTPS Server is running on port ${PORT_HTTPS}`);
        });
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
            
            // entferne das Element, das den erhaltenen Daten entspricht
            const indexToRemove = this.spacecraftsData.findIndex(item => item.id === data.id);
            if (indexToRemove !== -1) {
                // Entferne das Element aus this.spacecraftsData
                const adjustedData = this.spacecraftsData.splice(indexToRemove, 1);
            }
            res.status(200).json(adjustedData);
        });
        
    }
    
        updateSpacecrafts(data){
            
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