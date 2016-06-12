import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './theme/components/home/home.component';
import { RightbarComponent } from './theme/components/rightbar/rightbar.component';


const routes: RouterConfig = [
	{ path: '/', component: HomeComponent, index: true}
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];