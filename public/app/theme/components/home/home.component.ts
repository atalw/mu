import { Component } from '@angular/core';
import { PlaylistsComponent } from './playlists/playlists.component';
import { RightbarComponent } from './rightbar/rightbar.component';


@Component({
  selector: 'mu-home',
  templateUrl: 'app/theme/components/home/home.component.html',
  directives: [PlaylistsComponent, RightbarComponent]
})

export class HomeComponent {
		name: string;

	constructor() {
		this.name = "Akshit";
	}
}