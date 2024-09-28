import { Vector2d } from "./space-patrol-model";

export interface Device {
    name: string;
    activated: boolean; 
    activate(target?: Vector2d): void;
    deactivate():void;
    dispose(): void;
    _gElem: SVGGElement 

}