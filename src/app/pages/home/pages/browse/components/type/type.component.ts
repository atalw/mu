import { Component, Input } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';

import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';

@Component({
	moduleId: module.id,
	selector: 'mu-type',
	templateUrl: 'type.component.html',
	directives: [MD_GRID_LIST_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class TypeComponent {

	@Input() type;
	private tiles;

	constructor() {}

}