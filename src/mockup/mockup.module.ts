import { AppModule } from '../app/app.module';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app/app.component';
import { MeasurementsRepository } from '../app/sensor/measurements-repository';
import { MeasurementsRepositoryMockup } from './sensor/measurements-repository-mockup';
import { MessageBus } from '../app/shared/messaging/message-bus';
import { MessageBusMockup } from './shared/messaging/message-bus-mockup';
import { DeviceRepository } from '../app/device-list/device-repository';
import { DeviceRepositoryMockup } from './device-list/device-repository-mockup';

export function deviceRepositoryFactory(){
  return new DeviceRepositoryMockup();
}

export function measurementsRepositoryFactory(){
  return new MeasurementsRepositoryMockup();
}

export function messageBusFactory(){
  return new MessageBusMockup();
}

@NgModule({
  imports: [
    AppModule,
  ],
  providers: [
    { provide: DeviceRepository, useFactory: deviceRepositoryFactory },
    { provide: MeasurementsRepository, useFactory: measurementsRepositoryFactory },
    { provide: MessageBus, useFactory: messageBusFactory }
  ],
  bootstrap: [AppComponent]
})
export class MockupModule { }