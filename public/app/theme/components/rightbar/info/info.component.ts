import { Component} from '@angular/core';
import { NgSwitch, NgSwitchWhen } from '@angular/common';
import { RelatedVideosComponent } from './related-videos/related-videos.component';
import { LyricsComponent } from './lyrics/lyrics.component';


@Component({
	moduleId: module.id,
	selector: 'mu-info',
	templateUrl: 'info.component.html',
	directives: [RelatedVideosComponent, LyricsComponent, NgSwitch, NgSwitchWhen]
})

export class InfoComponent {
	tab = 'related-videos';

	toggle() {
		this.tab = this.tab === 'related-videos' ? 'lyrics' : 'related-videos';
	}
}