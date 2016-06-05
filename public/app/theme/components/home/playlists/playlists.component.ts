import { Component } from '@angular/core';

@Component({
  selector: 'mu-playlists',
  templateUrl: 'app/theme/components/home/playlists/playlists.component.html',
})

export class PlaylistsComponent {
	size = ['1', '2', '3', '4'];

	item = {
		song: "This",
		artist: "is",
		album: "asdf",
		duration: "12"
	};
}