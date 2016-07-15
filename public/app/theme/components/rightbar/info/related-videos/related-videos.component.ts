import { Component } from '@angular/core';

import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import { RelatedVideosService } from '../../../../../services/related-videos.service';
import { YoutubePlayerService } from '../../../../../services/youtube-player.service';

@Component({
	moduleId: module.id,
	selector: 'mu-related-videos',
	templateUrl: 'related-videos.component.html',
	directives: [MD_LIST_DIRECTIVES]
})

export class RelatedVideosComponent {

	private items;

	constructor(public relatedVideosService: RelatedVideosService, public youtubePlayerService: YoutubePlayerService) {
		relatedVideosService.data$.subscribe(response => {
			this.items = response.items;
		});
	}

	selectVideo(id) {
		this.youtubePlayerService.loadVideoId(id);
		this.relatedVideosService.loadRelatedVideos(id);
		this.youtubePlayerService.setupControlBar();

	}
}