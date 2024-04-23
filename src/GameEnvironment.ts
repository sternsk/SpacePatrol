

export class GameEnvironment{
    private _svgElement: SVGSVGElement;

    constructor(gameFrame: HTMLElement){
        this._svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._svgElement.setAttribute("viewBox", "-100, -100, 200, 200")
        this._svgElement.setAttribute("tabindex", "0")
        
        gameFrame.appendChild(this._svgElement)
    }

    get svgElement(){
        return(this._svgElement);
    }

    
} 