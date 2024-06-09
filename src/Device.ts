export interface Device {
    name: string;
    activated: boolean; 
    activate(): void;
    deactivate():void;
    dispose(): void;
    _gElem: SVGGElement 

}