import { Injectable, EventEmitter } from '@angular/core';

import { PlaylistItems } from './mock-playlists';
import { Playlist } from './playlist';

@Injectable()
export class PlaylistService {
	private dataLoaded : boolean = false;
	// onLoaded = new EventEmitter(false);
	getPlaylistItems() {
		this.updateDataLoaded();
		// this.onLoaded.emit(true);
		return Promise.resolve(PlaylistItems);
	}

	getPlaylistItemsSlowly() {
		return new Promise<Playlist>(resolve =>
			setTimeout(() => resolve(PlaylistItems), 2000);
	}

	updateDataLoaded() {
		this.dataLoaded = !this.dataLoaded;
	}

	getDataLoaded() {
		return this.dataLoaded;
	}
}