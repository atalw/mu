import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RightbarComponent } from './theme/components/rightbar/rightbar.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowseComponent } from './pages/home/pages/browse/browse.component';
import { RedditComponent } from './pages/home/pages/reddit/reddit.component';

import { AuthGuard } from './services/auth-guard';
import { YoutubeAuthService } from './services/youtube-auth.service';

import { PlaylistDataComponent } from './pages/home/pages/playlist/playlist-data.component';

export const routes: RouterConfig = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
			{ path: '', component: PlaylistDataComponent },
			{ path: 'browse', component: BrowseComponent },
			{ path: 'browse/:id', component: PlaylistDataComponent },
			{ path: 'reddit', component: RedditComponent }
		]
	},
	{ path: 'login', component: LoginComponent },

];

// export const APP_ROUTER_PROVIDERS = [
// 	provideRouter(routes),
// 	YoutubeAuthService,
// 	AuthGuard
// ];