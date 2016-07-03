import { Component } from '@angular/core';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import { YoutubePlayerService } from '../../../services/youtube-player.service';

@Component({
  moduleId: module.id,
  selector: 'mu-control-bar',
  templateUrl: 'controlbar.component.html',
  directives: [MdIcon],
  providers: [YoutubePlayerService, MdIconRegistry]
})

export class ControlbarComponent {

	private playerState;
	private playOrPauseIcon;
	private videoDuration;
	private elapsedTime;

	constructor(public youtubePlayerService : YoutubePlayerService) {
		this.playOrPauseIcon = "play_arrow";

	}

	ngOnInit() {
		this.elapsedTime = "00:00";
		this.videoDuration = "00:00"
		console.log(this.elapsedTime);
	}

	playOrPause() {
		this.playerState = this.youtubePlayerService.player.getPlayerState();
		if ( this.playerState == 1 || this.playerState == 3) {
			this.youtubePlayerService.pauseVideo();
			this.playOrPauseIcon = "play_arrow";
		}

		else {
			this.youtubePlayerService.playVideo();
			this.playOrPauseIcon = "pause";
		}
	}

	getVideoDuration() {
		var videoSeconds;
		this.youtubePlayerService.getVideoDuration().then(response => {
			videoSeconds = response;
		})
		var minutes = Math.floor(videoSeconds / 60);
		var seconds = videoSeconds % 60;
		this.videoDuration = minutes + ":" + seconds;
		console.log(this.videoDuration);
	}

}