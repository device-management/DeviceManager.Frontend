import { Component, NgZone, Input } from '@angular/core';
import { MessageBus, ChannelEvent } from '../shared/messaging/message-bus';
import { DeviceComponent } from '../device/device.component';
import { DeviceCommand, Events } from '../device/models';

@Component({
    selector: 'dm-motor',
    templateUrl: './motor.component.html'
})
export class MotorComponent extends DeviceComponent {

    private newValue: number;

    constructor(messageBus: MessageBus, zone: NgZone) {
        super(messageBus, zone);
    }

    valueChanged(value: number) {
        this.newValue = value;
    }

    applyValue() {
        let deviceCommand: DeviceCommand = {
            deviceId: this.device.deviceId,
            properties: {
                rotation: this.newValue
            }
        }

        let channelEvent: ChannelEvent = {
            channelName: this.device.deviceId,
            eventName: Events.DeviceCommand,
            data: deviceCommand
        }

        this.messageBus.publish(channelEvent).subscribe(
            () => console.log("Sucessfully published message into bus."),
            error => console.log("An error occured during publishing message.")
        );
    }
}