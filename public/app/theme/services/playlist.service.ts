import { Injectable } from '@angular/core';

import { PlaylistItems } from './mock-playlists';

@Injectable()
export class PlaylistService {
	getPlaylistItems() {
		return PlaylistItems;
	}
}