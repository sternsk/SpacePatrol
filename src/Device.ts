export interface Device {
    name: string;
    activate(): void;
    deactivate():void;
    dispose(): void;
    _gElem: SVGGElement 

}