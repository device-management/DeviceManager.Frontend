import { Component, NgZone } from '@angular/core';
import { MessageBus, ChannelEvent } from '../shared/messaging/message-bus';
import { DeviceComponent } from '../device/device.component';
import { DeviceCommand, Events } from '../device/models'

@Component({
  selector: 'dm-lighting',
  templateUrl: './lighting.component.html'
})
export class LightingComponent extends DeviceComponent {

  constructor(messageBus: MessageBus, zone : NgZone) {
    super(messageBus, zone);
  }
  
  toggleLight() {
    let deviceCommand: DeviceCommand = {
      deviceId: this.device.deviceId,
      properties: {
        isActive: !this.device.properties.isActive
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