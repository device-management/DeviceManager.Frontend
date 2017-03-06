import { Injectable } from '@angular/core';

@Injectable()
export class MessageBusSettings {
    url: string;
    hubName: string;
}

export var MESSAGE_BUS_SETTINGS : MessageBusSettings = {
    url : "http://localhost:55343/signalr/hubs",
    hubName: "deviceManagerHub"
}