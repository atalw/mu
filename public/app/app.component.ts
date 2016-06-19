import { Component, Input, trigger, style, animate, state, transition, EventEmitter, Output } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

// import { NavbarComponent } from './theme/components/navbar/navbar.component';
import { ControlbarComponent } from './theme/components/controlbar/controlbar.component';
// import { RightbarComponent } from './theme/components/rightbar/rightbar.component';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MdButton} from '@angular2-material/button';
import { InfoComponent } from './theme/components/rightbar/info/info.component';
import { VideoPlayerComponent } from './theme/components/rightbar/videoPlayer/videoPlayer.component';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES, ControlbarComponent, MD_SIDENAV_DIRECTIVES, MdButton, InfoComponent, VideoPlayerComponent],
  animations: []
})

export class AppComponent {}