import { Component, trigger, state, style, transition, animate, Input } from '@angular/core';

import { VideoListComponent } from './video-list.component';

import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

import { PlaylistService } from '../../../../../services/playlist.service';
import { YoutubePlayerService } from '../../../../../services/youtube-player.service';

@Component({
  moduleId: module.id,
  selector: 'mu-playlists',
  templateUrl: 'playlists.component.html',
  animations: [
	  trigger('state', [
		  state('inactive', style({
			  backgroundColor: '#fff',
			  // transform: 'scale(1)'
		  })),
		  state('active', style({
			  backgroundColor: '#4CAF50',
			  // transform: 'scale(1.1)'
		  })),
		  transition('inactive => active', animate('100ms ease-in')),
		  transition('active => inactive', animate('100ms ease-out'))
	  ])
  ],
  directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_ICON_DIRECTIVES, MD_LIST_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, VideoListComponent]
})

export class PlaylistsComponent {

	private playlists;
	@Input() currentTab;

	constructor(private playlistService: PlaylistService, private youtubePlayerService: YoutubePlayerService) {
	}

	ngOnInit() {
		this.playlistService.getPlaylists(this.currentTab).then(response => {
			console.log(response);
			this.playlists = response[this.currentTab].playlists;
		});
		console.log(this.currentTab);
	}
	customTrackBy(index: number, obj: any): any {
		return index;
	}

}