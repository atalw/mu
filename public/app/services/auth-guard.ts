import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { YoutubeAuthService } from './youtube-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(public youtubeAuthService: YoutubeAuthService, public router: Router) {}

	canActivate() {
		if (this.youtubeAuthService.isLoggedIn) {
			return true;
		}

		this.router.navigate(['login']);
		return false;
	}
}
