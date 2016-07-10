import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeAuthService } from '../../services/youtube-auth.service';


@Component({
  selector: 'mu-login',
  templateUrl: 'app/pages/login/login.component.html',
})
export class LoginComponent {

	constructor(public router: Router, public youtubeAuthService: YoutubeAuthService) {}

	login() {
		this.youtubeAuthService.initAuth().then(() => {
			if (this.youtubeAuthService.isLoggedIn) {
				this.router.navigate(['']);
			}
		});
	}
}