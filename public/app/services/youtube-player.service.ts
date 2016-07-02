import { Injectable } from '@angular/core';

@Injectable()
export class YoutubePlayerService {

	public player;
	loadIframeAPI: Promise<any>;

	constructor() {
		this.loadIframeAPI = new Promise((resolve) => {
			window['onYouTubeIframeAPIReady'] = () => {
				if (window['YT']) {
					this.player = new window.YT.Player('player', {
						videoId: 'M7lc1UVf-VE'
					});
				}


			}
			this.loadScript();
		})
	}

	loadScript() {
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
}