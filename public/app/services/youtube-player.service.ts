import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class YoutubePlayerService {

	public player;
	public percentage = new Subject<string>();
	public elapsedTime = new Subject<string>();
	public totaltime = new Subject<string>();

	percentage$ = this.percentage.asObservable();
	elapsedTime$ = this.elapsedTime.asObservable();
	totalTime$ = this.totaltime.asObservable();

	private getPercentageInterval;
	private getElapsedtimeInterval

	loadIframeAPI: Promise<any>;

	constructor() {
		this.initPlayer();
		this.percentage.next('0');
		this.elapsedTime.next('00:00');
	}

	initPlayer() {
		this.loadIframeAPI = new Promise((resolve) => {
			window['onYouTubeIframeAPIReady'] = (ev) => {
				this.player = new YT.Player('player', {
					events: {
						'onReady': this.onPlayerReady,
						'onStateChange': this.onStateChange,
						'onError': this.onError
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

	onStateChange = (event) => {

		if (event.data == 2) { // paused
			// this.pauseControlBar();
		}
		if (event.data == 1) { // playing
			this.totaltime.next(this.player.getDuration());
		}
	}

	onError = () => {
		console.log('onError invoked');
	}

	playVideo() {
		this.player.playVideo();
		this.setupControlBar();
	}

	pauseVideo() {
		this.player.pauseVideo();
		this.pauseControlBar();
	}

	getVideoDuration() {
		return this.player.getDuration();
	}
	getElapsedTime() {
		return this.player.getCurrentTime();

	}
	loadVideoId(id: string) {
		return this.loadIframeAPI.then(() => {
			return this.player.loadVideoById(id);
		})
	}
	getPercentage() {
		return (this.player.getCurrentTime()/ this.player.getDuration()  * 100) + '%';
	}
	setupPlayer(id) {
		this.loadVideoId(id).then(() => {
			return this.setupControlBar();
		})
	}
	setupControlBar() {
		this.getPercentageInterval = setInterval(()=>this.percentage.next(this.getPercentage()), 300);
		this.getElapsedtimeInterval = setInterval(()=>this.elapsedTime.next(this.getElapsedTime()), 300);

	}
	pauseControlBar() {
		clearInterval(this.getPercentageInterval);
		clearInterval(this.getElapsedtimeInterval);
	}
}