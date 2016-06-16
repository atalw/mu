import { Component,
		 trigger,
  		 state,
  		 style,
  	     transition,
  		 animate } from '@angular/core';

import { PlaylistService } from '../../../services/playlist.service';

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
  ]
})

export class PlaylistsComponent {

	playlists;

	constructor(private playlistService: PlaylistService) {}

	ngOnInit() {
		this.playlistService.getPlaylists().then(response => {
			console.log(response);
			this.playlists = response;
		});
	}
	customTrackBy(index: number, obj: any): any {
		return index;
	}
}