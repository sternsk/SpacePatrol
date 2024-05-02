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

        // Load SSL-Zertifikat und privaten Schlüssel
        const privateKey = fs.readFileSync('/home/adrian/certs/privkey1.pem', 'utf8');
        const certificate = fs.readFileSync('/home/adrian/certs/fullchain1.pem', 'utf8');
        const credentials = { key: privateKey, cert: certificate };

        // Starten Sie den HTTPS-Server
        const httpsServer = https.createServer(credentials, this.app);

        // Port für den HTTPS-Server
        const PORT_HTTPS = 2001;

        httpsServer.listen(PORT_HTTPS, () => {
            console.log(`HTTPS Server is running on port ${PORT_HTTPS}`);
        });
    
        setInterval(this.removeInactiveSpacecrafts.bind(this), 2000); // Check every 2 seconds

        setInterval(this.createSpacecraft.bind(this), 10000); // create a NPC every 10 seconds


    }

    setupRoutes() {
        this.app.use(bodyParser.json());
        // Use cors middleware with specific origin
        this.app.use(cors({
            //origin: 'https://adrianschindler.de'
        }));

        // POST route to receive spacecraft data
        this.app.post('/sync', (req, res) => {
            const data = req.body;
            
            if (!data) {
                return res.status(400).send('Data is required');
            }
            
            // Update spacecrafts data
            this.updateSpacecrafts(data);
            
            // Send back adjusted spacecrafts data
            // remove sending spacecraft
            const index = this.spacecraftsData.findIndex(p => p.id === data.id)
            const adjustedSpacecraftsData = [...this.spacecraftsData];
            if(index !== -1){
                adjustedSpacecraftsData.splice(index,1)
            }
            
            res.status(200).json(adjustedSpacecraftsData);
        });
        
    }
    
    createSpacecraft(){
        const availableTypes = ["rainbowRocket", 
                                "rokket", 
                                "bromber.png", 
                                "blizzer.png", 
                                "flipps.svg", 
                                "lopman.png", 
                                "helgram1.png", 
                                "carrot.svg", 
                                "rock.svg", 
                                "eye.svg"]
        const availableColors = ["red", "green", "white", "darkblue"]
        const data = {type: availableTypes[Math.floor(Math.random()*availableTypes.length)], 
                        color: availableColors[Math.floor(Math.random()*availableColors.length)],
                        id: Math.random().toString,
                        direction: Math.random()*360,
                        impuls: {x: Math.random()-.5, y: Math.random()-.5},
                        location: {x: Math.random()*200-100, y:Math.random()*200-100}

        }
        console.log("created spaceShipdata: "+data)
        this.spacecraftsData.push(data)
        console.log("this.spacecraftsData.length: "+this.spacecraftsData.length)
    }

    updateSpacecrafts(data){
        const index = this.spacecraftsData.findIndex(p => p.id === data.id);
        if (index !== -1) {
            // Create new array with updated data
            this.spacecraftsData = this.spacecraftsData.map(item => {
                if (item.id === data.id) {
                    return data; // Update existing data
                }
                return item; // Keep other data unchanged
            });
        } else {
            //console.log("Spieler mit dieser ID nicht gefunden, hinzufügen");
            this.spacecraftsData.push(data);
        }
    }
    removeInactiveSpacecrafts(){
        const currentTime = Date.now();
        this.spacecraftsData = this.spacecraftsData.filter(spacecraft => {
            return (currentTime - spacecraft.lastUpdated) <= 10000; // Remove spacecrafts inactive for 10 seconds
        });
    }
}

// Create an instance of SpaceServer
const server = new SpaceServer();
