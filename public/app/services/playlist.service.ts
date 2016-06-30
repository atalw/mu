import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { PlaylistItems } from './mock-playlists';
import { Playlist } from './playlist';

@Injectable()
export class PlaylistService {
	private playlists = {};
	private playlistWithData: Playlist[] = [];

	private profileUrl = '/app/profile';

	constructor(private http: Http) {}

	getPlaylists(tabIndex) {
		return this.http.get(this.profileUrl).toPromise()
			.then(response => {
				return this.getPlaylistData(response.json().playlists).then(response => {
					return response;
				});
			})
			.catch(this.handleError);
	}

	queue = Promise.resolve();
	getPlaylistData(playlists) {
		playlists.reduce((sequence, playlist) => {
			this.queue = this.queue.then(() => {
				this.getPlaylistItems(playlist).then(response => {
					this.playlistWithData.push(response);
				});
			})
		});

		return this.queue.then(() => {
			return Promise.resolve(this.playlistWithData);
		})
	}

	// replace with http api call after auth service complete
	getPlaylistItems(playlist) : Promise<Playlist> {

		playlist.data = PlaylistItems;
		return Promise.resolve(playlist);
		// return PlaylistItems;
	}

	// testing only
	getPlaylistItemsSlowly(playlistId: string) {
		return new Promise<Playlist>(resolve => setTimeout(()=> resolve(PlaylistItems), 2000));

	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}