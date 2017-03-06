import { IDeviceRepository, FilterDescriptor, FilterResult } from './device-repository';
import { Observable, ReplaySubject} from 'rxjs';

export class DeviceRepositoryMockup implements IDeviceRepository {
    
    private readonly resultSubject : ReplaySubject<FilterResult>;

    constructor(){
        let result : FilterResult = {
            devices: [
                {
                    deviceId: "Device1",
                    properties: {
                        name: "My temperature sensor",
                        type: "temperature",
                        interval: 45,
                        isOnline: true
                    }
                },
                {
                    deviceId: "Device2",
                    properties: {
                        name: "My lighting controller",
                        type: "lighting",
                        isActive: true,
                        isOnline: true
                    }
                },
                {
                    deviceId: "Device3",
                    properties: {
                        name: "My engine controller",
                        type: "engine",
                        rotation: 100,
                        isOnline: true
                    }
                },
                {
                    deviceId: "Device4",
                    properties: {
                        name: "My humidity sensor",
                        type: "humidity",
                        interval: 45,
                        isOnline: true
                    }
                },
            ],
            total: 8
        }
        this.resultSubject = new ReplaySubject(1);
        this.resultSubject.next(result);
    }
    
    filter(filter: FilterDescriptor): Observable<FilterResult> {
        return this.resultSubject;
    }
}