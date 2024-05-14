import { SpacecraftShape } from "./SpacecraftShape.js";
import { Joystick } from "./Joystick.js";

/*export const availableTypes = ["rainbowRocket", 
                                "rokket", 
                                "bromber.svg", 
                                "blizzer.png", 
                                "flipps.svg", 
                                "lopman.png", 
                                "helgram1.png", 
                                "carrot.svg", 
                                "rock.svg", 
                                "eye.svg"]
*/
export const gameFrame = document.getElementById("spacepatrolContainer")!

// apply fullscreen mode
gameFrame.style.width = `${window.innerWidth}px`
gameFrame.style.height = `${window.innerHeight}px`

const joystick = new Joystick()
gameFrame.appendChild(joystick.htmlElement)

const typeSelector = document.createElement("select")
const option1 = document.createElement("option")
const option2 = document.createElement("option")
const option3 = document.createElement("option")
const option4 = document.createElement("option")
const option5 = document.createElement("option")
const option6 = document.createElement("option")
const option7 = document.createElement("option")
const option8 = document.createElement("option")
const option9 = document.createElement("option")
const option10 = document.createElement("option")
const option11 = document.createElement("option")
const option12 = document.createElement("option")

typeSelector.appendChild(option1)
typeSelector.appendChild(option2)
typeSelector.appendChild(option3)
typeSelector.appendChild(option4)
typeSelector.appendChild(option5)
typeSelector.appendChild(option6)
typeSelector.appendChild(option7)
typeSelector.appendChild(option8)
typeSelector.appendChild(option9)
typeSelector.appendChild(option10)
typeSelector.appendChild(option11)
typeSelector.appendChild(option12)

option1.setAttribute("value", "rainbowRocket")
option1.innerHTML = "disabled selected"
option2.setAttribute("value", "rokket")
option3.setAttribute("value", "rainbowRocket")
option4.setAttribute("value", "../resources/bromber.svg")
option5.setAttribute("value", "../resources/blizzer.png")
option6.setAttribute("value", "../resources/flipps.svg")
option7.setAttribute("value", "../resources/lopman.png")
option8.setAttribute("value", "../resources/helgram1.png")
option9.setAttribute("value", "../resources/carrot.svg")
option10.setAttribute("value", "../resources/rock.svg")
option11.setAttribute("value", "../resources/rocket.svg")
option12.setAttribute("value", "../resources/eye.svg")

option1.textContent = "Chose your vessel"
option2.textContent = "rokket"
option3.textContent = "rainbowRocket"
option4.textContent = "bromber"
option5.textContent = "blizzer"
option6.textContent = "flipps"
option7.textContent = "lopman"
option8.textContent = "helgram"
option9.textContent = "carrot"
option10.textContent = "rock"
option11.textContent = "rocket"
option12.textContent = "eye"

const colorSelector = document.createElement("select")
const option13 = document.createElement("option")
const option14 = document.createElement("option")
const option15 = document.createElement("option")

colorSelector.appendChild(option13)
colorSelector.appendChild(option14)
colorSelector.appendChild(option15)

option13.setAttribute("value", "brown")
option14.setAttribute("value", "goldenrod")
option15.setAttribute("value", "beige")

option13.textContent = "brown"
option14.textContent = "goldenrod"
option15.textContent = "beige"

const idInputElement = document.createElement("input")
idInputElement.setAttribute("type", "text")
idInputElement.setAttribute("placeholder", "enter your id")

const startButton = document.createElement("button")
startButton.textContent = "Start Game"
startButton.addEventListener("click", startSpaceGame)

const infoContent = document.createElement("div")
infoContent.textContent = "Left Right rotate, up down zoom"

gameFrame.appendChild(typeSelector)
gameFrame.appendChild(colorSelector)
gameFrame.appendChild(idInputElement)
gameFrame.appendChild(startButton)
gameFrame.appendChild(infoContent)

let viewBoxTop = -50
let viewBoxLeft = -50
let viewBoxWidth = 100
let viewBoxHeight = 100
export let color = "lightblue"       //initial color

let loopRunning = true;

let keysPressed: {[key:string]:boolean} = {}
let rotationImpuls = 0
let rotationAngle = 0
let previewSvgAspectRatio = viewBoxWidth / viewBoxHeight

const previewSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGSVGElement
previewSvg.style.position = "relative"
//appy apply previewSvg to screen orientation
const aspectRatio = window.innerWidth / window.innerHeight

if (aspectRatio >= 1) { // landscape orientation
    previewSvg.style.width = window.innerHeight.toString()
}


gameFrame.appendChild(previewSvg)

previewSvg.setAttribute("id", "previewSvg")
previewSvg.setAttribute("tabindex", "0")
previewSvg.setAttribute("viewBox",`${viewBoxLeft}, ${viewBoxTop}, ${viewBoxWidth}, ${viewBoxHeight}`)
previewSvg.style.zIndex = "-1"
previewSvg.appendChild(SpacecraftShape.getCraftGElement(typeSelector.value))

document.addEventListener(`keydown`, handleKeyDown.bind(this))
document.addEventListener(`keyup`, handleKeyUp.bind(this))

function handleKeyDown(event: KeyboardEvent):void{
    keysPressed[event.key] = true;
    console.log("keydown, gameMenu is listening")
}

function handleKeyUp(event: KeyboardEvent):void{
    keysPressed[event.key] = false;
}

function loop(){
    if(!loopRunning) return
    requestAnimationFrame(() => loop())

    if(joystick.isTouched){
        rotationImpuls = joystick.value.x * 100
        
        viewBoxWidth += joystick.value.y * 10
        viewBoxLeft = viewBoxWidth / -2
        viewBoxHeight = viewBoxWidth * previewSvgAspectRatio
        viewBoxTop = viewBoxHeight / -2
        previewSvg.setAttribute("viewBox", `${viewBoxLeft}, ${viewBoxTop}, ${viewBoxWidth}, ${viewBoxHeight}`)
    }

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


async function startSpaceGame(){
    loopRunning = false
    console.log(`Commander ${idInputElement.value}, you depart in a ${color} ${typeSelector.value}. Game starts now!`)
    

    try {
        // Dynamically import the library.js module
        let lib = await import("./library.js");
        
        // Call the initGame function from the imported module
        gameFrame.innerHTML = ""
        
        // check that the gameFrame is properly sized
        if(gameFrame.offsetWidth && gameFrame.offsetHeight){
            console.log("gameFrame sized!")
            lib.initGame(gameFrame, typeSelector.value, color, idInputElement.value);
        }
        else{
            console.log("Error getting gameFrame size!")
            //lib.initGame(gameFrame, typeSelector.value, color, idInputElement.value);
        }    
        
    } catch (error) {
        console.error("Error loading library:", error);
    }
        
    
}
loop()

