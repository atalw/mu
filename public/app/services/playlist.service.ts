import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { PlaylistItems } from './mock-playlists';
import { Playlist } from './playlist';

@Injectable()
export class PlaylistService {
	private playlists = {};
	private playlistWithData: Playlist[] = [];
	private accessToken = localStorage.getItem('access_token');

	// private profileUrl = '/app/profile';

	private playlistsUrl = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=50&mine=true&access_token=' + this.accessToken

	constructor(private http: Http) {}

	getPlaylists(currentTab) {
		return this.http.get(this.playlistsUrl).toPromise()
			.then(response => {
				this.playlists = response.json().items;
				return this.playlists;
			});
	}

	getPlaylistItems(playlist) {
		var playlistItemsUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&access_token=' + this.accessToken + "&playlistId=";

		playlistItemsUrl += playlist;

		return this.http.get(playlistItemsUrl).toPromise()
			.then(response => {
				return response.json();
			})
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}