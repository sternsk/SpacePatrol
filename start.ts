import { SpacecraftShape } from "./SpacecraftShape.js";

export const typeSelector = document.getElementById(`typeSelector`)! as HTMLSelectElement;
export const colorSelector = document.getElementById(`colorSelector`)! as HTMLSelectElement;
export const idInputElement = document.getElementById('rocketId')! as HTMLInputElement;

export let viewBoxTop = -50
export let viewBoxLeft = -50
export let viewBoxWidth = 100
export let viewBoxHeight = 100
export let color = "black"

const previewSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGSVGElement
previewSvg.setAttribute("id", "previewSvg")
previewSvg.setAttribute("style", "border: 2px solid brown")
previewSvg.setAttribute("viewBox",`${viewBoxLeft}, ${viewBoxTop}, ${viewBoxWidth}, ${viewBoxHeight}`)

document.getElementById("startPage")!.appendChild(previewSvg)

typeSelector.addEventListener("change", () =>{
    //remove all childcomponents
    while(previewSvg.firstChild)
        previewSvg.removeChild(previewSvg.firstChild)
    
    previewSvg.appendChild(SpacecraftShape.getCraftGElement(typeSelector.value))
})

colorSelector.addEventListener("change", () =>{
    color = colorSelector.value
    while(previewSvg.firstChild)
        previewSvg.removeChild(previewSvg.firstChild)

    previewSvg.appendChild(SpacecraftShape.getCraftGElement(typeSelector.value))
})
previewSvg.appendChild(SpacecraftShape.getCraftGElement(typeSelector.value))

document.getElementById("startButton")?.addEventListener("click", startSpaceGame)

async function startSpaceGame(){
    console.log("gameStarts now! "+typeSelector.value+" "+color+" "+ idInputElement.value)
    
    let lib = await import("./library.js");
    lib.initGame()
    document.getElementById('gamePage')!.style.display = 'block';
    document.getElementById('startPage')!.style.display = 'none';
}


