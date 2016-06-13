import { Component, AfterViewInit } from '@angular/core';
import { PlaylistsComponent } from './playlists/playlists.component';
import { TabsComponent } from './tabs/tabs.component';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router, ActivatedRoute }  from '@angular/router';

import { PlaylistService } from '../../../theme/services/playlist.service';
import { RightbarComponent } from '../rightbar/rightbar.component';

@Component({
  templateUrl: 'app/theme/components/home/home.component.html',
  directives: [PlaylistsComponent],
  providers: [PlaylistService]
})

export class HomeComponent implements AfterViewInit{
	dataLoaded: boolean = true;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private playlistService: PlaylistService) {}

	ngOnInit() {
		// document.getElementById('playlists-data').style.visibility = 'hidden';
	}

	ngAfterViewInit() {
		// document.getElementById('loader').remove();
		// document.getElementById('playlists-data').style.visibility = 'visible';

	}
}
