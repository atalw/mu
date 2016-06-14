import { Component } from '@angular/core';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';

@Component({
	moduleId: module.id,
	selector: 'mu-mood',
	templateUrl: 'mood.component.html',
	directives: [PlaylistCardComponent]
})

export class MoodComponent {}