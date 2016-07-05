import { Component} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { RelatedVideosComponent } from './related-videos/related-videos.component';
import { LyricsComponent } from './lyrics/lyrics.component';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';

@Component({
	moduleId: module.id,
	selector: 'mu-info',
	templateUrl: 'info.component.html',
	directives: [RelatedVideosComponent, LyricsComponent, MD_TABS_DIRECTIVES]
})

export class InfoComponent {
	tab = 'related-videos';

	private tabs = [
		{
			label: 'Related Videos'
		},
		{
			label: 'Lyrics'
		}
	]

	toggle() {
		this.tab = this.tab == 'related-videos' ? 'lyrics' : 'related-videos';
	}
}