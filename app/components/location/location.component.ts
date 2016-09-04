import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceRepository } from '../../services/device-repository';
import { Device } from '../../models/device';
import { Observable } from 'rxjs/Observable';
import { DeviceComponent } from '../device/device.component';

@Component({
    templateUrl: 'app/components/location/location.template.html',
    providers: [DeviceRepository],
    directives: [DeviceComponent]
})
export class LocationComponent implements OnInit { 
    
    devices$ : Observable<Device[]>;

    constructor (private route: ActivatedRoute, private deviceRepository: DeviceRepository) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let locationId = +params['id'];
            this.devices$ = this.deviceRepository.locationDevices$(locationId);
        });
    }
}