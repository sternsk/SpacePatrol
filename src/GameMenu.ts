import { createGElement } from "./SpacecraftShape.js"
import { KeyboardController } from "./KeyboardController.js"
import { Joystick } from "./Joystick.js"
import * as Tone from 'tone'
import { Midi } from '@tonejs/midi';
import { Spacecraft } from "./Spacecraft.js";
import SVGPathCollider from "./svg-path-collider/svg-path-collider.js";


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
export const gameFrame = document.getElementById("spacepatrolContainer")! as unknown as HTMLDivElement
export const keyboardController = new KeyboardController(gameFrame)
export let color: string        //initial color
export let device: string
export let viewBoxWidth = 100
export let audioContext: AudioContext | undefined = undefined
    
export class GameMenu{
    
    joystick = new Joystick()
    typeSelector = document.createElement("select")
    deviceSelector = document.createElement("select")
    
    idInputElement = document.createElement("input")
    
    audioSelector = document.createElement("select")
    audioBuffer?: AudioBuffer

    loopRunning = true;
    rotationImpuls = 0
    rotationAngle = 0

    viewBoxTop = -50
    viewBoxLeft = -50
    
    viewBoxHeight = 100

    previewSvgAspectRatio: number
    previewSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGSVGElement

    keysPressed: {[key:string]:boolean} = {}

