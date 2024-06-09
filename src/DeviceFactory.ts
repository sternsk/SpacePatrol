import { Device } from "./Device.js";
import { TriangularBeam } from "./TriangularBeam.js";
import { OvalShield } from "./OvalShield.js";

export abstract class DeviceFactory {
    private static deviceMap: { [key: string]: (...args: any[]) => Device } = {
        'triangularBeam': () => new TriangularBeam(),
        'ovalShield': (...args: any[]) => new OvalShield(args[0], args[1]),
    };

    static createDevice(type: string, ...args: any[]): Device | undefined{
        const deviceCreator = this.deviceMap[type];
        if (deviceCreator) {
            return deviceCreator(...args);
        } else {
            return undefined; // Default device
        }
    }
}

