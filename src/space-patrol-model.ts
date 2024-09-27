/*
** this file is created automatically by ReflectionLab.java and will be replaced periodically
*/ 
import * as m0 from './root-model.js';
import * as m1 from './service-api-model.js';
import * as m2 from './reason-model.js';
export interface Vector2d extends m0.GenericEntity {
  x: number;
  y: number;
}
export interface SpacePatrolRequest extends m1.ServiceRequest {
  chissel: boolean;
  collides: string;
  message: string;
  repulsor: boolean;
  spaceObject: SpaceObjectStatus;
  targetId: string;
  tractor: boolean;
}
export interface SpaceObjectStatus extends m0.GenericEntity {
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
