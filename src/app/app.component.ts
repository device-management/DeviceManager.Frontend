import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dm-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    ngOnInit() { 
        window.dispatchEvent(new Event("resize"));
    }
}
