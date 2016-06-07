import { Component } from '@angular/core';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';
import { PlaylistsService } from './playlists.service';


@Component({
  selector: 'mu-playlists',
  templateUrl: 'app/theme/components/home/playlists/playlists.component.html',
  directives: [PaginationControlsCmp],
  pipes: [PaginatePipe],
  providers: [PaginationService, PlaylistsService]
})

export class PlaylistsComponent {
	size = ['1', '2', '3', '4', '5', '6'];
	// item = {
	// 	song: "This",
	// 	artist: "is",
	// 	album: "asdf",
	// 	duration: "12"
	// };
	item = {};
	playlists = {};

	constructor(private playlistsService: PlaylistsService) {	}

	getProfile() {
		this.playlistsService.getProfile();
	}
	getPlaylist() {
		return Object.keys(this.playlists);
	}

	ngOnInit() {
		this.item = this.playlistsService.printPlaylist();
		this.playlists = this.playlistsService.getProfile();
		console.log(this.playlists);
	}
}