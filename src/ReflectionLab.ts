/*
/* this file is createt automatically by ReflectionLab.java and will be replaced periodically
*/ 
export interface Vector2d {
  x: number;
  y: number;
}
export interface SpacePatrolRequest {
  method: string;
  spaceObject: SpaceObjectStatus;
  targetId: string;
}
export interface SynchronizeSpaceObjects extends SpacePatrolRequest {
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

export interface ManipulateSpaceObject extends SpacePatrolRequest {
  target: string;
}
