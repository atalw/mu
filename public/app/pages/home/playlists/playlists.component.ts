import { Component,
		 trigger,
  		 state,
  		 style,
  	     transition,
  		 animate,
  		 Input } from '@angular/core';

import { PlaylistService } from '../../../services/playlist.service';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';

@Component({
  moduleId: module.id,
  selector: 'mu-playlists',
  templateUrl: 'playlists.component.html',
  animations: [
	  trigger('state', [
		  state('inactive', style({
			  // backgroundColor: '#eee',
			  transform: 'scale(1)'
		  })),
		  state('active', style({
			  // backgroundColor: '#cfd8dc',
			  transform: 'scale(1.1)'
		  })),
		  transition('inactive => active', animate('100ms ease-in')),
		  transition('active => inactive', animate('100ms ease-out'))
	  ])
  ],
  directives: [MD_LIST_DIRECTIVES, MD_BUTTON_DIRECTIVES]
})

export class PlaylistsComponent {

	playlists;
	@Input() currentTab;

	constructor(private playlistService: PlaylistService) {}

	ngOnInit() {
		this.playlistService.getPlaylists(this.currentTab).then(response => {
			console.log(response);
			this.playlists = response;
		});
		console.log(this.currentTab);
	}
	customTrackBy(index: number, obj: any): any {
		return index;
	}
}