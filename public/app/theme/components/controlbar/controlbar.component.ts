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
	private percentage;

	constructor(public youtubePlayerService : YoutubePlayerService) {
		this.playOrPauseIcon = "play_arrow";
		// this.percentage = '60%';
	}

	ngOnInit() {
		this.elapsedTime = "00:00";
		this.videoDuration = "00:00";
		this.percentage = '0';
		console.log(this.elapsedTime);
	}

	ngAfterViewInit() {
	}

	playOrPause() {
		this.playerState = this.youtubePlayerService.player.getPlayerState();
		if ( this.playerState == 1 || this.playerState == 3) {
			this.youtubePlayerService.pauseVideo();
			this.playOrPauseIcon = "play_arrow";
		}

		else {
			this.youtubePlayerService.playVideo();
			this.getPercentage();
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

	getPercentage() {
		this.percentage = (this.youtubePlayerService.player.getCurrentTime() * 100 / this.youtubePlayerService.player.getDuration()) + '%';
		return this.percentage;
	}

	videoSeek(event) {
		console.log(event);
		var seekTo = this.youtubePlayerService.player.getDuration() * (event.offsetX / document.getElementById('seekBar').offsetWidth);
		this.youtubePlayerService.player.seekTo(seekTo, false);
	}

}