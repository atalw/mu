import { Injectable } from '@angular/core';

@Injectable()
export class YoutubeAuthService {
	public isLoggedIn = false;
	private options;
	private loadAuth;

	constructor() {
		this.options = {
			'client_id': '85957565874-ol40114mec08bm3lf3q9q3s9prv3pn0p.apps.googleusercontent.com',
			'scope': 'https://www.googleapis.com/auth/youtube',
			'immediate': false
		};
	}

	initAuth() {
		return gapi.auth.init(() => {
			return gapi.auth.authorize(this.options, (response) => {
				this.handleAuthResult(response);
			});
		});
	}

	checkAuth() {
		gapi.auth.authorize(this.options, this.handleAuthResult);
	}

	handleAuthResult(authResult) {
			if (authResult && !authResult.error) {
				this.isLoggedIn = true;
				console.log(this.isLoggedIn);
			}
			else {
				this.isLoggedIn = false;
				console.log('failed');
			}

	}
}