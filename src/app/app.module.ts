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

let appRoute = RouterModule.forRoot([
  { path: 'devices/:type', component: DeviceListComponent },
  { path: 'devices', component: DeviceListComponent }
]);

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
    LineChartDirective
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
    { provide: MessageBus, useValue: new MessageBusMockup() },
    { provide: LifecycleSupport, useExisting: MessageBus, multi: true },
    { provide: DeviceRepository, useValue: new DeviceRepositoryMockup() },
    { provide: MeasurementsRepository, useValue: new MeasurementsRepositoryMockup() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
