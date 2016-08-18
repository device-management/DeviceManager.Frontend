import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
    selector: 'ef-app',
    templateUrl: 'app/components/app/app.template.html',
    directives: [...ROUTER_DIRECTIVES, MenuComponent]
})
export class AppComponent implements OnInit {
    ngOnInit() { 
        window.dispatchEvent(new Event("resize"));
    }
}