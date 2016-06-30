import { Component } from '@angular/core';
import { SubredditComponent} from './components/subreddit/subreddit.component';
import { ThreadComponent } from './components/thread/thread.component';
import { SubredditsService } from './services/subreddits.service';

@Component({
	moduleId: module.id,
	selector: 'mu-reddit',
	templateUrl: 'reddit.component.html',
	directives: [SubredditComponent, ThreadComponent],
	providers: [SubredditsService]
})
export class RedditComponent {
	private data;
	private selectedSubreddit;

	constructor(public subredditsService: SubredditsService) { }

	ngOnInit() {
		this.subredditsService.getSubreddits().then(response => {
			this.data = response;
		});
	}

	subredditEvent(event) {
		this.selectedSubreddit = event.title;
	}

}