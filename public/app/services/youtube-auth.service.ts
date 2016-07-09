import { Injectable } from '@angular/core';

@Injectable()
export class YoutubeAuthService {
	public loggedIn;
	private options;
	private loadAuth;

	constructor() {
		this.loggedIn = false;
		this.options = {
			'client_id': '85957565874-ol40114mec08bm3lf3q9q3s9prv3pn0p.apps.googleusercontent.com',
			'scope': 'https://www.googleapis.com/auth/youtube',
			'immediate': false
		};
		this.initAuth();
	}

	initAuth() {
			window['googleApiClientReady'] = (ev) => {
				gapi.auth.init(function() {
					// console.log('here');
					// window.setTimeout(this.checkAuth, 1);
					console.log(this);
					gapi.auth.authorize({
						'client_id': '85957565874-ol40114mec08bm3lf3q9q3s9prv3pn0p.apps.googleusercontent.com',
						'scope': 'https://www.googleapis.com/auth/youtube',
						'immediate': false
					}, function(authResult) {
						console.log(authResult);
					});
				});
			}

	}

	checkAuth() {
		gapi.auth.authorize(this.options, this.handleAuthResult);
	}

	handleAuthResult(authResult) {
		if (authResult && !authResult.error) {
			this.loggedIn = true;
		}
		else {
			this.loggedIn = false;
			console.log('failed');
		}
	}
}