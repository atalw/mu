import { Component } from '@angular/core';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';

@Component({
	moduleId: module.id,
	selector: 'mu-genres',
	templateUrl: 'genres.component.html',
	directives: [PlaylistCardComponent]
})

export class GenresComponent {}