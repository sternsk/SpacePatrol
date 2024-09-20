export interface Vector2d{
    x: number
    y: number
}

export interface ManipulateSpaceObject{
    spaceObject: SpaceObjectStatus;
    target: string;
    method: string;
}

export interface SyncronizeSpaceObject {
    spaceObject: SpaceObjectStatus;
}
export interface SpaceObjectStatus {
    location: Vector2d;
    impuls: Vector2d;
    direction: number;
    rotation: number;
    mass:number;
    craftId: string;
    type: string;
    npc: boolean;
}