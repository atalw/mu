import { Component } from '@angular/core';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';

@Component({
	moduleId: module.id,
	selector: 'mu-video-player',
	templateUrl: 'videoPlayer.component.html',
	directives: [MD_BUTTON_DIRECTIVES]
})

export class VideoPlayerComponent {
	public tag;
	public firstScriptTag;
	public player;

	constructor() {}

	ngAfterViewInit() {

	}
}