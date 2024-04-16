import { Spacecraft } from "./Spacecraft";

export const typeSelector = document.getElementById(`typeSelector`)! as HTMLSelectElement;
export const colorSelector = document.getElementById(`colorSelector`)! as HTMLSelectElement;
export const idInputElement = document.getElementById('rocketId')! as HTMLInputElement;

const rocketPreviewElement = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGSVGElement
rocketPreviewElement.setAttribute("style", "border: 2px solid brown")
rocketPreviewElement.setAttribute("viewBox","-50,-50,100,100")

document.getElementById("startPage")!.appendChild(rocketPreviewElement)
rocketPreviewElement.appendChild(Spacecraft.getCraftGElement(typeSelector.value))

