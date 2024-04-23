import { Spacecraft } from "./Spacecraft.js";

export class SpaceServer {
    private spacecraftsData: Record<string, any>[] = [];

    constructor() {
        const server = this.createServer();
        
        const PORT = 3000;
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }

    private createServer() {
        return {
            listen: (port: number, callback: () => void) => {
                console.log(`Server is running on port ${port}`);
    
                // Simulate request handling
                document.addEventListener('fetch', async (event: any) => {
                    
                    const req = event.request;
                    const url = new URL(req.url);
                    let res;
    
                    if (req.method === 'POST' && url.pathname === '/receive') {
                        const data = await req.text();
                        
                        res = new Response(JSON.stringify({ success: true }), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' }
                        });
                    } else if (req.method === 'GET' && url.pathname === '/send') {
                        const spacecraftId = url.searchParams.get('id');
                        if (spacecraftId) {
                            const filteredspacecraftsData = this.spacecraftsData.filter(spacecraft => spacecraft.id !== spacecraftId);
                            res = new Response(JSON.stringify(filteredspacecraftsData), {
                                status: 200,
                                headers: { 'Content-Type': 'application/json' }
                            });
                        } else {
                            res = new Response('Spacecraft ID is required', {
                                status: 400,
                                headers: { 'Content-Type': 'text/plain' }
                            });
                        }
                    } else {
                        res = new Response('Not Found', {
                            status: 404,
                            headers: { 'Content-Type': 'text/plain' }
                        });
                    }
    
                    event.respondWith(res);
                });
    
                callback(); // Call the callback to indicate that the server is listening
            }
        };
    }
    
    

    sync(data: Record<string, any>): Promise<Record<string, any>[]> {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/sync', { // Assuming your server endpoint is /sync
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to sync data');
                }
                return response.json();
            })
            .then(responseData => {
                console.log("Server response:", responseData);
                resolve(responseData);
            })
            .catch(error => {
                console.error('Error syncing data:', error);
                reject(error);
            });
        });
    }
    
    

    private isSpacecraftAlreadyAdded(spacecraft: Spacecraft): boolean {
        return this.spacecraftsData.some(existingSpacecraft => existingSpacecraft.id === spacecraft.id);
    }
}
