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
		var pageToken;
		var playlistId = "PLb41C1zNxKPo_1rskumIntw5reep2lWmz";
		var requestOptions = {
			playlistId: playlistId,
			part: 'snippet',
			maxResults: 50,
			
		};
		if (pageToken){
			// requestOptions.pageToken = pageToken;
		}
		// var request = gapi.client.youtube.playlistItems.list(requestOptions);
		return this.item = {
			song: "this is the title of the song",
			duration: "13:23"
		};
	}	

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}