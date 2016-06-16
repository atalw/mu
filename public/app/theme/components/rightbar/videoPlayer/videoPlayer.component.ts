import { Component } from '@angular/core';
import { PlayerService} from '../../../services/player'

@Component({
	moduleId: module.id,
	selector: 'mu-video-player',
	templateUrl: 'videoPlayer.component.html',
	providers: [PlayerService]
})

export class VideoPlayerComponent {
	public tag;
	public firstScriptTag;
	public player;

	constructor(private playerService: PlayerService) {}

	ngAfterViewInit() {
		// this.playerService.onYouTubeIframeAPIReady();
	}



}