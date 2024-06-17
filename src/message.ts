//```javascript
class RequestDefinition<R,Res> {
    readonly path: string;
    constructor(path: string) {
        this.path = path;
    }
}

function evaluate<R,Res>(def: RequestDefinition<R, Res>, request: R): Promise<Res> {
    // use XMLHttpRequest or fetch from some lib to send you request and receive result:
    const paylod = JSON.stringify(request);

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `/api/main/${def.path}`, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response);
                    } catch (error) {
                        reject(new Error("Failed to parse response: " + xhr.responseText));
                    }
                } else {
                    reject(new Error("Request failed with status: " + xhr.status));
                }
            }
        };

        xhr.onerror = () => {
            reject(new Error("Network error"));
        };

        xhr.send(JSON.stringify(request));
    });
}

interface Vector2d {
    x: number;
    y: number;
}

interface SpaceObjectStatus {
    location: Vector2d;
    impuls: Vector2d;
    direction: number;
    id: string;
    type: string;
}

interface SyncronizeSpaceObject {
    rocketStatus: SpaceObjectStatus;
}

const syncSpaceObject = new RequestDefinition<SyncronizeSpaceObject, SpaceObjectStatus[]>("SynchronizedSpaceObject");

async function main() {
    let hans = {
        id: "Hans",
        location: { x:1, y:2.3 },
        impuls: { x:5, y:1.3 },
    } as SpaceObjectStatus;
    
    let sync = {} as SyncronizeSpaceObject;

    sync.rocketStatus = hans;
    
    const otherSpaceObjects = await evaluate(syncSpaceObject, sync);
    
    for (const so of otherSpaceObjects) {
        
    }
}

main();
//```