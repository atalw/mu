import { Component, trigger, style, animate, state, transition } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router }  from '@angular/router';

import { RightbarComponent } from '../../theme/components/rightbar/rightbar.component';
import { InfoComponent } from '../../theme/components/rightbar/info/info.component';
import { VideoPlayerComponent } from '../../theme/components/rightbar/videoPlayer/videoPlayer.component';
import { ControlbarComponent } from '../../theme/components/controlbar/controlbar.component';

import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_ICON_DIRECTIVES, MdIconRegistry} from '@angular2-material/icon';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import { YoutubePlayerService } from '../../services/youtube-player.service';
import { YoutubeAuthService } from '../../services/youtube-auth.service';

@Component({
  moduleId: module.id,
  selector: 'mu-home',
  templateUrl: 'home.component.html',
  directives: [ROUTER_DIRECTIVES, ControlbarComponent,
	  MD_SIDENAV_DIRECTIVES,
	  MD_BUTTON_DIRECTIVES,
	  MD_ICON_DIRECTIVES,
	  MD_TOOLBAR_DIRECTIVES,
	  MD_LIST_DIRECTIVES,
	  InfoComponent,
	  VideoPlayerComponent],
  providers: [YoutubePlayerService, MdIconRegistry],
  animations: [
	  trigger('easeInLeft', [
		  state('in', style({ transform: 'translateX(0)' })),
		  transition('void => *', [
			  style({ transform: 'translateX(-100%)' }),
			  animate('200ms ease-in')
		  ]),
	  ]),
	  trigger('easeInRight', [
		  state('in', style({ transform: 'translateX(0)' })),
		  transition('void => *', [
			  style({ transform: 'translateX(100%)' }),
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

export class HomeComponent{
	dataLoaded: boolean = true;

	private views = [
		{
			name: 'Home',
			icon: 'apps',
			link: ''
		},
		{
			name: 'Youtube',
			icon: 'search',
			link: '/browse'
		},
		{
			name: 'Reddit',
			icon: 'sentiment_very_satisfied',
			link: '/reddit'
		},
		{
			name: 'Settings',
			icon: 'settings',
			link: '/settings'
		}
	];

	constructor(
		public router: Router,
		public youtubeAuthService: YoutubeAuthService) { }

	ngOnInit() {}

	logout() {
		this.youtubeAuthService.logout();
	}
}
