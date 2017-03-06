
import { Component, EventEmitter, OnChanges, SimpleChanges, Output, Input } from '@angular/core';

@Component({
    selector: 'dm-toggle',
    templateUrl: './toggle-switch.component.html',
    styleUrls: ['./toggle-switch.component.css']
})
export class ToggleSwitchComponent implements OnChanges {

    isProgress: boolean;

    @Output()
    toggle = new EventEmitter<boolean>();

    @Input()
    status: boolean = false;

    clicked() {
        this.isProgress = true;
        this.toggle.emit(!this.status);
        setTimeout(() => this.checkChanges(), 2000);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.isProgress = false;
    }
    
    private checkChanges(){
        this.isProgress = false;
    }
}