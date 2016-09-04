import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './components/app/app.component';
import { FormsModule } from '@angular/forms';
import { APP_ROUTER_PROVIDER } from './app.routing';
import { HTTP_PROVIDERS } from '@angular/http';

@NgModule({
    providers:    [ ...APP_ROUTER_PROVIDER, ...HTTP_PROVIDERS ],
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }