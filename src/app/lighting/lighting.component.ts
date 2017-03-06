import { Component, NgZone } from '@angular/core';
import { MessageBus } from '../shared/messaging/message-bus';
import { DeviceComponent } from '../device/device.component';

@Component({
  selector: 'dm-lighting',
  templateUrl: './lighting.component.html'
})
export class LightingComponent extends DeviceComponent {

  constructor(messageBus: MessageBus, zone : NgZone) {
    super(messageBus, zone);
  }
}