import { Directive, ElementRef, Output, AfterViewInit, EventEmitter } from '@angular/core';

declare var daterangepicker: any;
declare var moment: any;
declare var $: any;

@Directive({
    selector: 'input[dateRange]',
    exportAs: 'dm-date-range'
})
export class DateRangeDirective implements AfterViewInit {

    private dateRangeElement = $(this.element.nativeElement);

    @Output()
    select = new EventEmitter<DateRange>();

    public constructor(private element: ElementRef) {
    }

    ngAfterViewInit() {
        this.validateDependences();
        let dateRanges = {};
        DateRangeGenerators.forEach((value, key) => {
            dateRanges[key] = [moment(value.startDate), moment(value.endDate)];
        });
        let todayDateRange: DateRange = DateRangeGenerators.get(DateRanges.Today);
        this.dateRangeElement.daterangepicker(
            {
                startDate: moment(todayDateRange.startDate),
                endDate: moment(todayDateRange.endDate),
                ranges: dateRanges,
                autoUpdateInput: false
            },
            (start, end, type) => this.handleDateSelect(start, end, type));
        this.select.emit(todayDateRange);
        this.dateRangeElement.val(DateRanges.Today);
    }

    private handleDateSelect(start, end, type: string) {
        let dateRange = DateRangeGenerators.get(type);
        if (dateRange) {
            this.dateRangeElement.val(type);
            this.select.emit(dateRange);
        } else {
            this.dateRangeElement.val(start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD"));
            this.select.emit(new DateRange(() => start.toDate(), () => end.toDate(), type));
        }
    }

    private validateDependences() {
        if (typeof daterangepicker == undefined) {
            throw new Error("Embedding DateRangePicker.js library is mandatory.");
        }

        if (typeof moment == undefined) {
            throw new Error("Embedding Moment.js library is mandatory.");
        }

        if ($ == undefined) {
            throw new Error("Embedding jQuery.js library is mandatory.");
        }
    }
}

export class DateRange {

    constructor(
        private readonly start: DateGenerator,
        private readonly end: DateGenerator,
        private readonly type: string,
    ) { }

    get startDate(): Date {
        return this.start();
    }

    get endDate(): Date {
        return this.end();
    }

    get rangeType(): string {
        return this.type;
    }
}

interface DateGenerator {
    (): Date;
}

class DateRanges {
    public static readonly Today: string = "Today";
    public static readonly Yesterday: string = "Yesterday";
    public static readonly Last7Days: string = "Last 7 Days";
    public static readonly Last30Days: string = "Last 30 Days";
    public static readonly ThisMonth: string = "This Month";
    public static readonly LastMonth: string = "Last Month";
}

const DateRangeGenerators = new Map<string, DateRange>();
DateRangeGenerators.set(DateRanges.Today, new DateRange(
    () => moment().startOf('day').toDate(),
    () => moment().endOf('day').toDate(),
    DateRanges.Today));

DateRangeGenerators.set(DateRanges.Yesterday, new DateRange(
    () => moment().subtract(1, 'days').startOf('day').toDate(),
    () => moment().subtract(1, 'days').endOf('day').toDate(),
    DateRanges.Yesterday));

DateRangeGenerators.set(DateRanges.Last7Days, new DateRange(
    () => moment().subtract(6, 'days').startOf('day').toDate(),
    () => moment().endOf('day').toDate(),
    DateRanges.Last7Days));

DateRangeGenerators.set(DateRanges.Last30Days, new DateRange(
    () => moment().subtract(29, 'days').startOf('day').toDate(),
    () => moment().endOf('day').toDate(),
    DateRanges.Last30Days));

DateRangeGenerators.set(DateRanges.ThisMonth, new DateRange(
    () => moment().startOf('month').toDate(),
    () => moment().endOf('month').toDate(),
    DateRanges.ThisMonth));

DateRangeGenerators.set(DateRanges.LastMonth, new DateRange(
    () => moment().subtract(1, 'month').startOf('month').toDate(),
    () => moment().subtract(1, 'month').endOf('month').toDate(),
    DateRanges.LastMonth));