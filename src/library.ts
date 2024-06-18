import { SpaceGame } from "./SpaceGame.js"

export function initGame(gameFrame: HTMLElement, type: string, color: string, id: string) {
    console.log("spaceGame loads")
    const game = new SpaceGame()
    game.init(type, color, id)
}

export interface SpaceObjectStatus {
    location: Vector2d;
    impuls: Vector2d;
    direction: number;
    id: string;
    type: string;
}

export interface Vector2d{
    x: number
    y: number
}

export function polarVector(length: number, angle: number): Vector2d{
    return {x: Math.cos(angle)*length, y: Math.sin(angle)*length}
}

export function add(v1: Vector2d, v2: Vector2d): Vector2d{
    return {x: v1.x + v2.x, y: v1.y + v2.y}
}

export function length(v: Vector2d): number{
    return Math.sqrt(v.x * v.x + v.y * v.y)
}

export function angle(v: Vector2d): number{
    return Math.atan2(v.y, v.x)
}

export function distanceBetween(start: Vector2d, destination: Vector2d): number{
    let distanceVector = {x: destination.x - start.x, y: destination.y - start.y} as Vector2d
    return length(distanceVector)
}

export function inverse(v: Vector2d): Vector2d{
    return {x: -v.x, y: -v.y} as Vector2d
}
