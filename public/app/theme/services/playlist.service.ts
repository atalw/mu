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
	

	// getPlaylists() {
	// 	return this.http.get(this.profileUrl).toPromise()
	// 		.then(response => response.json().playlists)
	// 		.catch(this.handleError);		
	// }

	// getData() {
	// 	return this.http.get(this.profileUrl).toPromise()
	// 	.then(function(response) {
	// 		// console.log(response.json().playlists);
	// 		return response.json().playlists.reduce(function(sequence, playlistPromise) {
	// 			console.log(sequence);
	// 			return sequence.then(function() {
	// 				// console.log(playlistPromise.id);
	// 				return this.getPlaylistItems(playlistPromise.id);
	// 			}).then(function(playlistItems) {
	// 				console.log(playlistItems);
	// 			});
	// 		}, Promise.resolve());
	// 	}).catch(this.handleError);
	// }

	getPlaylists() {
		return this.http.get(this.profileUrl).toPromise()
			.then(response => this.getPlaylistData(response.json().playlists))
			.catch(this.handleError);		
	}

	getPlaylistData(playlists) {
		Promise.all(playlists.map(function(playlist) {
			console.log(playlist);
			this.getPlaylistItems()
				.then(response => {
					console.log(response);
					response["playlistDetails"] = playlist;
					this.playlistWithData.push(response);
				})
		})).then(function() {
			return Promise.resolve(this.playlistWithData)
			})
			.catch(this.handleError);
	}

	// replace with http api call after auth service complete
	getPlaylistItems(): Promise<Playlist> {
		return Promise.resolve(PlaylistItems);
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