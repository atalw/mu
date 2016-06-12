import { Component } from '@angular/core';
import { PlaylistsComponent } from './playlists/playlists.component';
import { TabsComponent } from './tabs/tabs.component';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router, ActivatedRoute }  from '@angular/router';


@Component({
  templateUrl: 'app/theme/components/home/home.component.html',
  directives: [PlaylistsComponent]
})

export class HomeComponent {
	dataLoaded = true;
	constructor(
		private router: Router,
		private route: ActivatedRoute) { }
}