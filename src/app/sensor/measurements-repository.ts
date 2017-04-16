import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export class Point {
    value : number;
    timestamp? : Date;
}

export class QueryDescriptor {
    name : string;
    dateFrom? : Date;
    dateTo? : Date;
    order?: OrderType;
    limit?: number;
}

export enum OrderType {
    Ascending,
    Descending
}

export class QueryResult {
    name : string;
    points : Array<Point>;
}

export interface IMeasurementsRepository {
    getMeasurements(queries: Array<QueryDescriptor>): Observable<Array<QueryResult>>;
}

@Injectable()
export class MeasurementsRepository implements IMeasurementsRepository {
    private readonly measurementsUrl = environment.backendAddress + '/api/measurements/query';
    private readonly requestOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });

    constructor(private http: Http) { }

    getMeasurements(queries: Array<QueryDescriptor>): Observable<Array<QueryResult>> {
        
        return this.http.post(this.measurementsUrl, queries, this.requestOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) : Array<QueryResult> {
        let body = res.json();
        let data : Array<QueryResult> = body || {};
        data.forEach((entry) => {
            entry.points.forEach((point) => {
                point.timestamp = new Date(point.timestamp);
            });
        });
        return data;
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}