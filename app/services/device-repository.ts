import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Device } from '../models/device';
import { Location } from '../models/location';

@Injectable()
export class DeviceRepository {

    private _devices$ = new BehaviorSubject<Device[]>([]);

    constructor(){
        this._devices$.next(
            [{
                id: 1,
                name: "Lamp",
                location: {
                    id: 1,
                    name: "Living Room"
                },
                type: "Light",
                configuration: {
                    enabled: true
                }
            },
            {
                id: 2,
                name: "Thermometer",
                location: {
                    id: 2,
                    name: "Bathroom"
                },
                type: "Thermometer",
                configuration: {
                    enabled: false
                }
            },
            {
                id: 3,
                name: "Thermometer",
                location: {
                    id: 1,
                    name: "Living Room"
                },
                type: "Thermometer",
                configuration: {
                    enabled: false
                }
            },
            {
                id: 4,
                name: "Light",
                location: {
                    id: 1,
                    name: "Living Room"
                },
                type: "Light",
                configuration: {
                    enabled: false
                }
            }]);
    }

    devices$() : Observable<Device[]> {
        return this._devices$.asObservable();
    }

    device$(deviceId : number) : Observable<Device> {
        return this._devices$.map(devices => devices.filter(device => device.id == deviceId)[0]);
    }

    locationDevices$(locationId : number) : Observable<Device[]>{
        return this._devices$.map(devices => devices.filter(device => device.location.id == locationId));
    }

    locations$() : Observable<Location[]>{
        return this._devices$.map(devices => devices.map(device => device.location));
    }
}