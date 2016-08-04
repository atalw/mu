import { Component, Input, trigger, style, animate, state, transition, EventEmitter, Output } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { HomeComponent} from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { YoutubeAuthService } from './services/youtube-auth.service';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES, LoginComponent, HomeComponent],
  providers: [],
})

export class AppComponent {

	constructor(public youtubeAuthService: YoutubeAuthService) {}

	ngOnInit() {}

}