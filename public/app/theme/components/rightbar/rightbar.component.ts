import { Component } from '@angular/core';
import { VideoPlayerComponent } from './videoPlayer/videoPlayer.component';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'mu-right-bar',
  templateUrl: 'app/theme/components/rightbar/rightbar.component.html',
  directives: [VideoPlayerComponent, InfoComponent]
})

export class RightbarComponent {}