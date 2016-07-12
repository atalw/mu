import { Component } from '@angular/core';

import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import { RelatedVideosService } from '../../../../../services/related-videos.service';

@Component({
	moduleId: module.id,
	selector: 'mu-related-videos',
	templateUrl: 'related-videos.component.html',
	directives: [MD_LIST_DIRECTIVES]
})

export class RelatedVideosComponent {

	private items;

	constructor(public relatedVideosService: RelatedVideosService) {
		relatedVideosService.data$.subscribe(response => {
			console.log(response.items);
			this.items = response.items;
		});
	}
}