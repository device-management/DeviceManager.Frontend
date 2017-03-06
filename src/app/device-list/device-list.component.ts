import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceRepository } from './device-repository';
import { DeviceDescriptor, DeviceTypes } from '../device/models';

@Component({
    selector: 'dm-devices',
    templateUrl: './device-list.component.html'
})
export class DeviceListComponent implements OnInit {

    grid: Row[] = [];

    deviceBlockWidths: Map<string, number> = new Map();

    constructor(private deviceRepository: DeviceRepository, private route: ActivatedRoute) {
        this.deviceBlockWidths.set(DeviceTypes.Engine, 4);
        this.deviceBlockWidths.set(DeviceTypes.Lighting, 4);
        this.deviceBlockWidths.set(DeviceTypes.Temperature, 6);
    }

    ngOnInit() {
        this.route.params
            .switchMap(params => {
                let type = params['type'];
                if (type) {
                    return this.deviceRepository.filter({
                        filters: [{
                            exact: true,
                            key: "properties.type",
                            value: type
                        }]
                    });
                } else {
                    return this.deviceRepository.filter({ filters: [] });
                }
            })
            .map(result => this.generateGrid(result.devices))
            .subscribe(
                result => this.grid = result,
                error => console.log("Cannot retrieve devices from repository")
            );
    }

    generateGrid(devices: DeviceDescriptor[]): Row[] {
        let rows: Row[] = []
        devices.map<DeviceBlock>(device => ({ columnWidth: this.getBlockWidth(device.properties.type), device: device }))
            .forEach(block => {
                let row = rows.find(row => row.remainingWidth >= block.columnWidth);
                if (row) {
                    row.addBlock(block);
                } else {
                    let row = new Row();
                    row.addBlock(block);
                    rows.push(row);
                }
            });
        return rows;
    }

    getBlockWidth(type: string) {
        let gridCount = this.deviceBlockWidths.get(type);
        if (gridCount) {
            return gridCount;
        } else {
            return 6; // Default
        }
    }
}

class Row {

    private remaining: number = 12;
    private blocks: Array<DeviceBlock> = [];

    get remainingWidth(): number {
        return this.remaining;
    }

    get deviceBlocks(): Array<DeviceBlock> {
        return this.blocks;
    }

    addBlock(block: DeviceBlock) {
        this.remaining -= block.columnWidth;
        this.blocks.push(block);
    }
}

class DeviceBlock {
    columnWidth: number;
    device: DeviceDescriptor;
}