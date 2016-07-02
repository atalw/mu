import { Component, Input, trigger, style, animate, state, transition, EventEmitter, Output } from '@angular/core';
import { VideoPlayerComponent } from './videoPlayer/videoPlayer.component';
import { InfoComponent } from './info/info.component';
import { MdButton } from '@angular2-material/button';
import { YoutubePlayerService } from '../../../services/youtube-player.service';

@Component({
  moduleId: module.id,
  selector: 'mu-right-bar',
  templateUrl: 'rightbar.component.html',
  // directives: [VideoPlayerComponent, InfoComponent, MdButton],
  animations: []
})

export class RightbarComponent {
	// constructor(public youtubePlayerService : YoutubePlayerService) {}
}