import { Device } from "./Device.js";
import { TriangularBeam } from "./TriangularBeam.js";
import { ovalShield } from "./ovalShield.js";

export abstract class DeviceFactory {
    private static deviceMap: { [key: string]: () => Device } = {
        'rokket': () => new TriangularBeam(),
        'rainbowRocket': () => new ovalShield(6,8),
        'blitzzer': () => new TriangularBeam(),
        'bromber': () => new TriangularBeam(),
    };

    static createDevice(spacecraftType: string): Device {
        const deviceCreator = this.deviceMap[spacecraftType];
        if (deviceCreator) {
            return deviceCreator();
        } else {
            return new TriangularBeam()
        }
    }
}
