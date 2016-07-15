import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class PlaylistService {
	private playlists = {};
	private items = [];
	private accessToken = localStorage.getItem('access_token');

	private playlistsUrl = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=50&mine=true&access_token=' + this.accessToken

	constructor(private http: Http) {

	}

	getPlaylists(currentTab) {
		if(localStorage.getItem('tabs')) {
			return Promise.resolve(JSON.parse(localStorage.getItem('tabs')));
		}
		else {
			return this.http.get(this.playlistsUrl).toPromise()
				.then(response => {
					this.playlists = response.json().items;
					// localStorage.setItem('tabs', JSON.stringify(response.json().items));
					var tabs = this.randomizePlaylistTabs(this.playlists);
					localStorage.setItem('tabs', JSON.stringify(tabs));
					return this.playlists;
				});
		}

	}

	randomizePlaylistTabs(playlists) {
		let tabs = [
			{
				label: 'tab0'
			},
			{
				label: 'tab1'
			}
		];
		var playlists1 = [];
		var playlists2 = [];
		for (var playlist = 0; playlist < playlists.length; playlist++) {
			if ( playlist%2 == 0) {
				playlists1.push(playlists[playlist]);
			}
			else {
				playlists2.push(playlists[playlist]);
			}
		}
		tabs[0]['playlists'] = playlists1;
		tabs[1]['playlists'] = playlists2;

		return tabs;
	}

	getPlaylistItems(playlist) {
		var playlistItemsUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&access_token=' + this.accessToken + "&playlistId=";

		playlistItemsUrl += playlist;
		this.items = []// empty items array
		// console.log(this.items);
		return this.getItems(playlistItemsUrl).then(response => {
			// console.log(response);
			// console.log(response);
			return response;
		});
	}

	getItems(url, nextPageToken?) {
		var options = {};
		if (nextPageToken)
			options.pageToken = nextPageToken;
		else
			options = {};
		// console.log(url);
		// console.log(options);
		var items = [];
		return this.http.get(url, options).toPromise()
			.then(response => {
				items.push.apply(items, response.json().items);
				if (response.json().nextPageToken) {
					// return this.getItems(url, response.json().nextPageToken);
				}
				return items;
			});
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}