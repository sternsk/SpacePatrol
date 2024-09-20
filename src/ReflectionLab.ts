export interface SynchronizeSpaceObject {
    spaceObject: SpaceObjectStatus;
  }
  export interface Vector2d {
    x: number;
    y: number;
  }
  export interface SpacePatrolRequest {
  }
  export interface SpaceObjectStatus {
    collidable: boolean;
    craftId: string;
    direction: number;
    impuls: Vector2d;
    location: Vector2d;
    mass: number;
    npc: boolean;
    rotation: number;
    type: string;
  }
  export interface ManipulateSpaceObject {
    method: string;
    spaceObject: SpaceObjectStatus;
    target: string;
  }