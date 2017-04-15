import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DeviceDescriptor } from '../device/models';
import { environment } from '../../environments/environment';

export class FilterDescriptor {
    filters: Array<FilterItem>;
    logic?: FilteringLogic;
    limit?: number;
    offset?: number;
}

export class FilterItem {
    key: string;
    value: string;
    exact: boolean;
}

export class FilterResult {
    devices: Array<DeviceDescriptor>;
    total: number;
}
 
export enum FilteringLogic {
    All,
    Any
}

export interface IDeviceRepository {
  filter(filter: FilterDescriptor): Observable<FilterResult>;
}

@Injectable()
export class DeviceRepository implements IDeviceRepository {
  private readonly devicesUrl = environment.backendAddress + '/api/devices/find';
  private readonly requestOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });

  constructor(private http: Http) { }

  filter(filter: FilterDescriptor): Observable<FilterResult> {

    return this.http.post(this.devicesUrl, filter, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
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
