import { Component } from '@angular/core';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';


@Component({
  selector: 'mu-playlists',
  templateUrl: 'app/theme/components/home/playlists/playlists.component.html',
  directives: [PaginationControlsCmp],
  pipes: [PaginatePipe],
  providers: [PaginationService]
})

export class PlaylistsComponent {
	size = ['1', '2', '3', '4', '5', '6'];
	item = {
		song: "This",
		artist: "is",
		album: "asdf",
		duration: "12"
	};
}