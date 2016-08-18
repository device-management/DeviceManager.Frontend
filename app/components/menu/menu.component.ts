import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DeviceRepository } from '../../services/device-repository';
import { Device } from '../../models/device';
import { Location } from '../../models/location';

@Component({
    selector: 'ef-menu',
    templateUrl: 'app/components/menu/menu.template.html',
    providers: [DeviceRepository]
})
export class MenuComponent { 

    devicesObservable : Observable<Device[]>;
    locationsObservable : Observable<Location[]>;
    constructor(private deviceRepository : DeviceRepository){
        this.devicesObservable = deviceRepository.devicesObservable$;
        this.locationsObservable = deviceRepository.devicesObservable$.map(devices => devices.map(device => device.location));
    }
}