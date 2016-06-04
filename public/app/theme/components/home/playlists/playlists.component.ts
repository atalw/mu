import { Component } from '@angular/core';

@Component({
  selector: 'mu-playlists',
  templateUrl: 'app/theme/components/home/playlists/playlists.component.html',
})

export class PlaylistsComponent {
	item = {
		song: "This",
		artist: "is",
		album: "asdf",
		duration: "12"
	};
}