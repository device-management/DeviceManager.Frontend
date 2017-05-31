
export class DeviceDescriptor {
    deviceId : string;
    properties : any;
}

export class DeviceTypes {
    public static readonly Temperature : string = "temperature";
    public static readonly Lighting : string = "lighting";
    public static readonly Fan : string = "fan";
    public static readonly Motor : string = "motor";
}

export class Events {
    public static readonly MeasurementOccured : string = "event.device.measurement";
    public static readonly DeviceRegistered : string = "event.device.register";
    public static readonly DeviceUpdated : string = "event.device.update";
    public static readonly DeviceCommand : string = "event.device.command";
}

export class Channels {
    public static readonly DeviceRegister : string = "channel.device.register";
}

class Point {
    value : number;
    timestamp? : Date;
}

export class MeasurementOccured {
    deviceId: string;
    points: Point[];
}

export class DeviceUpdated {
    deviceId: string;
    properties: any;
}

export class DeviceRegistered {
    deviceId: string;
    properties: any;
}

export class DeviceCommand {
    deviceId: string;
    properties: any;
}