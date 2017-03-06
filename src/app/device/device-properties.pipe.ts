import { Pipe, PipeTransform } from '@angular/core';
import { DeviceDescriptor } from './models';

@Pipe({
    name: 'deviceProperties',
    pure: false
})
export class DevicePropertiesPipe implements PipeTransform {
    transform(device: DeviceDescriptor): Array<Entry> {

        let keyArray: string[] = Object.keys(device.properties);
        let dataArray = new Array<Entry>();
        dataArray.push({ key: "DeviceId", value: device.deviceId});

        keyArray.forEach((key: any) => {
            dataArray.push({ key: this.capitalizeFirstLetter(key), value: this.capitalizeFirstLetter(device.properties[key])});
        });

        return dataArray;
    }

    capitalizeFirstLetter(obj: any): string {
        let sentence = String(obj);
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    }
}

export class Entry {
    key: string;
    value: any;
}