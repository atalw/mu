import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class YoutubeAuthService {
	public isLoggedIn = false;
	private _isLoggedIn = new Subject<string>();
	isLoggedIn$ = this._isLoggedIn.asObservable();
	private options;
	private loadAuth;

	constructor(public router: Router) {
		if(localStorage.getItem('isLoggedIn') == 'true') {
			this.isLoggedIn = true;
		}
		this.options = {
			'client_id': '85957565874-ol40114mec08bm3lf3q9q3s9prv3pn0p.apps.googleusercontent.com',
			'scope': 'https://www.googleapis.com/auth/youtube',
			'immediate': true
		};
	}

	initAuth() {
		return this.loadAuth = new Promise((resolve) => {
			return gapi.auth.init(() => {
				return gapi.auth.authorize(this.options, (response) => {
					this.handleAuthResult(response);
					resolve();
				});
			});
		});
	}

	checkAuth() {
		gapi.auth.authorize(this.options, this.handleAuthResult);
	}

	verifyAuth(authResult) {

	}

	handleAuthResult(authResult) {
		if (authResult && !authResult.error) {
			console.log(authResult);
			localStorage.setItem('access_token', authResult.access_token);
			localStorage.setItem('isLoggedIn', 'true');
			this.isLoggedIn = true;
			this._isLoggedIn.next('true');
		}
		else {
			this.isLoggedIn = false;
			console.log('failed');
		}
	}

	logout() {
		localStorage.removeItem('access_token');
		localStorage.setItem('isLoggedIn', 'false');
		this.isLoggedIn = false;
		this.router.navigate(['login']);
	}
}