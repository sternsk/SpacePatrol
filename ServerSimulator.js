export class ServerSimulator {
    spacecraftsData = [];
    constructor() {
        const server = this.createServer();
        const PORT = 3000;
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    createServer() {
        return {
            listen: (port, callback) => {
                console.log(`Server is running on port ${port}`);
                // Simulate request handling
                document.addEventListener('fetch', async (event) => {
                    const req = event.request;
                    const url = new URL(req.url);
                    let res;
                    if (req.method === 'POST' && url.pathname === '/receive') {
                        const data = await req.text();
                        res = new Response(JSON.stringify({ success: true }), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' }
                        });
                    }
                    else if (req.method === 'GET' && url.pathname === '/send') {
                        const spacecraftId = url.searchParams.get('id');
                        if (spacecraftId) {
                            const filteredspacecraftsData = this.spacecraftsData.filter(spacecraft => spacecraft.id !== spacecraftId);
                            res = new Response(JSON.stringify(filteredspacecraftsData), {
                                status: 200,
                                headers: { 'Content-Type': 'application/json' }
                            });
                        }
                        else {
                            res = new Response('Spacecraft ID is required', {
                                status: 400,
                                headers: { 'Content-Type': 'text/plain' }
                            });
                        }
                    }
                    else {
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
    sync(data) {
        // Check if data is already stored
        const isDataStored = this.spacecraftsData.some((element) => {
            // Assuming the elements are objects and we're comparing their properties/values
            return JSON.stringify(data) === JSON.stringify(element);
        });
        // If data is already stored, log a message and return the current spacecraftsData
        if (isDataStored) {
            console.log("Data already stored");
            return this.spacecraftsData;
        }
        // If data is not stored, push it to spacecraftsData and return the updated array
        console.log("New data detected");
        this.spacecraftsData.push(data);
        return this.spacecraftsData;
    }
    isSpacecraftAlreadyAdded(spacecraft) {
        return this.spacecraftsData.some(existingSpacecraft => existingSpacecraft.id === spacecraft.id);
    }
}
//# sourceMappingURL=ServerSimulator.js.map