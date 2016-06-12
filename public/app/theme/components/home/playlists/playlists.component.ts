import { Component } from '@angular/core';
import { PlaylistsService } from './playlists.service';
import { PlaylistService } from '../../../services/playlist.service';

@Component({
  selector: 'mu-playlists',
  templateUrl: 'app/theme/components/home/playlists/playlists.component.html',
  providers: [PlaylistService, PlaylistsService]
})

export class PlaylistsComponent {
	size = ['1', '2', '3', '4', '5', '6'];
	// item = {
	// 	song: "This",
	// 	artist: "is",
	// 	album: "asdf",
	// 	duration: "12"
	// };
	items = {};
	playlists = {};

	constructor(private playlistsService: PlaylistsService, private playlistService: PlaylistService) {	}

	getProfile() {
		this.playlistsService.getProfile();
	}
	getPlaylist() {
		return Object.keys(this.playlists);
	}

	ngOnInit() {
		this.items = this.playlistService.getPlaylistItems();
		this.playlists = this.playlistsService.getProfile();
		console.log(this.items);
	}
}