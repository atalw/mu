import { Component, AfterViewInit } from '@angular/core';
import { PlaylistsComponent } from './playlists/playlists.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router }  from '@angular/router';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';

import { PlaylistService } from '../../services/playlist.service';
import { RightbarComponent } from '../../theme/components/rightbar/rightbar.component';

@Component({
  moduleId: module.id,
  selector: 'router-outlet',
  templateUrl: 'home.component.html',
  directives: [PlaylistsComponent, MD_TABS_DIRECTIVES],
  providers: [PlaylistService]
})

export class HomeComponent implements AfterViewInit{
	dataLoaded: boolean = true;

	constructor(
		private router: Router,
		private playlistService: PlaylistService) {}

	ngOnInit() {
		// document.getElementById('playlists-data').style.visibility = 'hidden';
	}

	ngAfterViewInit() {
		// document.getElementById('loader').remove();
		// document.getElementById('playlists-data').style.visibility = 'visible';

	}
}
