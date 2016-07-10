import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RightbarComponent } from './theme/components/rightbar/rightbar.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { RedditComponent } from './pages/reddit/reddit.component';

import { AuthGuard } from './services/auth-guard';
import { YoutubeAuthService } from './services/youtube-auth.service';

const routes: RouterConfig = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard]},
	{ path: 'login', component: LoginComponent },
	{ path: 'browse', component: BrowseComponent },
	{ path: 'reddit', component: RedditComponent }
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes),
	YoutubeAuthService,
	AuthGuard
];