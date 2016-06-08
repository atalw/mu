import { Component } from '@angular/core';
import { VideoComponent } from './video/video.component';
import { LyricsComponent } from './lyrics/lyrics.component';

@Component({
  selector: 'mu-right-bar',
  templateUrl: 'app/theme/components/rightbar/rightbar.component.html',
  directives: [VideoComponent, LyricsComponent]
})

export class RightbarComponent {}