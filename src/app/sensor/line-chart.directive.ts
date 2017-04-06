import { Directive, ElementRef, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

declare var Chart: any;
Chart.defaults.global.elements.line.fill = "bottom";
declare var moment: any;

@Directive({
    selector: 'canvas[lineChart]',
    exportAs: 'dm-line-chart'
})
export class LineChartDirective implements OnInit, OnChanges, OnDestroy {

    private readonly startingSubject: Subject<any> = new ReplaySubject(1);

    private chart;

    @Input()
    xUnit: string = "";

    @Input()
    points: Array<Point> = [];

    public constructor(private element: ElementRef) {
    }

    ngOnInit() {
        let ctx = this.element.nativeElement.getContext('2d');
        if (typeof Chart === 'undefined') {
            throw new Error('ng2-charts configuration issue: Embedding Chart.js lib is mandatory');
        }
        this.chart = new Chart(ctx, defaultConfig(this.xUnit));
        this.startingSubject.next();
        this.startingSubject.complete();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.startingSubject.subscribe(
            () => {
                this.chart.data.datasets[0].data = this.points.sort((p1, p2) => p1.x > p2.x ? -1 : 1);
                this.chart.update();
            }
        );
    }

    ngOnDestroy(){
        this.chart.destroy();
    }
}

export class Point {
    x: Date;
    y: number;
}

const defaultConfig = function (xUnit: string) {
    return {
        type: 'line',
        data: {
            datasets: [{
                backgroundColor: "rgba(146, 194, 221, 0.31)",
                borderColor: "rgba(100, 167, 206, 0.8)",
                pointBorderColor: "rgba(60, 141, 188, 1)",
                pointBackgroundColor: "rgba(60, 141, 188, 1)",
                pointHoverBackgroundColor: "rgba(60, 141, 188, 1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHoverRadius: 5,
                pointHitRadius: 10
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 6
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        autoSkipPadding: 10,
                        maxRotation: 0
                    },
                    type: 'time',
                    time: {
                        tooltipFormat: 'YYYY.MM.DD HH:mm:ss',
                        displayFormats: {
                            'millisecond': 'HH:mm:ss',
                            'second': 'HH:mm:ss',
                            'minute': 'HH:mm',
                            'hour': 'ddd, HH:mm',
                            'day': 'DD MMM',
                            'week': 'DD MMM',
                            'month': 'DD MMM',
                            'quarter': 'DD MMM',
                            'year': 'MMM YYYY',
                        }
                    }
                }],
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel.toFixed(1) + xUnit;
                    }
                }
            }
        }
    };
}