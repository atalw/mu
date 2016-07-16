import { Component, trigger, state, style, transition, animate, Input } from '@angular/core';

import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

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
	directives: [MD_ICON_DIRECTIVES, MD_LIST_DIRECTIVES]
})

export class VideoListComponent {

	private playlists;
	private items : Array<Object>;
	@Input() playlistId;

	constructor(public playlistService: PlaylistService, public youtubePlayerService: YoutubePlayerService, public relatedVideosService: RelatedVideosService) { }

	ngOnInit() {
		this.playlistService.getPlaylistItems(this.playlistId).then(response => {
			this.items = response;
		});
		// this.items = this.playlistService.getPlaylistItems(this.playlistId);
	}
	selectVideo(playlistId, videoId, index) {
		this.youtubePlayerService.loadPlaylist(playlistId, index);
		this.relatedVideosService.loadRelatedVideos(videoId);
		this.youtubePlayerService.setupControlBar();
	}

	queueVideo(id) {
		console.log(id);
	}
}