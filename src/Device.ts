export interface Device {
    name: string;
    activate(): void;
    dispose():void;
    _gElem: SVGGElement

}