import { Component,trigger, state, style, transition, animate } from '@angular/core';

import { ThreadComponent } from './components/thread/thread.component';

import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

import { SubredditsService } from './services/subreddits.service';


@Component({
	moduleId: module.id,
	// selector: 'mu-reddit',
	templateUrl: 'reddit.component.html',
	directives: [ThreadComponent, MD_INPUT_DIRECTIVES, MD_LIST_DIRECTIVES, MD_CARD_DIRECTIVES],
	animations: [
		trigger('state', [
			state('inactive', style({
				backgroundColor: '#fff',
			})),
			state('active', style({
				backgroundColor: '#cfd8dc',
			})),
			transition('inactive => active', animate('100ms ease-in')),
			transition('active => inactive', animate('100ms ease-out'))
		])
	],
	providers: [SubredditsService]
})
export class RedditComponent {
	private data;
	private selectedSubreddit;
	private subreddits;
	public inSearch;

	constructor(public subredditsService: SubredditsService) {}

	ngOnInit() {
		this.inSearch = false;
		this.subredditsService.getSubreddits().then(response => {
			this.data = response;
			// console.log(this.data[0].subreddits[0].class);
			// this.data[0].subreddits[0];
			// console.log(response[0]);
			// this.selectedSubreddit = response[0].subreddits[1].title;
		});


	}

	select(subreddit) {
		this.selectedSubreddit = subreddit;

	}

	// fix search method -> subreddits array is updated but DOM is not recognising
	search(term: string) {
		if (term != '') {

			this.inSearch = true;
			var subreddits = [];
			for (var genre of this.data) {
				for (var subreddit of genre.subreddits) {
					// console.log(subreddit.title.toLowerCase());
					if (subreddit.title.toLowerCase().includes(term.toLowerCase())) {
						// console.log(subreddit.title.toLowerCase());
						subreddits.push(subreddit);
					}
				}
			}
			this.subreddits = subreddits;
			console.log(this.subreddits);
		}
		else {
			this.inSearch = false;
			this.subreddits = [];
		}
	}

}