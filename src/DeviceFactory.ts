import { Device } from "./Device.js";
import { TriangularBeam } from "./TriangularBeam.js";
import { RepulsorShield } from "./RepulsorShield.js";
import { TractorBeam } from "./TractorBeam.js";
import { Chissel } from "./Chissel.js";


export abstract class DeviceFactory {
    private static deviceMap: { [key: string]: (...args: any[]) => Device } = {
        'repulsorBeam': () => new TriangularBeam(),
        'chissel': (...args: any[]) => new Chissel(args[0]),
        'repulsorShield': (...args: any[]) => new RepulsorShield(args[0], args[1]),
        'tractorBeam': (...args: any[]) => new TractorBeam()
    };

    static createDevice(type: string, ...args: any[]): Device | undefined{
        const deviceCreator = this.deviceMap[type];
        if (deviceCreator) {
            return deviceCreator(...args);
        } else {
            return new TractorBeam(); // Default device
        }
    }
}

