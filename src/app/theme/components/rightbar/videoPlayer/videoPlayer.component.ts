import { Component } from '@angular/core';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import { MD_MENU_DIRECTIVES, MdMenu } from '@angular2-material/menu/menu';

@Component({
	moduleId: module.id,
	selector: 'mu-video-player',
	templateUrl: 'videoPlayer.component.html',
	directives: [MD_BUTTON_DIRECTIVES, MD_MENU_DIRECTIVES, MdMenu]
})

export class VideoPlayerComponent {
	public tag;
	public firstScriptTag;
	public player;
	private selected;

	constructor() {}

	ngAfterViewInit() {

	}
	items = [
    {text: 'Refresh'},
    {text: 'Settings'},
    {text: 'Help'},
    {text: 'Sign Out', disabled: true}
  ];
    select(text: string) { this.selected = text; }

}