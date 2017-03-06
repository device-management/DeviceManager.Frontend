import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LifecycleSupport } from './shared/lifecycle/lifecycle';
import { Events } from './device/models';
import { MessageBus} from './shared/messaging/message-bus';

@Component({
    selector: 'dm-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(
        @Inject(LifecycleSupport) private services: Array<LifecycleSupport>,
        private messageBus: MessageBus) {
    }

    ngOnInit() {
        window.dispatchEvent(new Event("resize"));
        for (let service of this.services) {
            service.start();
        }
    }

    ngOnDestroy() {
        for (let service of this.services) {
            service.stop();
        }
    }

    subscribe() {
        this.messageBus.subscribe("deviceId").subscribe(
            () => {
                console.log("Subscribe finished")
            }, error => 
            {
                console.log("Error occured during subscribe")
            });
    }
}
