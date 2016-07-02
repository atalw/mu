import { Injectable } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';

// window['onLoad'](console.log('herebab'));


@Injectable()
export class YoutubePlayerService {

	public player;

	constructor() {
		this.initPlayer();
	}

	initPlayer() {
		window['onYouTubeIframeAPIReady'] = () => {
			console.log('here');
			this.player = new window.YT.Player('player', {
				height: '390',
				width: '640',
				videoId: 'M7lc1UVf-VE',
				events: {

				}
			});

		}

	}
}