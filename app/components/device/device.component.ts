import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceRepository } from '../../services/device-repository';
import { Device } from '../../models/device';
import { Observable } from 'rxjs/Observable';
import { Point, ChartDirective } from '../../directives/chart.directive';

@Component({
  selector: 'dm-device',
  templateUrl: 'app/components/device/device.template.html',
  directives: [ChartDirective]
})
export class DeviceComponent {

  points:Point[] =[
    {x: new Date(2015, 1, 1), y: 20 },
    {x: new Date(2015, 2, 1), y: 21 },
    {x: new Date(2015, 3, 1), y: 24 },
    {x: new Date(2015, 4, 1), y: 17 },
    {x: new Date(2015, 5, 1), y: 29 }
  ]

  @Input() 
  device: Device;

  public onStateChanged(event) {
    console.log(event);
  }
}