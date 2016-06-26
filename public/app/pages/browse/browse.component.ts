import { Component } from '@angular/core';
import { TypeComponent } from './components/type/type.component';

@Component({
  moduleId: module.id,
  selector: 'browse',
  templateUrl: 'browse.component.html',
  directives: [TypeComponent]
})
export class BrowseComponent {

	constructor() {}

	private content = [
		{
			title: 'Artists',
			cards: ['1','2','3','4','5','6']
		},
		{
			title: 'Top Playlists',
			cards: ['1', '2', '3', '4', '5', '6']
		},
		{
			title: 'Moods',
			cards: ['1', '2', '3', '4', '5', '6']
		},
		{
			title: 'Genres',
			cards: ['1', '2', '3', '4', '5', '6']
		},
	]
}