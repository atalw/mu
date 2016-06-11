import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { ControlbarComponent } from './theme/components/controlbar/controlbar.component';


bootstrap(AppComponent, [HTTP_PROVIDERS]);
bootstrap(ControlbarComponent);
