import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Device } from '../models/device';

@Injectable()
export class DeviceRepository {

    private devicesSource = new BehaviorSubject<Array<Device>>([]);
    devicesObservable$ = this.devicesSource.asObservable();

    constructor(){
        this.devicesSource.next(
            [{
                id: 1,
                name: "Lamp",
                location: {
                    id: 1,
                    name: "Living Room"
                },
                type: "Light",
                configuration: {}
            },
            {
                id: 2,
                name: "Thermometer",
                location: {
                    id: 2,
                    name: "Bathroom"
                },
                type: "Thermometer",
                configuration: {}
            }]);
    }
}