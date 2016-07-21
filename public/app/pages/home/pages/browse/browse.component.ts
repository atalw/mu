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
			cards: [
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
			]
		},
		{
			title: 'Top Playlists',
			cards: [
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
			]
		},
		{
			title: 'Moods',
			cards: [
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
			]
		},
		{
			title: 'Genres',
			cards: [
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
				{
					name: 'Justin Bieber',
					link: 'justin-bieber'
				},
			]
		},
	]
}