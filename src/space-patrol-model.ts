/*
** this file is created automatically by ReflectionLab.java and will be replaced periodically
*/ 
import * as m0 from './root-model.js';
import * as m1 from './service-api-model.js';
import * as m2 from './reason-model.js';
export interface SpaceObjectStatus extends m0.GenericEntity {
  activeDevice: string;
  collidable: boolean;
  craftId: string;
  direction: number;
  focus: string;
  impuls: Vector2d;
  location: Vector2d;
  mass: number;
  npc: boolean;
  rotation: number;
  type: string;
}
export interface Vector2d extends m0.GenericEntity {
  x: number;
  y: number;
}
export interface SyncResponse extends m0.GenericEntity {
  nestedResults: any[];
  status: SpaceObjectStatus[];
}
export interface SpacePatrolRequest extends m1.ServiceRequest {
}
export interface Sync extends SpacePatrolRequest {
  collides: SpaceObjectStatus;
  message: SpaceNotification;
  nestedRequests: m1.ServiceRequest[];
  spaceObject: SpaceObjectStatus;
}
export interface SpaceNotification extends m0.GenericEntity {
  averageRequestProcessingDuration: number;
  numberOfClients: number;
  recipients: string[];
}
