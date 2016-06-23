import { Component, Input, trigger, style, animate, state, transition, EventEmitter, Output } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

// import { NavbarComponent } from './theme/components/navbar/navbar.component';
import { ControlbarComponent } from './theme/components/controlbar/controlbar.component';
// import { RightbarComponent } from './theme/components/rightbar/rightbar.component';
import { LoginComponent } from './pages/login/login.component';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_ICON_DIRECTIVES, MdIconRegistry} from '@angular2-material/icon';
import { InfoComponent } from './theme/components/rightbar/info/info.component';
import { VideoPlayerComponent } from './theme/components/rightbar/videoPlayer/videoPlayer.component';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES, ControlbarComponent, MD_SIDENAV_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_ICON_DIRECTIVES, InfoComponent, VideoPlayerComponent, LoginComponent],
  providers: [MdIconRegistry],
  animations: [
  	trigger('easeInLeft', [
  		state('in', style({transform: 'translateX(0)'})),
  		transition('void => *', [
  			style({transform: 'translateX(-100%)'}),
  			animate('200ms ease-in')
  		]),
  	]),
  	trigger('easeInRight', [
  		state('in', style({transform: 'translateX(0)'})),
  		transition('void => *', [
  			style({transform: 'translateX(100%)'}),
			animate('200ms ease-in')
  		]),
  	]),
	trigger('easeInBottom', [
		state('in', style({ transform: 'translateY(0)' })),
		transition('void => *', [
			style({ transform: 'translateY(100%)' }),
			animate('200ms ease-in')
		]),
	]),
	trigger('easeInTop', [
		state('in', style({ transform: 'translateY(0)' })),
		transition('void => *', [
			style({ transform: 'translateY(-100%)' }),
			animate('200ms ease-in')
		]),
	]),
  ]
})

export class AppComponent {
	private loggedIn;

	constructor() {
		this.loggedIn = true;
	}
	ngOnInit() {
	}
}