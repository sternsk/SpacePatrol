import { SpacecraftShape } from "./SpacecraftShape.js";
import { initGame } from "./library.js";

export const availableTypes = ["rainbowRocket", 
                                "rokket", 
                                "bromber.svg", 
                                "blizzer.png", 
                                "flipps.svg", 
                                "lopman.png", 
                                "helgram1.png", 
                                "carrot.svg", 
                                "rock.svg", 
                                "eye.svg"]
export const typeSelector = document.getElementById(`typeSelector`)! as HTMLSelectElement;
export const colorSelector = document.getElementById(`colorSelector`)! as HTMLSelectElement;
export const idInputElement = document.getElementById('rocketId')! as HTMLInputElement;

export let viewBoxTop = -50
export let viewBoxLeft = -50
export let viewBoxWidth = 100
export let viewBoxHeight = 100
export let color = "grey"       //initial color

let loopRunning = true;

let keysPressed: {[key:string]:boolean} = {}
let rotationImpuls = 0
let rotationAngle = 0
let previewSvgAspectRatio = viewBoxWidth / viewBoxHeight

const previewSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGSVGElement
previewSvg.style.position = "fixed"
previewSvg.style.outline = "none"

previewSvg.setAttribute("id", "previewSvg")
previewSvg.setAttribute("tabindex", "0")
previewSvg.setAttribute("viewBox",`${viewBoxLeft}, ${viewBoxTop}, ${viewBoxWidth}, ${viewBoxHeight}`)

previewSvg.addEventListener(`keydown`, handleKeyDown.bind(this))
previewSvg.addEventListener(`keyup`, handleKeyUp.bind(this))

function handleKeyDown(event: KeyboardEvent):void{
    keysPressed[event.key] = true;
}

function handleKeyUp(event: KeyboardEvent):void{
    keysPressed[event.key] = false;
}

function loop(){
    if(!loopRunning) return
    requestAnimationFrame(() => loop())
    
    if(keysPressed["ArrowLeft"]){
        rotationImpuls -= 1
    }
    else if(keysPressed["ArrowRight"]){
        rotationImpuls += 1
    }
    
    if(keysPressed["ArrowUp"]){
        viewBoxWidth += viewBoxWidth / 10
        viewBoxLeft = viewBoxWidth / -2
        viewBoxHeight = viewBoxWidth * previewSvgAspectRatio
        viewBoxTop = viewBoxHeight / -2
        previewSvg.setAttribute("viewBox", `${viewBoxLeft}, ${viewBoxTop}, ${viewBoxWidth}, ${viewBoxHeight}`)
    }
    
    if(keysPressed["ArrowDown"]){
        viewBoxWidth -= viewBoxWidth / 10
        viewBoxLeft = viewBoxWidth / -2
        viewBoxHeight = viewBoxWidth * previewSvgAspectRatio
        viewBoxTop = viewBoxHeight / -2
        previewSvg.setAttribute("viewBox", `${viewBoxLeft}, ${viewBoxTop}, ${viewBoxWidth}, ${viewBoxHeight}`)
    }

    rotationAngle += rotationImpuls
    rotationAngle = (rotationAngle%360 + 360)%360
    previewSvg.style.transform = `rotate(${rotationAngle}deg)`
    if(!keysPressed[`ArrowLeft`]&&!keysPressed[`ArrowRight`]){
        rotationImpuls -= rotationImpuls/100
    }

    if(Math.abs(rotationImpuls)<.1)
        rotationImpuls = 0
}

document.getElementById("startPage")!.appendChild(previewSvg)

typeSelector.addEventListener("change", () =>{
    //remove all childcomponents
    while(previewSvg.firstChild)
        previewSvg.removeChild(previewSvg.firstChild)
    
    previewSvg.appendChild(SpacecraftShape.getCraftGElement(typeSelector.value))
    previewSvg.focus()
})

colorSelector.addEventListener("change", () =>{
    color = colorSelector.value
    while(previewSvg.firstChild)
    previewSvg.removeChild(previewSvg.firstChild)
    previewSvg.focus()
    previewSvg.appendChild(SpacecraftShape.getCraftGElement(typeSelector.value))
})
previewSvg.appendChild(SpacecraftShape.getCraftGElement(typeSelector.value))

document.getElementById("startButton")?.addEventListener("click", startSpaceGame)

async function startSpaceGame(){
    loopRunning = false
    console.log(`Commander ${idInputElement.value}, you depart in a ${color} ${typeSelector.value}. Game starts now!`)
    
    try {
        // Dynamically import the library.js module
        let lib = await import("./library.js");
        
        // Call the initGame function from the imported module
        lib.initGame(document.getElementById("gameFrame")!, typeSelector.value, color, idInputElement.value);
        
        // Hide startPage and display gamePage
        document.getElementById('gamePage')!.style.display = 'block';
        document.getElementById('startPage')!.style.display = 'none';
    } catch (error) {
        console.error("Error loading library:", error);
    }
    
}
loop()

