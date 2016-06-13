import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './theme/components/home/home.component';
import { RightbarComponent } from './theme/components/rightbar/rightbar.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';

const routes: RouterConfig = [
	{ path: '/', component: HomeComponent, index: true },
	{ path: '/login', component: LoginComponent },
	{ path: '/browse', component: BrowseComponent }
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];