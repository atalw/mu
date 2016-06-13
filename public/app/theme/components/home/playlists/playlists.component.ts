import { Component } from '@angular/core';
import { PlaylistsService } from './playlists.service';
import { PlaylistService } from '../../../services/playlist.service';

@Component({
  selector: 'mu-playlists',
  templateUrl: 'app/theme/components/home/playlists/playlists.component.html',
})

export class PlaylistsComponent {

	playlists;

	constructor(private playlistService: PlaylistService) {}

	ngOnInit() {
		// this.playlistService.getPlaylistItemsSlowly().then(items => this.items = items);
		// this.playlists = this.playlistsService.getProfile();
		this.playlistService.getPlaylists().then(response => {
			this.playlists = response;
			console.log(this.playlists);
		});
	}
}