import { Component, NgZone, Input } from '@angular/core';
import { MessageBus } from '../shared/messaging/message-bus';
import { DeviceComponent } from '../device/device.component';
import { Events, MeasurementOccured } from '../device/models';

@Component({
    selector: 'dm-motor',
    templateUrl: './motor.component.html'
})
export class MotorComponent extends DeviceComponent {

    private currentValue: number = 0;
    private newValue: number = 20;

    constructor(messageBus: MessageBus, zone: NgZone) {
        super(messageBus, zone);
    }

    valueChanged(value: number) {
        this.newValue = value;
    }

    applyValue(){
        this.currentValue = this.newValue;
    }
}