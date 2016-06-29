import { Component, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'mu-subreddit',
	templateUrl: 'subreddit.component.html',
})
export class SubredditComponent {
	@Input() subreddit;

	constructor() { }

}