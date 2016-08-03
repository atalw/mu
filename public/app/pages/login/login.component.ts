import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeAuthService } from '../../services/youtube-auth.service';


@Component({
  selector: 'mu-login',
  templateUrl: 'app/pages/login/login.component.html',
  styleUrls: ['app/pages/login/css/main.css', 'app/pages/login/css/animate.css']
})
export class LoginComponent {

	@Output() isLoggedIn = new EventEmitter();

	constructor(public router: Router, public youtubeAuthService: YoutubeAuthService) {}

	login() {
		this.youtubeAuthService.initAuth().then(() => {
			this.isLoggedIn.emit(this.youtubeAuthService.isLoggedIn);
			if (this.youtubeAuthService.isLoggedIn) {
				this.router.navigate(['']);
			}
		});
	}
}