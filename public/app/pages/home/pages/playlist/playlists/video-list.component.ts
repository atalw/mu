import { Component, trigger, state, style, transition, animate, Input } from '@angular/core';

import { PlaylistService } from '../../../../../services/playlist.service';
import { YoutubePlayerService } from '../../../../../services/youtube-player.service';
import { RelatedVideosService } from '../../../../../services/related-videos.service';


@Component({
	moduleId: module.id,
	selector: 'mu-video-list',
	templateUrl: 'video-list.component.html',
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

	constructor(public playlistService: PlaylistService, public youtubePlayerService: YoutubePlayerService, public relatedVideosService: RelatedVideosService) { }

	ngOnInit() {
		// console.log(this.playlistId);
		this.playlistService.getPlaylistItems(this.playlistId).then(response => {
			this.items = response;
		});
		// this.items = this.playlistService.getPlaylistItems(this.playlistId);
	}
	selectVideo(id) {
		this.youtubePlayerService.loadVideoId(id);
		this.relatedVideosService.loadRelatedVideos(id);
	}
}