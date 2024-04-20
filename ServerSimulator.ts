import { Spacecraft } from "./Spacecraft";
import * as http from 'http';

export class ServerSimulator {
    private spacecrafts: Spacecraft[] = [];

    constructor() {
        const server = http.createServer((req, res) => {
            // Handle the request
            if (req.method === 'POST' && req.url === '/receive') {
                let data = '';
                req.on('data', chunk => {
                    data += chunk;
                });

                req.on('end', () => {
                    const receivedSpacecraft = JSON.parse(data) as Spacecraft;
                    if (!this.isSpacecraftAlreadyAdded(receivedSpacecraft)) {
                        this.receiveMessage(receivedSpacecraft);
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                });
            } else if (req.method === 'GET' && req.url === '/send') {
                const query = new URL(req.url!, `http://${req.headers.host}`).searchParams;
                const spacecraftId = query.get('id');
                if (spacecraftId) {
                    const filteredSpacecrafts = this.spacecrafts.filter(spacecraft => spacecraft.id !== spacecraftId);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(filteredSpacecrafts));
                } else {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Spacecraft ID is required');
                }
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        });

        const PORT = 3000;
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }

    private receiveMessage(spacecraft: Spacecraft) {
        this.spacecrafts.push(spacecraft);
    }

    private isSpacecraftAlreadyAdded(spacecraft: Spacecraft): boolean {
        return this.spacecrafts.some(existingSpacecraft => existingSpacecraft.id === spacecraft.id);
    }
}
