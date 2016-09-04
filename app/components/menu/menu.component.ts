import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DeviceRepository } from '../../services/device-repository';
import { Device } from '../../models/device';
import { Location } from '../../models/location';

@Component({
    selector: 'dm-menu',
    templateUrl: 'app/components/menu/menu.template.html',
    providers: [DeviceRepository]
})
export class MenuComponent { 

    devices$ : Observable<Device[]>;
    locations$ : Observable<Location[]>;
    constructor(private deviceRepository : DeviceRepository){
        this.devices$ = deviceRepository.devices$();
        this.locations$ = deviceRepository.locations$();
    }
}