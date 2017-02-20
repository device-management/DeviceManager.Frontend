
import { ChannelEvent } from './channel-event';
import { MessageBusSettings } from './message-bus-settings';
import { Subscription, Subject, Observable } from 'rxjs';
import { LifecycleSupport } from '../lifecycle/lifecycle';

export interface IMessageBus {
    publish(event: ChannelEvent);
    subscribe(channel: string): Observable<ChannelEvent>;
    unsubscribe(channel: string): Observable<any>;
}

export class MessageBus extends LifecycleSupport implements IMessageBus {

    private readonly hubConnection: any;
    private readonly hubProxy: any;
    private readonly channels = new Map<string, Subject<ChannelEvent>>();

    constructor(private settings: MessageBusSettings, private signalR: SignalR) {
        super();
        if (this.signalR.entrypoint === undefined || this.signalR.entrypoint.hubConnection === undefined) {
            throw new Error("The SignalR entrypoint or the .hubConnection() function are not defined. Please check the SignalR scripts have been loaded properly.");
        }

        this.hubConnection = this.signalR.entrypoint.hubConnection();
        this.hubConnection.url = settings.url;
        this.hubProxy = this.hubConnection.createHubProxy(settings.hubName);

        this.hubProxy.on("EventArrived", (channel: string, event: ChannelEvent) => {
            let channelSub = this.channels.get(channel);
            if (channelSub) {
                channelSub.next(event);
            }
        });
    }

    publish(event: ChannelEvent) {
        this.hubProxy.invoke("Publish", event);
    }

    subscribe(channel: string): Observable<ChannelEvent> {
        let channelSub = this.channels.get(channel);
        if(channelSub){
            return channelSub;
        }

        channelSub = new Subject();
        this.channels.set(channel, channelSub);
        this.hubProxy.invoke("Subscribe", channel)
                .done(() => {
                    console.log(`Successfully subscribed to ${channel} channel`);
                })
                .fail((error: any) => {
                    channelSub.error(error);
                    channelSub.complete();
                    this.channels.delete(channel);
                });
        return channelSub;
    }

    unsubscribe(channel: string) : Observable<any> {
        let channelSub = this.channels.get(channel);
        if(channelSub){
            this.hubProxy.invoke("Unsubscribe", channel).done(() => {
                    console.log(`Successfully unsubscribed ${channel} channel`);
                    channelSub.complete();
                    this.channels.delete(channel);
                })
                .fail((error: any) => {
                    channelSub.error(error);
                });
                return channelSub;
        }
        return Observable.throw(`The channel ${channel} not found.`);
    }

    protected doStart() : Observable<any> {
        let subject = new Subject();
        this.hubConnection.start()
            .done(() => {
                subject.next();
                subject.complete();
            })
            .fail((error: any) => {
                subject.error(error);
                subject.complete();
            });
        
        return subject;
    }

    protected doStop() : Observable<any> {
        this.hubConnection.stop();
        return Observable.empty();;
    }
}

class SignalR {
    get entrypoint(): any {
        return window['$'];
    }
}