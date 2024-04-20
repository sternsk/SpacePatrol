

export class GameEnvironment{
    private _svgElement: SVGSVGElement;

    constructor(gameFrame: HTMLElement){
        this._svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        gameFrame.appendChild(this._svgElement)
    }

    get svgElement(){
        return(this._svgElement);
    }

    init(){
        
    }
} 