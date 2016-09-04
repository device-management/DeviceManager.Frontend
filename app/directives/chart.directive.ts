import { Directive, ElementRef, Output, Input, EventEmitter, OnInit  } from '@angular/core';

declare var Chart: any;

export class Point {
    x: any;
    y: any;
}

@Directive({
    selector: '[chart]'
})
export class ChartDirective implements OnInit {

    el: any;
    myChart: any;

    @Input()
    points: Point[];

    constructor(element: ElementRef) {
        this.el = element.nativeElement;
    }

    ngOnInit() {
        var canvas = this.el;
        var ctx = canvas.getContext('2d');
        var scatterChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Temperature',
                    data: this.points
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                quarter: 'MMM YYYY'
                            }
                        }
                    }]
                }
            }
        });
    }
}