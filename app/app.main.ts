import { AppComponent } from './components/app/app.component'
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { APP_ROUTER_PROVIDER } from './app.routing';
import { HTTP_PROVIDERS } from '@angular/http';
bootstrap(AppComponent, [...APP_ROUTER_PROVIDER, ...HTTP_PROVIDERS]);