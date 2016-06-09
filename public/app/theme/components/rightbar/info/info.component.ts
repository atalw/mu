import { Component } from '@angular/core';
import { RelatedVideosComponent } from './related-videos/related-videos.component';
import { LyricsComponent } from './lyrics/lyrics.component';


@Component({
	selector: 'mu-info',
	templateUrl: 'app/theme/components/rightbar/info/info.component.html',
	directives: [RelatedVideosComponent, LyricsComponent]
})

export class InfoComponent {}