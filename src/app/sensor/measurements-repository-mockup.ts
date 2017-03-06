import { IMeasurementsRepository, QueryDescriptor, QueryResult, Point } from './measurements-repository';
import { Observable, ReplaySubject } from 'rxjs';

export class MeasurementsRepositoryMockup implements IMeasurementsRepository {

    constructor() {
    }

    getMeasurements(queries: Array<QueryDescriptor>): Observable<Array<QueryResult>> {
        let resultSubject = new ReplaySubject<Array<QueryResult>>(1);
        let results: Array<QueryResult> = queries.map<QueryResult>(query => this.generateQueryResult(query, Math.ceil(Math.random() * 20)));
        resultSubject.next(results);
        resultSubject.complete();
        return resultSubject;
    }

    private generateRandomNumber(): number {
        return Math.random() * 10;
    }

    private generateQueryResult(query: QueryDescriptor, defaultLimit: number) {
        let amount = query.limit ? query.limit : defaultLimit;
        let dates: Array<Date> = this.generateDates(amount, query.dateFrom, query.dateTo);
        let points = dates.map<Point>(date => { return { timestamp: date, value: this.generateRandomNumber() } })
        return {
            name: query.deviceId,
            points: points
        }
    }

    private generateDates(amount: number, from?: Date, to?: Date): Array<Date> {
        let dates: Array<Date> = [];
        if (!from && !to) {
            from = new Date();
            to = new Date();
            from.setHours(from.getHours() - 10);
        }
        else if (!from) {
            from = new Date(to);
            from.setHours(from.getHours() - 8);
        }
        else if (!to) {
            to = new Date();
        }

        let difference = to.getTime() - from.getTime()
        let offset = difference / amount;
        for (let i = 0; i < amount; i++) {
            dates.push(new Date(from.getTime() + offset * i))
        }
        return dates;
    }
}

interface QueryGeneratorCallback {
    (query: QueryDescriptor): QueryResult;
}