import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { PlaylistItems } from './mock-playlists';
import { Playlist } from './playlist';

@Injectable()
export class PlaylistService {
	private dataLoaded : boolean = false;
	// onLoaded = new EventEmitter(false);
	private playlists = {};
	private playlistWithData: Playlist[] = [];

	private profileUrl = '/app/profile';

	constructor(private http: Http) {}

	getPlaylists() {
		return this.http.get(this.profileUrl).toPromise()
			.then(response => this.getPlaylistData(response.json().playlists))
			.catch(this.handleError);		
	}

	getPlaylistData(playlists) : Promise<Playlist[]> {
		for (var playlist in playlists) {
			this.getPlaylistItemsSlowly(playlists[playlist].id)
				.then(response => {
					this.playlistWithData.push(response);
				})
				.catch(this.handleError);
		}
		return Promise.resolve(this.playlistWithData);
	}

	getPlaylistItems(playlistId: string): Promise<Playlist> {
		// this.onLoaded.emit(true);
		return Promise.resolve(PlaylistItems);
	}

	getPlaylistItemsSlowly(playlistId: string) {
		return new Promise<Playlist>(resolve =>
			setTimeout(() => resolve(PlaylistItems), 2000));

	}

	updateDataLoaded() {
		this.dataLoaded = !this.dataLoaded;
	}

	getDataLoaded() {
		return this.dataLoaded;
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}