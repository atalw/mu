import { Component} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { RelatedVideosComponent } from './related-videos/related-videos.component';
import { LyricsComponent } from './lyrics/lyrics.component';


@Component({
	moduleId: module.id,
	selector: 'mu-info',
	templateUrl: 'info.component.html',
	directives: [RelatedVideosComponent, LyricsComponent, CORE_DIRECTIVES]
})

export class InfoComponent {
	tab = 'related-videos';

	toggle() {
		this.tab = this.tab == 'related-videos' ? 'lyrics' : 'related-videos';
	}
}