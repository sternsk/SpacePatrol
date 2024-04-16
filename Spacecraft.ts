
export abstract class Spacecraft{
    
    static getCraftGElement(type: string): SVGGElement{
        const gElement = document.createElementNS("http://www.w3.org/2000/svg", "g")
                
        switch(type){
            case "rocket":
                
                const outline = document.createElementNS("http://www.w3.org/2000/svg", "path")
                const inline = document.createElementNS("http://www.w3.org/2000/svg", "path")
                outline.setAttribute("d", `M 0 8, 
                                            L  -4 -8,
                                            L -2 -4,
                                            L 0 -8,
                                            L 2 -6, 
                                            L 4 -8,
                                            z`)
                outline.setAttribute("fill","none")
                outline.setAttribute("stroke","black")
                outline.setAttribute("stroke-width","1px")
                outline.setAttribute("stroke-width","1px")
                outline.setAttribute('vector-effect', 'non-scaling-stroke')

                
                inline.setAttribute("d", `M -1 6,
                                            L 1 6,
                                            L -2 2,
                                            L 1.5 2,
                                            z`)
                inline.setAttribute("fill", "black")
                gElement.appendChild(outline)
                gElement.appendChild(inline)
                return(gElement)
            
            case "rainbowRocket":
                gElement.setAttribute("fill", "none");
                gElement.setAttribute("stroke-width", "1px")

                const wingLeft = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
                wingLeft.setAttribute("d", "M-2 -3 q-1.5 1, -2 3 q1 -0.5, 2 -1z");

                const wingRight = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
                wingRight.setAttribute("d", "M 2 -3 q 1.5 1, 2 3 q-1 -0.5, -2 -1z");

                const summitball = document.createElementNS("http://www.w3.org/2000/svg", "circe") as SVGCircleElement;
                summitball.setAttribute("cx", "0");
                summitball.setAttribute("cy", "-10");
                summitball.setAttribute("r", ".2");
                summitball.setAttribute("fill", "orange");

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
        }
        return(gElement)
            
    }
}
