import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { MeasurementsRepository } from './sensor/measurements-repository';
import { LifecycleSupport } from './shared/lifecycle/lifecycle';
import { MessageBus } from './shared/messaging/message-bus';
import { DeviceRepository } from './device-list/device-repository';
import { StatusComponent } from './device/status.component';
import { ToggleSwitchComponent } from './power-switch/toggle-switch.component';
import { PowerSwitchComponent } from './power-switch/power-switch.component';
import { DevicePropertiesPipe } from './device/device-properties.pipe';
import { DateRangeDirective } from './sensor/date-range.directive';
import { SensorComponent } from './sensor/sensor.component';
import { LineChartDirective } from './sensor/line-chart.directive';
import { MotorComponent } from './motor/motor.component';
import { KnobDirective } from './motor/knob.directive';
import { CapitalizePipe } from './menu/capitalize.pipe'

const appRoute = RouterModule.forRoot([
  { path: 'devices/:type', component: DeviceListComponent },
  { path: 'devices', component: DeviceListComponent }
]);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DeviceListComponent,
    PowerSwitchComponent,
    DevicePropertiesPipe,
    StatusComponent,
    ToggleSwitchComponent,
    DateRangeDirective,
    SensorComponent,
    LineChartDirective,
    KnobDirective,
    MotorComponent,
    CapitalizePipe
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
    DeviceRepository,
    MeasurementsRepository,
    MessageBus,
    { provide: LifecycleSupport, useExisting: MessageBus, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }