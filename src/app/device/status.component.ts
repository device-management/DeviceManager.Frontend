import { Component, Input } from '@angular/core';

@Component({
    selector: 'dm-status',
    templateUrl: './status.component.html'
})
export class StatusComponent {
 
    @Input()
    status : boolean;

    @Input()
    size : number;
}                                                                                                                                                                                                                                                                                                                                             