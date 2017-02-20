import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

let appRoute = RouterModule.forRoot([

]);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRoute
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
