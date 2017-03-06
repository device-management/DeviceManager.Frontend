import { Component, OnInit, OnDestroy, NgZone, Input } from '@angular/core';
import { MessageBus, ChannelEvent } from '../shared/messaging/message-bus';
import { DeviceDescriptor, DeviceCommand, DeviceUpdated, Events } from './models';

export abstract class DeviceComponent implements OnInit, OnDestroy {

  @Input()
  protected readonly device: DeviceDescriptor;

  protected readonly handlersMap: Map<string, HandleCallback>;

  isMoreInfoActive : boolean = false;

  constructor(private messageBus: MessageBus, private zone : NgZone) {
    this.handlersMap = new Map();
    this.handlersMap.set(Events.DeviceUpdated, event => this.handleDeviceUpdated(event));
  }

  ngOnInit() {
    this.messageBus.subscribe(this.device.deviceId).subscribe(
      event => {
        let handler = this.handlersMap.get(event.eventName);
        if (handler) {
          this.zone.run(() => handler(event.data));
        } else {
          console.log("Unrecognized event: " + event.eventName);
        }
      },
      error => console.log("Cannot subscribe the device: " + this.device.deviceId));
  }

  ngOnDestroy() {
    this.messageBus.unsubscribe(this.device.deviceId).subscribe(
      event => console.log("Sucessfully unsubscribed device: " + this.device.deviceId),
      error => console.log("Cannot unsubscribe device: " + this.device.deviceId));
  }

  private handleDeviceUpdated(event: DeviceUpdated) {
    Object.keys(event.properties).forEach(key => {
      this.device.properties[key] = event.properties[key];
    });
  }

  private toggleLight() {
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

interface HandleCallback {
  (object: any);
}
