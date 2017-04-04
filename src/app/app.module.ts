import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { MeasurementsRepository } from './sensor/measurements-repository';
import { MeasurementsRepositoryMockup } from './sensor/measurements-repository-mockup';
import { LifecycleSupport } from './shared/lifecycle/lifecycle';
import { MessageBus } from './shared/messaging/message-bus';
import { MessageBusMockup } from './shared/messaging/message-bus-mockup';
import { DeviceRepository } from './device-list/device-repository';
import { DeviceRepositoryMockup } from './device-list/device-repository-mockup';
import { StatusComponent } from './device/status.component';
import { ToggleSwitchComponent } from './lighting/toggle-switch.component';
import { LightingComponent } from './lighting/lighting.component';
import { DevicePropertiesPipe } from './device/device-properties.pipe';
import { DateRangeDirective } from './sensor/date-range.directive';
import { SensorComponent } from './sensor/sensor.component';
import { LineChartDirective } from './sensor/line-chart.directive';
import { MotorComponent } from './motor/motor.component';
import { KnobDirective } from './motor/knob.directive';

const appRoute = RouterModule.forRoot([
  { path: 'devices/:type', component: DeviceListComponent },
  { path: 'devices', component: DeviceListComponent }
]);

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
  declarations: [
    AppComponent,
    MenuComponent,
    DeviceListComponent,
    LightingComponent,
    DevicePropertiesPipe,
    StatusComponent,
    ToggleSwitchComponent,
    DateRangeDirective,
    SensorComponent,
    LineChartDirective,
    KnobDirective,
    MotorComponent
  ],
  exports: [

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRoute
  ],
  providers: [
    { provide: LifecycleSupport, useExisting: MessageBus, multi: true },
    { provide: DeviceRepository, useFactory: deviceRepositoryFactory },
    { provide: MeasurementsRepository, useFactory: measurementsRepositoryFactory },
    { provide: MessageBus, useFactory: messageBusFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }