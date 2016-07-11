import { Component, trigger, state, style, transition, animate, Input } from '@angular/core';

import { PlaylistService } from '../../../../../services/playlist.service';
import { YoutubePlayerService } from '../../../../../services/youtube-player.service';

@Component({
	moduleId: module.id,
	selector: 'mu-video-list',
	template: `
		<md-nav-list dense>
          <md-list-item class="" *ngFor="let item of items trackBy:customTrackBy" @state="item === selectedItem ? 'active' : 'inactive'">
            <p md-line [class.active]="item === selectedItem" (click)="selectedItem = item; selectVideo(item.snippet.resourceId.videoId)">{{item.snippet.title}}</p>
          </md-list-item>
        </md-nav-list>
	`,
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
	directives: []
})

export class VideoListComponent {

	private playlists;
	private items : Array<Object>;
	@Input() playlistId;

	constructor(public playlistService: PlaylistService, public youtubePlayerService: YoutubePlayerService) { }

	ngOnInit() {
		console.log(this.playlistId);
		this.playlistService.getPlaylistItems(this.playlistId).then(response => {
			this.items = response.items;
		});
	}
	selectVideo(id) {
		this.youtubePlayerService.loadVideoId(id);
	}
}