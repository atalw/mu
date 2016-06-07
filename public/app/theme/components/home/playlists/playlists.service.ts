import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PlaylistsComponent } from './playlists.component';

@Injectable()
export class PlaylistsService {

	private profileUrl = '/app/profile';
	private item = {};

	constructor(private http: Http) { }

	getProfile() : Promise<PlaylistsComponent[]> {
		return this.http.get(this.profileUrl).toPromise()
			.then(response => response.json().playlists)
			.catch(this.handleError);
	}

	printPlaylist() : Object {
		return this.item = {
			song: "this",
			artist: "is",
			album: "asdf",
			duration: "13"
		};
	}	

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}