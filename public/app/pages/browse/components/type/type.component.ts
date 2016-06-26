import { Component } from '@angular/core';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';

@Component({
	moduleId: module.id,
	selector: 'mu-type',
	templateUrl: 'type.component.html',
	directives: [PlaylistCardComponent]
})
export class TypeComponent {

	constructor() {}

}