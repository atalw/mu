import { Component } from '@angular/core';
import { VideoPlayerComponent } from './videoPlayer/videoPlayer.component';
import { InfoComponent } from './info/info.component';

@Component({
  moduleId: module.id,
  selector: 'mu-right-bar',
  templateUrl: 'rightbar.component.html',
  directives: [VideoPlayerComponent, InfoComponent]
})

export class RightbarComponent {}