import { LifecycleState } from './lifecycle-state';
import { Subject, Observable } from 'rxjs';

export interface ILifecycle {
    state() : LifecycleState;
    startingObservable() : Observable<any>;
    stoppingObservable() : Observable<any>;
    errorObservable() : Observable<any>;
    start();
    stop();
}

export abstract class LifecycleSupport implements ILifecycle {
    
    private readonly _state : LifecycleState = LifecycleState.Stopped;
    protected readonly startingSubject = new Subject();
    protected readonly stoppingSubject = new Subject();
    protected readonly errorSubject = new Subject();

    get state() : LifecycleState {
        return this._state;
    }

    get startingObservable() : Observable<any> {
        return this.startingSubject;
    }

    get stoppingObservable() : Observable<any> {
        return this.stoppingObservable;
    }
    
    get errorObservable() : Observable<any> {
        return this.errorObservable;
    }

    start() {
        if(this.state == LifecycleState.Started || this.state == LifecycleState.Starting){
            return;
        }

    }
    stop() {

    }

    state : LifecycleState;
    start() : Observable<any> {


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