    constructor(){
       
        gameFrame.setAttribute("tabIndex","0")

        gameFrame.style.position = "fixed"
        gameFrame.style.outline = "none"
        gameFrame.style.backgroundColor = "#232023"
        // apply fullscreen mode
        gameFrame.style.width = `${window.innerWidth}px`
        gameFrame.style.height = `${window.innerHeight}px`
        gameFrame.appendChild(this.joystick.htmlElement)
        
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
        const homper = document.createElement("option")
        const repulsorJet = document.createElement("option")
        const station = document.createElement("option")
        const station02 = document.createElement("option")
        station02.setAttribute("value", "station02")
        station02.textContent = "station02"
        const helgramSVG = document.createElement("option")
        helgramSVG.setAttribute("value", "helgramSVG")
        helgramSVG.textContent = "helgramSVG"
        const planet = document.createElement("option")
        planet.setAttribute("value", "../resources/planet.png")
        planet.textContent = "planet"

        const noDevice = document.createElement("option")
        noDevice.innerHTML = "disabled selected"
        noDevice.value = "tractorBeam"
        noDevice.textContent = "Choose a Device"

        const repulsorShield = document.createElement("option")
        repulsorShield.value = "repulsorShield"
        repulsorShield.textContent = "Repulsor Shield"

        const chissel = document.createElement("option")
        chissel.value = "chissel"
        chissel.textContent = "Chissel"

        const tractorBeam = document.createElement("option")
        tractorBeam.value = "tractorBeam"
        tractorBeam.textContent = "Tractor Beam"

        this.deviceSelector.appendChild(noDevice)
        this.deviceSelector.appendChild(repulsorShield)
        this.deviceSelector.appendChild(tractorBeam)
        this.deviceSelector.appendChild(chissel)
        this.deviceSelector.addEventListener("change", () =>{
        device = this.deviceSelector.value    
        })

        option1.setAttribute("value", "rainbowRocket")
        option1.innerHTML = "disabled selected"
        option2.setAttribute("value", "rokket")
        option3.setAttribute("value", "rainbowRocket")
        option4.setAttribute("value", "../resources/bromber.svg")
        homper.setAttribute("value", "../resources/homper.png")
        repulsorJet.setAttribute("value", "../resources/repulsorJet.png")
        option5.setAttribute("value", "../resources/blizzer.png")
        option6.setAttribute("value", "../resources/flipps.svg")
        option7.setAttribute("value", "../resources/lopman.png")
        option8.setAttribute("value", "../resources/helgram1.png")
        option9.setAttribute("value", "../resources/carrot.svg")
        option10.setAttribute("value", "../resources/rock.svg")
        option11.setAttribute("value", "../resources/rocket.svg")
        option12.setAttribute("value", "../resources/eye.svg")
        station.setAttribute("value", "station01")
        

        option1.textContent = "Chose your vessel"
        option2.textContent = "rokket"
        option3.textContent = "rainbowRocket"
        option4.textContent = "bromber"
        homper.textContent = "giga Jet"
        repulsorJet.textContent = "repulsor Jet"
        option5.textContent = "blizzer"
        option6.textContent = "flipps"
        option7.textContent = "lopman"
        option8.textContent = "helgram"
        option9.textContent = "carrot"
        option10.textContent = "rock"
        option11.textContent = "rocket"
        option12.textContent = "eye"
        station.textContent = "station"
        
        this.typeSelector.appendChild(option1)
        this.typeSelector.appendChild(option2)
        this.typeSelector.appendChild(option3)
        this.typeSelector.appendChild(option4)
        this.typeSelector.appendChild(repulsorJet)
        this.typeSelector.appendChild(homper)
        this.typeSelector.appendChild(option5)
        this.typeSelector.appendChild(option6)
        this.typeSelector.appendChild(option7)
        this.typeSelector.appendChild(option8)
        this.typeSelector.appendChild(helgramSVG)
        this.typeSelector.appendChild(option9)
        this.typeSelector.appendChild(option10)
        this.typeSelector.appendChild(option11)
        this.typeSelector.appendChild(option12)
        this.typeSelector.appendChild(station)
        this.typeSelector.appendChild(station02)
        this.typeSelector.appendChild(planet)

        const colorSelector = document.createElement("select")
        const option13 = document.createElement("option")
        const option14 = document.createElement("option")
        const option15 = document.createElement("option")
        const option16 = document.createElement("option")

        colorSelector.appendChild(option13)
        colorSelector.appendChild(option14)
        colorSelector.appendChild(option15)
        colorSelector.appendChild(option16)

        option13.setAttribute("value", "beige")
        option14.setAttribute("value", "goldenrod")
        option15.setAttribute("value", "black")
        option16.setAttribute("value", "brown")

        option13.textContent = "beige"
        option14.textContent = "goldenrod"
        option15.textContent = "black"
        option16.textContent = "brown"
        
        this.idInputElement.setAttribute("type", "text")
        this.idInputElement.setAttribute("placeholder", "enter your id")
        
        const startButton = document.createElement("button")
        startButton.textContent = "Start Game"
        startButton.addEventListener("click", this.startSpaceGame.bind(this))
        
        const option17 = document.createElement("option")
        option17.innerHTML = "disabled selected"
        const option18 = document.createElement("option")
        const option19 = document.createElement("option")
        const option20 = document.createElement("option")
        const greatgiginthesky = document.createElement("option")

        this.audioSelector.appendChild(option17)
        this.audioSelector.appendChild(option18)
        this.audioSelector.appendChild(option19)
        this.audioSelector.appendChild(option20)
        this.audioSelector.appendChild(greatgiginthesky)
        this.audioSelector.addEventListener("change", ()=>{
            if (!audioContext)
                this.initAudioContext();
        })

        option17.setAttribute("value", "../resources/letusprogresstothecastleoffunk.mp3")
        option18.setAttribute("value", "../resources/letusprogresstothecastleoffunk.mp3")
        option19.setAttribute("value", "../resources/comfortablynumb.mp3")
        option20.setAttribute("value", "../resources/GreatGigInTheSky.mid")
        greatgiginthesky.setAttribute("value", "../resources/greatgiginthesky.mp3")

        option17.textContent = "Chose music"
        option18.textContent = "Let us progress to the castle of funk"
        option19.textContent = "Comfortably Numb"
        option20.textContent = "Great Gig In The Sky.mid"
        greatgiginthesky.textContent = "Great Gig In The Sky 8bit.mp3"

        const audioButton = document.createElement("button")
        audioButton.textContent = "Activate Audio"
        audioButton.addEventListener("click", () =>{
            audioButton.textContent = "Play Music"
            if(this.audioSelector.value.endsWith(`.mp3`))
                this.playAudio()
            else if(this.audioSelector.value.endsWith(`.mid`))
                this.playMidi()
            else
                console.log("unsupported file format")
        })

        const infoContent = document.createElement("div")
        infoContent.style.color ="darkgrey"
        infoContent.textContent = "Left Right rotate, up down zoom"

        gameFrame.appendChild(this.typeSelector)
        gameFrame.appendChild(this.deviceSelector)
        gameFrame.appendChild(colorSelector)
        gameFrame.appendChild(this.idInputElement)
        gameFrame.appendChild(startButton)
        gameFrame.appendChild(this.audioSelector)
        gameFrame.appendChild(audioButton)
        gameFrame.appendChild(infoContent)
        color = colorSelector.value       //initial color
        device = this.deviceSelector.value

        this.previewSvgAspectRatio = viewBoxWidth / this.viewBoxHeight

        this.previewSvg.style.position = "relative"
        // apply previewSvg to screen orientation
        const aspectRatio = window.innerWidth / window.innerHeight

        if (aspectRatio >= 1) { // landscape orientation
            this.previewSvg.style.width = window.innerHeight.toString()
        }

        gameFrame.appendChild(this.previewSvg)
        
        this.previewSvg.setAttribute("id", "previewSvg")
        this.previewSvg.setAttribute("tabindex", "0")
        this.previewSvg.setAttribute("viewBox",`${this.viewBoxLeft}, ${this.viewBoxTop}, ${viewBoxWidth}, ${this.viewBoxHeight}`)
        this.previewSvg.style.zIndex = "-1"
        this.previewSvg.style.outline = "none"

        this.previewSvg.appendChild(createGElement(this.typeSelector.value))
        
        this.typeSelector.addEventListener("change", () =>{
            //remove all childcomponents
            while(this.previewSvg.firstChild)
                this.previewSvg.removeChild(this.previewSvg.firstChild)
            
            this.previewSvg.appendChild(createGElement(this.typeSelector.value))
            this.previewSvg.focus()
        })
    
        colorSelector.addEventListener("change", () =>{
            color = colorSelector.value
            while(this.previewSvg.firstChild)
            this.previewSvg.removeChild(this.previewSvg.firstChild)
            this.previewSvg.focus()
            this.previewSvg.appendChild(createGElement(this.typeSelector.value))
        })
    
        
    }
    loop(){
        if(!this.loopRunning) return
        requestAnimationFrame(() => this.loop())

        if(this.joystick.isTouched){
            //console.log(this.joystick.value)
            this.rotationImpuls = this.joystick.value.x *100
            
            viewBoxWidth += this.joystick.value.y 
            this.viewBoxLeft = viewBoxWidth / -2
            this.viewBoxHeight = viewBoxWidth * this.previewSvgAspectRatio
            this.viewBoxTop = this.viewBoxHeight / -2
            this.previewSvg.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${viewBoxWidth}, ${this.viewBoxHeight}`)
        }
        
        if (keyboardController.getKeysPressed()[`ArrowLeft`]){
            this.rotationImpuls -= 1
        }else if(keyboardController.getKeysPressed()[`ArrowRight`]){
            this.rotationImpuls += 1
        }
        
        if (keyboardController.getKeysPressed()[`ArrowUp`]){
            viewBoxWidth += viewBoxWidth / 10
            this.viewBoxLeft = viewBoxWidth / -2
            this.viewBoxHeight = viewBoxWidth * this.previewSvgAspectRatio
            this.viewBoxTop = this.viewBoxHeight / -2
            this.previewSvg.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${viewBoxWidth}, ${this.viewBoxHeight}`)
        }else if(keyboardController.getKeysPressed()[`ArrowDown`]){
            viewBoxWidth -= viewBoxWidth / 10
            this.viewBoxLeft = viewBoxWidth / -2
            this.viewBoxHeight = viewBoxWidth * this.previewSvgAspectRatio
            this.viewBoxTop = this.viewBoxHeight / -2
            this.previewSvg.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${viewBoxWidth}, ${this.viewBoxHeight}`)
        }
    
        this.rotationAngle += this.rotationImpuls
        this.rotationAngle = (this.rotationAngle%360 + 360)%360
        this.previewSvg.style.transform = `rotate(${this.rotationAngle}deg)`
        if(!this.keysPressed[`ArrowLeft`]&&!this.keysPressed[`ArrowRight`]){
            this.rotationImpuls -= this.rotationImpuls/100
        }

        if(Math.abs(this.rotationImpuls)<.1)
            this.rotationImpuls = 0
    }
    
    initAudioContext(){
        audioContext = new (window.AudioContext)
    }

    loadAudio(){
        fetch(this.audioSelector.value)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                if (audioContext) {
                    return audioContext.decodeAudioData(buffer)
                }
            })
            .then(decodedBuffer => {
                if (decodedBuffer) {
                    this.audioBuffer = decodedBuffer;
                }
            })
            .catch(error => {
                console.error('Error loading audio file:', error)
            })
    }

    playAudio(){
        
        if(!audioContext)
            this.initAudioContext()
        
        this.loadAudio()
        const source = audioContext!.createBufferSource();
        
        if(this.audioBuffer)
            source.buffer = this.audioBuffer;
        
        source.connect(audioContext!.destination);
        source.start(0);
    }


    // Funktion zum Abspielen von MIDI-Dateien mit 8-Bit-Effekt
    
    async playMidi() {
        try {
            const response = await fetch(this.audioSelector.value);
            const arrayBuffer = await response.arrayBuffer();
            const midi = new Midi(arrayBuffer);

            const bitCrusher = new Tone.BitCrusher(4).toDestination();
            const synth = new Tone.Synth({
                oscillator: {
                    type: 'square'
                },
                envelope: {
                    attack: 0.005,
                    decay: 0.1,
                    sustain: 0.3,
                    release: 1
                }
            }).connect(bitCrusher);

            midi.tracks.forEach(track => {
                track.notes.forEach(note => {
                    synth.triggerAttackRelease(
                        note.name,
                        note.duration,
                        note.time
                    );
                });
            });

            Tone.start();
        } catch (error) {
            console.error('Error loading or playing MIDI file:', error);
        }
    }
    
    async startSpaceGame(){
        
        this.loopRunning = false
        console.log("starting SpaceGame")
        console.log(`Commander ${this.idInputElement.value}departs in a ${color} ${this.typeSelector.value}. Game starts now!`)
        
        try {
            // Dynamically import the library.js module
            let lib = await import("./library.js");
            
            // Call the initGame function from the imported module
            gameFrame.innerHTML = ""
            
            // check that the gameFrame is properly sized
            if(gameFrame.offsetWidth && gameFrame.offsetHeight){
                lib.initGame(gameFrame, this.typeSelector.value, color, this.idInputElement.value);
            }
            else{
                console.log("Error getting gameFrame size!")
                //lib.initGame(gameFrame, typeSelector.value, color, idInputElement.value);
            }    
            
        } catch (error) {
            console.error("Error loading library:", error);
        }
    }
    
}
