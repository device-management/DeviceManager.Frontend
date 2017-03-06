import { Subject, Observable } from 'rxjs';

export interface ILifecycle {
    state : LifecycleState;
    start() : Observable<any>;
    stop() : Observable<any>;
}

export abstract class LifecycleSupport implements ILifecycle {

    state : LifecycleState = LifecycleState.Stopped;
    start() : Observable<any> {
        if(this.state == LifecycleState.Started || this.state == LifecycleState.Starting){
            return;
        }

        this.state = LifecycleState.Starting;
        let startObserver =  this.doStart();
        startObserver.subscribe(
            success => this.state = LifecycleState.Started,
            error => this.stop()
        );
        return startObserver;
    }

    stop() : Observable<any> {
        if(this.state == LifecycleState.Stopped || this.state == LifecycleState.Stopping){
            return;
        }

        this.state = LifecycleState.Stopping;
        let stopObserver =  this.doStop();
        stopObserver.subscribe(
            success => this.state = LifecycleState.Stopped,
            error => this.state = LifecycleState.Stopped,
        )
        return stopObserver;
    }

    protected abstract doStart() : Observable<any>;
    protected abstract doStop() : Observable<any>;
}

export enum LifecycleState {
    Starting,
    Started,
    Stopping,
    Stopped
}