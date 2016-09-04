import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/location/location.component';

export const routes: RouterConfig = [
    { path: '',     component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'location/:id', component: LocationComponent }
];

export const APP_ROUTER_PROVIDER = provideRouter(routes);