import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { QueryResult } from './query-result';
import { QueryDescriptor } from './query-descriptor';
import { MeasurementsRepositorySettings } from './measurements-repository-settings';

export interface IMeasurementsRepository {
    getMeasurements(query: QueryDescriptor): Observable<QueryResult>;
}

@Injectable()
export class MeasurementsRepository implements IMeasurementsRepository {
    private readonly devicesUrl = '/api/devices/find';

    constructor(private settings: MeasurementsRepositorySettings, private http: Http) { }

    getMeasurements(query: QueryDescriptor): Observable<QueryResult> {
        let uri = `${this.settings.uri}/api/${query.deviceId}/measurements${this.buildQuery(query)}`;
        return this.http.get(uri)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private buildQuery(query : QueryDescriptor) : string {
        let uriQueries: Array<string> = new Array();
        if(query.dateTo){
            uriQueries.push(`dateTo=${query.dateTo.toISOString()}`);
        }

        if(query.dateFrom){
            uriQueries.push(`dateFrom=${query.dateFrom.toISOString()}`);
        }

        return uriQueries.length > 0 ? `?${uriQueries.join("&")}` : "";
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
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