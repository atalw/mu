import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class YoutubePlayerService {

	public player;
	public elapsedTime = new Subject<string>();
	elapsedTime$ = this.elapsedTime.asObservable();
	// private isPlayerReady: boolean = false;
	private getElapsedTimeInterval;
	loadIframeAPI: Promise<any>;

	constructor() {
		this.initPlayer();
		// this.mutePlayer();
	}

	initPlayer() {
		this.loadIframeAPI = new Promise((resolve) => {
			window['onYouTubeIframeAPIReady'] = (ev) => {
				this.player = new YT.Player('player', {
					events: {
						'onReady': this.onPlayerReady,
					}
				});
				console.log('player loaded')
				resolve(this.player);
			}
			this.loadScript();
		});
	}

	loadScript() {
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	onPlayerReady(event) {
		// this.isPlayerReady = true;
	}

	playVideo() {
		this.player.playVideo();
		this.setupControlBar();
	}

	pauseVideo() {
		this.player.pauseVideo();
		clearInterval(this.getElapsedTimeInterval);
	}

	getVideoDuration() {
		// return this.loadIframeAPI.then(()=> {
		// 	this.elapsedTime.next(this.player.getDuration());
		// });
		// this.elapsedTime.next(this.player.getDuration());
		return this.player.getDuration();
	}
	getElapsedTime() {
		return this.player.getCurrentTime();

	}
	loadVideoId(id: string) {
		return this.loadIframeAPI.then(() => {
			return this.player.loadVideoById(id);
		});
	}
	getPercentage() {
		return (this.player.getCurrentTime()/ this.player.getDuration()  * 100) + '%';
	}
	setupControlBar() {
		this.getElapsedTimeInterval = setInterval(()=>this.elapsedTime.next(this.getPercentage()), 300);
		// this.getVideoDuration()
	}
}