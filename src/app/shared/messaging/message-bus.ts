import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { LifecycleSupport } from '../lifecycle/lifecycle';
import { environment } from '../../../environments/environment';

export interface IMessageBus {
    publish(event: ChannelEvent): Observable<any>;
    subscribe(channel: string): Observable<ChannelEvent>;
    unsubscribe(channel: string): Observable<any>;
}

@Injectable()
export class MessageBus extends LifecycleSupport implements IMessageBus {

    private readonly backendAddress = environment.backendAddress + "/signalr/hubs";
    private readonly hubName = "deviceManagerHub";

    private readonly startingSubject: Subject<any> = new ReplaySubject(1);
    private readonly hubConnection: any;
    private readonly hubProxy: any;
    private readonly channels = new Map<string, Subject<ChannelEvent>>();
    private readonly signalR: SignalR = new SignalR();

    constructor() {
        super();
        if (this.signalR.entrypoint === undefined || this.signalR.entrypoint.hubConnection === undefined) {
            throw new Error("The SignalR entrypoint or the .hubConnection() function are not defined. Please check the SignalR scripts have been loaded properly.");
        }

        this.hubConnection = this.signalR.entrypoint.hubConnection();
        this.hubConnection.url = this.backendAddress;
        this.hubConnection.logging = true;
        this.hubConnection.error(error => console.log(error));
        this.hubConnection.stateChanged(state => console.log(state));
        this.hubProxy = this.hubConnection.createHubProxy(this.hubName);
        this.hubProxy.on("EventArrived", (channelEvent: ChannelEvent) => {
            let channelSub = this.channels.get(channelEvent.channelName);
            if (channelSub) {
                channelSub.next(channelEvent);
            }
        });
    }

    publish(event: ChannelEvent): Observable<any> {
        let publishSub = new Subject();
        this.startingSubject.subscribe(
            () => {
                this.hubProxy.invoke("publish", event);
                publishSub.complete();
            },
            error => publishSub.error(error));
        return publishSub;
    }

    subscribe(channel: string): Observable<ChannelEvent> {
        let channelSub = this.channels.get(channel);
        if (channelSub) {
            return channelSub;
        }

        channelSub = new Subject();
        this.channels.set(channel, channelSub);
        this.startingSubject.subscribe(
            () => this.hubProxy.invoke("subscribe", channel)
                .done(() => console.log(`Successfully subscribed to ${channel} channel`))
                .fail((error: any) => channelSub.error(error)),
            error => channelSub.error(error));

        return channelSub;
    }

    unsubscribe(channel: string): Observable<any> {
        let channelSub = this.channels.get(channel);
        if (channelSub) {
            this.startingSubject.subscribe(
                () => this.hubProxy.invoke("unsubscribe", channel)
                    .done(() => {
                        console.log(`Successfully unsubscribed ${channel} channel`);
                        channelSub.complete();
                        this.channels.delete(channel);
                    })
                    .fail((error: any) => {
                        channelSub.error(error);
                    }),
                error => channelSub.error(error));
            return channelSub;
        }
        return Observable.throw(`The channel ${channel} not found.`);
    }

    protected doStart(): Observable<any> {
        this.hubConnection.start()
            .done(() => this.startingSubject.next())
            .fail(error => this.startingSubject.error(error));
        return this.startingSubject;
    }

    protected doStop(): Observable<any> {
        this.hubConnection.stop();
        return Observable.empty();
    }
}

export class ChannelEvent {
    channelName: string;
    eventName: string;
    data: any;
}

class SignalR {
    get entrypoint(): any {
        return window['$'];
    }
}