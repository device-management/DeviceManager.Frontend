import { Directive, OnInit, ElementRef, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

declare var $: any;

@Directive({
    selector: 'input[knob]',
    exportAs: 'dm-knob'
})
export class KnobDirective implements OnInit {

    private knobElement = $(this.element.nativeElement);

    @Output()
    changed = new EventEmitter<number>();

    @Input()
    value : number;

    public constructor(private element: ElementRef) {
    }

    ngOnInit() {
        let own = this;
        this.knobElement.val(this.value);
        this.knobElement.knob({
            'release': function (value) {
                own.value = value;
                own.changed.emit(value);
            },
            'format': function (value) {
                return value + '%';
            },
            'fgColor': '#3c8dbc',
            'width': 150,
            'height': 150,
            'angleOffset':210,
            'angleArc':300
        });
    }
}