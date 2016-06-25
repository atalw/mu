import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {

  private player;
  private done;

  constructor() {

    this.done = false;
  }


// onYouTubeIframeAPIReady() {
//   this.player = new YT.Player('player', {
//     videoId: 'M7lc1UVf-VE',
//     events: {
//       'onReady': this.onPlayerReady,
//     }
//   });
//   console.log(this.player);
// }

//   onPlayerReady(event) {
//     event.target.playVideo();
//   }

//   onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.PLAYING && !this.done) {
//       setTimeout(this.stopVideo, 6000);
//       this.done = true;
//     }
//   }
//   stopVideo() {
//     this.player.stopVideo();
//   }
}