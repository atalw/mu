import { Component } from '@angular/core';
import { PlaylistsService } from './playlists.service';
import { PlaylistService } from '../../../services/playlist.service';

@Component({
  selector: 'mu-playlists',
  templateUrl: 'app/theme/components/home/playlists/playlists.component.html',
  providers: [PlaylistsService]
})

export class PlaylistsComponent {

	items = {};
	playlists = {};

	constructor(private playlistsService: PlaylistsService, private playlistService: PlaylistService) {	
		this.items = this.playlistService.getPlaylistItems();
		this.playlists = this.playlistsService.getProfile();
	}
}