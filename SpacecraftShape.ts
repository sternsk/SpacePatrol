import { viewBoxLeft } from "./start.js"
import { viewBoxTop } from "./start.js"
import { viewBoxWidth } from "./start.js"
import { viewBoxHeight } from "./start.js"
import { color } from "./start.js"

export abstract class SpacecraftShape{
    
    
    static getCraftGElement(type: string): SVGGElement{
        const gElement = document.createElementNS("http://www.w3.org/2000/svg", "g")
        const additionalPaths: SVGElement[] = []        
        switch(type){
            
            case "rokket":
                
                const outline = document.createElementNS("http://www.w3.org/2000/svg", "path")
                const inline = document.createElementNS("http://www.w3.org/2000/svg", "path")
                outline.setAttribute("d", `M 0 -8, 
                                            L  -4 8,
                                            L -2 4,
                                            L 0 8,
                                            L 2 6, 
                                            L 4 8,
                                            z`)
                outline.setAttribute("fill","none")
                outline.setAttribute("stroke",`${color}`)
                outline.setAttribute("stroke-width","1px")
                outline.setAttribute('vector-effect', 'non-scaling-stroke')
                
                inline.setAttribute("d", `M -.2 -5,
                                            L .2 -5,
                                            L 2 2,
                                            L -1.5 2,
                                            z`)
                inline.setAttribute("fill", "none")
                inline.setAttribute("stroke", `${color}`)
                inline.setAttribute("stroke-width", ".5px")
                inline.setAttribute('vector-effect', 'non-scaling-stroke')
                gElement.appendChild(outline)
                gElement.appendChild(inline)
                return(gElement)
            
            case "rainbowRocket":
                gElement.setAttribute("fill", "grey");
                gElement.setAttribute("stroke-width", ".5")
                gElement.setAttribute("stroke", `${color}`)

                const wingLeft = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
                wingLeft.setAttribute("d", "M-2 -3 q-1.5 1, -2 3 q1 -0.5, 2 -1z");

                const wingRight = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
                wingRight.setAttribute("d", "M 2 -3 q 1.5 1, 2 3 q-1 -0.5, -2 -1z");

                const summitball = document.createElementNS("http://www.w3.org/2000/svg", "circle") as SVGCircleElement;
                summitball.setAttribute("cx", "0");
                summitball.setAttribute("cy", "-9");
                summitball.setAttribute("r", ".2");
                

                const fire = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
                fire.setAttribute("d", `M -2 2 Q -3 5, -2 8 Q -1 7, -1 6 Q -1 7.5, 0 9 Q 1 7.5, 1 6 Q 1 7, 2 8 Q 3 5, 2 2 Q 0 1.5, -2 2`)

                const topwindow = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
                topwindow.setAttribute("d", "M -1 -5 q .75 -.75, 1 -1 q .75 .75, 1 1 q -1 -.25, -2 0");

                const middlewindow = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
                middlewindow.setAttribute("d", "M-1 -3 q -.5 2, 0 4 q .5 .15, 1 0 q -.5 -2, 0 -4 q -.5 -.15, -1 0");

                gElement.appendChild(wingLeft)
                gElement.appendChild(wingRight)
                gElement.appendChild(summitball)
                gElement.appendChild(fire)
                gElement.appendChild(topwindow)
                gElement.appendChild(middlewindow)

                return(gElement)
            
            case "blizzer":
                gElement.setAttribute("fill", "none");
                gElement.setAttribute("stroke-width", ".5")
                gElement.setAttribute("stroke", `${color}`)

                
                const path0 = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
                path0.setAttribute("d", `M 0,-20, 
                                        L -4, -12 
                                        L -8 -8
                                        L -8 -15`)
                additionalPaths.push(path0)
                
                const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
                path1.setAttribute("d", `M 0,-20, 
                                        L 4, -12 
                                        L 8 -8
                                        L 8 -15`)
                additionalPaths.push(path1)

                const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
                path2.setAttribute("d", `M -4,-10, 
                                        L -4, 0 
                                        L -8 2
                                        L 8 2
                                        L 4 0
                                        L 4 -10`)
                additionalPaths.push(path2)
                break;

            case "bromber":
                gElement.setAttribute("fill", "none");
                gElement.setAttribute("stroke-width", ".5")
                gElement.setAttribute("stroke", `${color}`)

                const box = document.createElementNS("http://www.w3.org/2000/svg", "rect") as SVGRectElement;
                box.setAttribute("x", "-18")
                box.setAttribute("y", "-25")
                box.setAttribute("rx", "10")
                box.setAttribute("ry", "5")
                box.setAttribute("width", "34")
                box.setAttribute("height", "52")
                additionalPaths.push(box)

        }
        
        const imageUrl = `./${type}.png`    
        const image = document.createElementNS("http://www.w3.org/2000/svg", "image")
        image.href.baseVal = imageUrl
        image.onload = () =>{
            let imageWidth = image.getBBox().width
        }
        image.setAttribute("width", `50`)
        image.setAttribute("height", `50`)
        image.setAttribute("transform", `translate (-25,-25)`)

        

        gElement.appendChild(image)
        if(additionalPaths){
            additionalPaths.forEach((object) => {
                gElement.appendChild(object)
            })
        }
        
        return(gElement)
            
    }
}
