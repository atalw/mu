import { Component } from '@angular/core';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { YoutubePlayerService } from '../../../services/youtube-player.service';
import { ConvertSecondsPipe } from './convert-seconds.pipe';

@Component({
  moduleId: module.id,
  selector: 'mu-control-bar',
  templateUrl: 'controlbar.component.html',
  directives: [MD_ICON_DIRECTIVES],
  pipes: [ConvertSecondsPipe],
  providers: []
})

export class ControlbarComponent {

	private playerState;
	private playerStateIcon = 'play_arrow';
	private playOrPauseIcon;
	private totalTime;
	private elapsedTime;
	private percentage;
	private shuffle;

	constructor(public youtubePlayerService : YoutubePlayerService) {
		this.playOrPauseIcon = "play_arrow";
		this.shuffle = false

		youtubePlayerService.percentage$.subscribe(response => {
			this.percentage = response;
		})

		youtubePlayerService.elapsedTime$.subscribe(response => {
			this.elapsedTime = response;
		})

		youtubePlayerService.totaltime.subscribe(response => {
			this.totalTime = response;
		})

		youtubePlayerService.playerState$.subscribe(response => {
			this.playerStateIcon = response;
		})
	}

	ngOnInit() {
		this.elapsedTime = 0;
		this.totalTime = 0;
		this.percentage = '0%';
	}

	ngAfterViewInit() {
	}

	playOrPause() {
		this.playerState = this.youtubePlayerService.player.getPlayerState();
		if ( this.playerState == 1 || this.playerState == 3) {
			this.youtubePlayerService.pauseVideo();
			// this.playOrPauseIcon = this.playerState;
		}

		else {
			this.youtubePlayerService.playVideo();
			// this.playOrPauseIcon = this.playerState;
		}
	}

	prev() {
		this.youtubePlayerService.player.previousVideo();
	}

	next() {
		this.youtubePlayerService.player.nextVideo();
	}

	videoSeek(event) {
		var seekTo = this.youtubePlayerService.player.getDuration() * (event.offsetX / event.target.offsetWidth);
		this.youtubePlayerService.player.seekTo(seekTo, false);
	}

	shufflePlaylist() {
		this.shuffle = !this.shuffle;
		this.youtubePlayerService.player.setShuffle(this.shuffle);
	}

}