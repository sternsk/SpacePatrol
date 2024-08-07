import { SpaceGame } from "./SpaceGame.js"

export function initGame(gameFrame: HTMLElement, type: string, color: string, id: string) {
    console.log("spaceGame loads")
    const game = new SpaceGame()
    game.init(type, color, id)
}

export interface Vector2d{
    x: number
    y: number
}

export function polarVector(length: number, angle: number): Vector2d{
    const radAngle = angle/180 * Math.PI
    return {x: Math.cos(radAngle)*length, y: Math.sin(radAngle)*length}
}

export function add(v1: Vector2d, v2: Vector2d): Vector2d{
    return {x: v1.x + v2.x, y: v1.y + v2.y}
}

export function length(v: Vector2d): number{
    return Math.sqrt(v.x * v.x + v.y * v.y)
}

export function angle(v: Vector2d): number{
    return Math.atan2(v.y, v.x) / Math.PI * 180
}

export function distanceBetween(start: Vector2d, destination: Vector2d): number{
    let distanceVector = {x: destination.x - start.x, y: destination.y - start.y} as Vector2d
    return length(distanceVector)
}

export function inverse(v: Vector2d): Vector2d{
    return {x: -v.x, y: -v.y} as Vector2d
}

export class RequestDefinition<R, Res> {
    readonly path: string;
    constructor(path: string) {
        this.path = path;
    }
}

export interface SpaceObjectStatus {
    location: Vector2d;
    impuls: Vector2d;
    direction: number;
    craftId: string;
    type: string;
}

export interface SyncronizeSpaceObject {
    rocketStatus: SpaceObjectStatus;
}

export const syncSpaceObject = new RequestDefinition<SyncronizeSpaceObject, SpaceObjectStatus[]>("SynchronizeSpaceObject");

export function evaluate<R, Res>(def: RequestDefinition<R, Res>, request: R): Promise<Res> {
    // use XMLHttpRequest or fetch from some lib to send you request and receive result:
    const payload = JSON.stringify(request);

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
