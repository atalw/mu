import { Injectable } from '@angular/core';

@Injectable()
export class YoutubePlayerService {

	public player;
	// private isPlayerReady: boolean = false;
	loadIframeAPI: Promise<any>;

	constructor() {
		this.initPlayer();
		// this.mutePlayer();
	}

	initPlayer() {
		this.loadIframeAPI = new Promise((resolve) => {
			window['onYouTubeIframeAPIReady'] = (ev) => {
				this.player = new YT.Player('player', {
					videoId: 'M7lc1UVf-VE',
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
	}

	pauseVideo() {
		this.player.pauseVideo();
	}

	getVideoDuration() {
		return this.loadIframeAPI.then(()=> {
			return this.player.getDuration();
		})
	}
	getElapsedTime() {
		return this.loadIframeAPI.then(() => {
			return this.player.getCurrentTime();
		})
	}
	loadVideoUrl(url: string) {
		var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|attribution_link\?a=.+?watch.+?v(?:%|=)))((\w|-){11})(?:\S+)?$/;
		var id = regex.exec(url);
		return this.loadIframeAPI.then(() => {
			return this.player.loadVideoById(id[1]);
		})
	}
}