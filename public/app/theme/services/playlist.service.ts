import { Injectable, EventEmitter } from '@angular/core';

import { PlaylistItems } from './mock-playlists';

@Injectable()
export class PlaylistService {
	private dataLoaded : boolean = false;
	// onLoaded = new EventEmitter(false);
	getPlaylistItems() {
		this.updateDataLoaded();
		// this.onLoaded.emit(true);
		return PlaylistItems;
	}

	updateDataLoaded() {
		this.dataLoaded = !this.dataLoaded;
	}

	getDataLoaded() {
		return this.dataLoaded;
	}
}