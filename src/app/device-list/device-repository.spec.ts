/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeviceRepository } from './device-repository';

describe('DeviceRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceRepository]
    });
  });

  it('should ...', inject([DeviceRepository], (service: DeviceRepository) => {
    expect(service).toBeTruthy();
  }));
});
