import { Component } from '@angular/core';
import { SubredditComponent} from './components/subreddit/subreddit.component';
import { ThreadComponent } from './components/thread/thread.component';

@Component({
	moduleId: module.id,
	selector: 'mu-reddit',
	templateUrl: 'reddit.component.html',
	directives: [SubredditComponent, ThreadComponent]
})
export class RedditComponent {

	constructor() {}

	private subreddits = [
		{
			title: 'Psyrock'
		},
		{
			title: 'Psyrock'
		},
		{
			title: 'Psyrock'
		},
		{
			title: 'Psyrock'
		},
		{
			title: 'Psyrock'
		},
		{
			title: 'Psyrock'
		},
		{
			title: 'Psyrock'
		},

	]

}