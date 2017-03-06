import { Component } from '@angular/core';

@Component({
    selector: 'dm-menu',
    templateUrl: 'menu.template.html'
})
export class MenuComponent {
    deviceTypes: string[];
    constructor(){
        this.deviceTypes = ["temperature", "brightness", "engine"];
    }
}